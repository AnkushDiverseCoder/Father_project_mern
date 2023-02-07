import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import * as XLSX from "xlsx/xlsx.mjs";
import DataTable from "react-data-table-component";
import excel from "../microsoft-excel-icon.png";
import { allDscDataRoute, dscDeleteRouteRoute, verifyToken } from "../../utils/ApiRoutes";

const DscReport = () => {
  const navigate = useNavigate();
  const [search,setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);

  // ALL Api Calls here --------------------------------
  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `${dscDeleteRouteRoute}/${id}`
    );
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success(data.msg, toastOptions);
    }
  };

  // ALL UseEffect Functions here --------------------------------
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(verifyToken, {
        token,
      });

      if (data.status === "false") {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    const DscData = async () => {
      const { data } = await axios.get(allDscDataRoute);
      console.log(data.msg);
      setFilterData(data.msg);
      setData(data.msg);
    };
    DscData();
  }, []);

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

  // Table 
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
      name: <p className="whitespace-pre-line break-words mr-3">Date Of Generation</p>,
      selector: (row) => (
        <p>{moment(row?.dateOfGeneration).format("DD-MMM-yyy")}</p>
      ),
      sortable: true,
    },
    {
      name:  <p className="whitespace-pre-line break-words mr-3">Renewal Date</p>,
      selector: (row) => (
        <p>{moment(row?.renewalDate).format("DD-MMM-yyy")}</p>
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
      name:  <p className="whitespace-pre-line break-words mr-3">Sale Amount</p>,
      selector: (row) => row?.amount,
      sortable: true,
    },
    {
      name: "Received Amount",
      selector: (row) => row?.receivedAmount,
      sortable: true,
    },
    {
      name: "Received Date",
      selector: (row) =>(
        <p>{moment(row?.receivedDate).format("DD-MMM-yyy")}</p>
      ),
      sortable: true,
    },
    {
      name: "Closing Balance",
      selector: (row) =>row?.closingBalance,
      sortable: true,
    },
    {
      name: "Pan Number",
      selector: (row) =>row?.panNumber,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => (
        <p className="whitespace-pre-line break-words mr-3">{row?.remarks}</p>
      ),
      sortable: true,
    },
    {
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
    }
  ];

  const downloadPdf = () => {
      const exportExcel = filterData.map((item, i) => ({
        SNo: i,
        Customer_Name: item.customerName,
        Contact_number: item.contactNumber,
        Date_Of_Generation: moment(item.dateOfGeneration).format("DD-MM-yyy"),
        Valid_Till_Date: moment(item.validTillDate).format("DD-MM-yyy"),
        Renewal_Date: moment(item.renewalDate).format("DD-MM-yyy"),
        Sale_Amount: item.amount.toLocaleString(),
        Received_Amount: item.receivedAmount.toLocaleString(),
        Received_Date: moment(item.receivedDate).format("DD-MM-yyy"),
        panNumber: item.panNumber.toLocaleString(),
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

  return (
    <>
      <div>
      <div className="rounded-lg pt-5 shadow-lg ">
        <div className="flex justify-end p-3 bg-[#fff7cd] text-[#b78105]">
          
          <button
            type="button"
            className="p-1 rounded-lg text-white active:bg-green-600 active:scale-90 transition duration-150 ease-out w-10"
            onClick={downloadPdf}
          >
            <img src={excel} alt="" />
          </button>
        </div>
      </div>
      <DataTable
          columns={columns}
          data={filterData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          highlightOnHover
          paginationRowsPerPageOptions={[100000]}
          customStyles={customStyles}
          subHeaderAlign="left"
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
        />
      </div>
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
    </>
  );
};

export default DscReport;
