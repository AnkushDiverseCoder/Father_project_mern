/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Moment from "moment";
import excel from "./microsoft-excel-icon.png";
import { verifyToken } from "../utils/ApiRoutes";

// eslint-disable-next-line react/prop-types
const Table = ({
  // eslint-disable-next-line react/prop-types
  data,
  // eslint-disable-next-line react/prop-types
  filterData,
  // eslint-disable-next-line react/prop-types
  setFilterData,
  // eslint-disable-next-line react/prop-types
  name,
  // eslint-disable-next-line react/prop-types
  remarks,
  // eslint-disable-next-line react/prop-types
  totalData,
  // eslint-disable-next-line react/prop-types
  report,
  // eslint-disable-next-line react/prop-types
  endDate,
}) => {
  
  const [search] = useState("");
  const [email, setEmail] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token")
      const {data}  = await axios.post(verifyToken,{
        token
      });
      
      if (data.email === "bagathsingh59@gmail.com") {
        setEmail(true);
      }
    }
    checkUser()

  }, [navigate]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types, arrow-body-style
    const result = data.filter((customer) => {
      return customer?.customerName?.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search, data, setFilterData]);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `https://gorgeous-scrubs-crow.cyclic.app/api/Report/${id}`
    );
    // eslint-disable-next-line react/prop-types
    if (data.status === false) {
      // eslint-disable-next-line react/prop-types
      toast.error(data.msg, toastOptions);
    }
    // eslint-disable-next-line react/prop-types
    if (data.status === true) {
      // eslint-disable-next-line react/prop-types
      toast.success(data.msg, toastOptions);
    }
  };

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#fff7cd",
        height: "100vh",
      },
    },
    header: {
      style: {
        backgroundColor: "#fff7cd",
        paddingTop: "20px",
        paddingBottom: "20px",
        fontFamily: "Times New Roman",
        fontWeight: "bolder",
        color: "#b78105",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "#fff7cd",
        minHeight: "52px",
      },
    },
    tableWrapper: {
      style: {
        display: "table",
      },
    },
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#b78105",
        backgroundColor: "#f5e4b2",
        border: "px solid #b78105",
        fontSize: "14px",
        wordBreak: "break-word",
        boxShadow:
          " 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        wordBreak: "break-word",
      },
      draggingStyle: {},
    },
    contextMenu: {
      style: {
        backgroundColor: "#ffe7d9",
        fontSize: "18px",
        fontWeight: 400,
        paddingLeft: "16px",
        paddingRight: "8px",
        transform: "translate3d(0, -100%, 0)",
        transitionDuration: "125ms",
        transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        willChange: "transform",
        whiteSpace: "pre-line",
        overflowWrap: "break-word",
      },
      activeStyle: {
        transform: "translate3d(0, 0, 0)",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff7cd",
        padding: "10px",
      },
      highlightOnHoverStyle: {
        outline: "1px solid #FFFFFF",
        overflow: "wrap",
      },
      cells: {
        style: {
          overflow: "wrap",
        },
      },
    },
    pagination: {
      style: {
        border: "none",
        backgroundColor: "#fff7cd",
      },
    },
  };

  const columns = [
    {
      name: <p className="whitespace-pre-line break-words mr-3">Date</p>,
      selector: (row) => (
        <p>{Moment(row?.monthComplianceDate).format("DD-MMM-yyy")}</p>
      ),
      sortable: true,
    },
    {
      name: <p className="whitespace-pre-line break-words mr-3">Customer Name</p>,
      selector: (row) => (
        <p className="whitespace-pre-line break-words mr-3">
          {row?.customerName}
        </p>
      ),
      sortable: true,
    },
    {
      name:  <p className="whitespace-pre-line break-words mr-3">Compliance Amount</p>,
      selector: (row) => (
        <p className="text-green-600">
          {row?.monthComplianceAmount.toLocaleString()}.00
        </p>
      ),
      sortable: true,
    },
    {
      name:  <p className="whitespace-pre-line break-words mr-3">EPF Debit</p>,
      selector: (row) => `${row?.epfAmount.toLocaleString()}.00`,
      sortable: true,
    },
    {
      name: "ESIC Debit",
      selector: (row) => `${row?.esicAmount.toLocaleString()}.00`,
      sortable: true,
    },
    {
      name:  <p className="whitespace-pre-line break-words mr-3">All Other Debit</p>,
      selector: (row) => `${row?.otherDebit.toLocaleString()}.00`,
      sortable: true,
    },
    {
      name:  <p className="whitespace-pre-line break-words mr-3">Prof. Fees</p>,
      selector: (row) => `${row?.professionalFees.toLocaleString()}.00`,
      sortable: true,
    },
    {
      name: "Total Debit",
      selector: (row) => (
        <h1 className="text-red-600">
          {(
            row?.epfAmount +
            row?.esicAmount +
            row?.otherDebit +
            row?.professionalFees
          )?.toLocaleString()}
          .00
        </h1>
      ),
      sortable: true,
    },
    {
      name:  <p className="whitespace-pre-line break-words mr-3">Closing Balance</p>,
      selector: (row) => (
        <h1 className="text-blue-600">
          {(
            row.monthComplianceAmount -
            row.epfAmount -
            row.esicAmount -
            row.otherDebit -
            row.professionalFees
          )?.toLocaleString()}
          .00
        </h1>
      ),
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => (
        <p className="whitespace-pre-line break-words mr-3">{row?.remarks}</p>
      ),
      sortable: true,
    },
    ...(email ? [{
      name: "Remove Entry",
      cell: (row) => (
        <button
          type="button"
          className="bg-red-700 p-2 rounded-lg text-white hover:scale-x-110 active:bg-green-600 active:scale-90 transition duration-150 ease-out"
          onClick={() => handleDelete(row._id)}
        >
          Remove
        </button>
      ),
    }]:[])
  ];

  const downloadPdf = () => {
    if (remarks) {
      const exportExcel = data.map((item, i) => ({
        SNo: i,
        Date: Moment(item.monthComplianceDate).format("DD-MM-yyy"),
        Customer_Name: item.customerName,
        Representative_Name: item.representativeName,
        Contact_Number: item.contactNumber,
        Email: item.email,
        Amount_Credited: item.monthComplianceAmount,
        EPF_Debit: item.epfAmount,
        ESIC_Debit: item.esicAmount,
        Other_Debit: item.otherDebit,
        // Professional_Fees:item.ProfessionalFees,
        Total_Debit:
          item.epfAmount +
          item.esicAmount +
          item.otherDebit +
          item.professionalFees,
        Net_Difference:
          item.monthComplianceAmount -
          item.epfAmount -
          item.otherDebit -
          item.esicAmount -
          item.professionalFees,
        remarks: item.remarks,
      }));
      const workSheet = XLSX.utils.json_to_sheet(exportExcel);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workBook,
        workSheet,
        "Accounting Entries Data"
      );

      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download Excel file
      XLSX.writeFile(workBook, "Accounting-Entries-Data.xlsx");
    } else {
      const exportExcel = data.map((item, i) => ({
        SNo: i,
        Date: Moment(item.monthComplianceDate).format("DD-MM-yyy"),
        Customer_Name: item.customerName,
        Representative_Name: item.representativeName,
        Contact_Number: item.contactNumber,
        Email: item.email,
        Amount_Credited: item.monthComplianceAmount,
        EPF_Debit: item.epfAmount,
        ESIC_Debit: item.esicAmount,
        Other_Debit: item.otherDebit,
        // Professional_Fees:item.ProfessionalFees,
        Total_Debit:
          item.epfAmount +
          item.esicAmount +
          item.otherDebit +
          item.professionalFees,
        Net_Difference:
          item.monthComplianceAmount -
          item.epfAmount -
          item.otherDebit -
          item.esicAmount -
          item.professionalFees,
      }));
      const workSheet = XLSX.utils.json_to_sheet(exportExcel);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workBook,
        workSheet,
        "Accounting Entries Data"
      );

      // Binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      // Download Excel file
      XLSX.writeFile(workBook, "Accounting-Entries-Data.xlsx");
    }
  };

  return (
    <div className="rounded-lg ">
      { email && <div className="flex justify-between p-2 pt-10 shadow-inner shadow-transparent">
        <div>
          <p className=" text-[#bb777f] underline">Credited Amount Total</p>
          <p className="text-green-600 font-bold">
            
            {totalData[0]?.AmountCreditedTotal?.toLocaleString()}.00
          </p>
        </div>
        <div>
          <p className=" text-[#bb777f] underline">EPF Amount Total</p>
          <p className=" text-[#7a0b2e]">
            {totalData[0]?.epfTotal?.toLocaleString()}.00
          </p>
        </div>
        <div>
          <p className=" text-[#bb777f] underline">ESIC Amount Total</p>
          <p className=" text-[#7a0b2e]">
            {totalData[0]?.esicTotal?.toLocaleString()}.00
          </p>
        </div>
        <div>
          <p className=" text-[#bb777f] underline">Other Debit Total</p>
          <p className=" text-[#7a0b2e]">
            {totalData[0]?.otherTotal?.toLocaleString()}.00
          </p>
        </div>
        {/* Display Only to Papa */}
        <div>
          <p className=" text-[#bb777f] underline">Professional Fees Total</p>
          <p className=" text-[#7a0b2e]">
            {totalData[0]?.professionalFeesTotal?.toLocaleString()}.00
          </p>
        </div>
        <div>
          <p className=" text-[#bb777f] underline">Total Debit</p>
          <p className=" text-red-600 font-bold">
            {(
              totalData[0]?.epfTotal +
              totalData[0]?.esicTotal +
              totalData[0]?.otherTotal +
              totalData[0]?.professionalFeesTotal
            )?.toLocaleString()}
            .00
          </p>
        </div>
        <div>
          <p className=" text-[#bb777f] underline">Closing Balance</p>
          <p className=" text-blue-600 font-bold">
            {(
              totalData[0]?.AmountCreditedTotal -
              (totalData[0]?.epfTotal +
                totalData[0]?.esicTotal +
                totalData[0]?.otherTotal +
                totalData[0]?.professionalFeesTotal)
            )?.toLocaleString()}
            .00
          </p>
        </div>
      </div>}

      {/*  */}
      <div className="rounded-lg pt-5 shadow-lg ">
        <div className="flex justify-between p-3 bg-[#fff7cd] text-[#b78105]">
          <h1 className="">
            {report === "historicalReport" ? (
              <>{`Cashflow Report During The Period From: \u00A0\u00A0`}</>
            ) : (
              <>Cashflow Report For : </>
            )}
            {report === "historicalReport" && (
              <>
                <span className="underline font-bold text-xl italic text-green-600">
                  {" "}
                  {` ${Moment(name)?.format("DD-MMMM-yyy")} \u00A0`}
                </span>
                <span className="underline font-bold text-xl italic text-blue-400">
                  to{" "}
                </span>
                <span className="underline font-bold text-xl italic text-red-600">
                  {" "}
                  {` ${Moment(endDate)?.format("DD-MMMM-yyy")}`}
                </span>
              </>
            )}
            {report === "daily" && (
              <span className="underline font-bold text-xl italic">
                {" "}
                {Moment(name)?.format("DD-MMMM-yyy")} (
                {Moment(name)?.format("dddd")})
              </span>
            )}
            {report === "individual" && (
              <span className="underline font-bold text-xl italic">{name}</span>
            )}
          </h1>
          <button
            type="button"
            className="p-1 rounded-lg text-white active:bg-green-600 active:scale-90 transition duration-150 ease-out w-10"
            onClick={downloadPdf}
          >
            <img src={excel} alt="" />
          </button>
        </div>
        <DataTable
          columns={columns}
          data={filterData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          highlightOnHover
          customStyles={customStyles}
          subHeaderAlign="left"
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Table;
