import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Moment from "moment";

const Table = ({ data, filterData, setFilterData }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const result = data.filter((customer) => {
      return customer.customerName.toLowerCase().match(search.toLowerCase());
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
      `https://vaishnaviconsultant.herokuapp.com/api/Report/${id}`
    );
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success(data.msg, toastOptions);
    }
  };

  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => (
        <p>{Moment(row.monthComplianceDate).format("DD-MMMM-yyy")}</p>
      ),
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
    },
    {
      name: "Amount Credited",
      selector: (row) => row.monthComplianceAmount,
      sortable: true,
    },
    {
      name: "EPF Debit",
      selector: (row) => row.epfAmount,
      sortable: true,
    },
    {
      name: "Esic Debit",
      selector: (row) => row.esicAmount,
      sortable: true,
    },
    {
      name: "All Other Debit",
      selector: (row) => row.otherDebit,
      sortable: true,
    },
    {
      name: "Professional Fees",
      selector: (row) => row.professionalFees,
      sortable: true,
    },
    {
      name: "Total Debit",
      selector: (row) => (
        <h1>
          {row.epfAmount +
            row.esicAmount +
            row.otherDebit +
            row.professionalFees}
        </h1>
      ),
      sortable: true,
    },
    {
      name: "Net Difference",
      selector: (row) => (
        <h1>
          {row.monthComplianceAmount -
            row.epfAmount -
            row.esicAmount -
            row.otherDebit -
            row.professionalFees}
        </h1>
      ),
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      sortable: true,
    },
    {
      name: "Remove Entry",
      cell: (row) => (
        // Todo the remove functionality
        <button
          className="bg-red-700 p-2 rounded-lg text-white hover:scale-x-110 active:bg-green-600 active:scale-90 transition duration-150 ease-out"
          onClick={() => handleDelete(row._id)}
        >
          Remove
        </button>
      ),
    },
  ];

  const downloadPdf = () => {
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
  };

  return (
    <div className="bg-gray-900">
      <DataTable
        columns={columns}
        data={filterData}
        pagination
        title="Daily Report"
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        customStyles={customStyles}
        actions={
          <button
            className="bg-blue-600 p-1 rounded-lg text-white active:bg-green-600 active:scale-90 transition duration-150 ease-out"
            onClick={downloadPdf}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
          </button>
        }
        subHeader
        subHeaderComponent={
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Search AccountEntry "
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        }
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
  );
};

export default Table;
