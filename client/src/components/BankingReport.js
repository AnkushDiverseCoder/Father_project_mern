/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Moment from "moment";
import excel from "./microsoft-excel-icon.png";
import { verifyToken } from "../utils/ApiRoutes";

// eslint-disable-next-line react/prop-types
const BankingReport = ({
  // eslint-disable-next-line react/prop-types
  data,
  // eslint-disable-next-line react/prop-types
  filterData,
  // eslint-disable-next-line react/prop-types
  setFilterData,
  // eslint-disable-next-line react/prop-types
  name,
  // eslint-disable-next-line react/prop-types
  totalData,
  // eslint-disable-next-line react/prop-types
  endDate,
}) => {
  const [email, setEmail] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react/prop-types, arrow-body-style
    const result = data.filter((customer) => {
      return customer._id.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search, data, setFilterData]);


  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(verifyToken, {
        token,
      });

      if (data.email === "bagathsingh59@gmail.com") {
        setEmail(true);
      }
    };
    checkUser();
  }, [navigate]);


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
      `https://gorgeous-scrubs-crow.cyclic.app/api/Report/bank/${id}`
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
      name: (
        <p className="whitespace-pre-line break-words mr-3">Customer Name</p>
      ),
      selector: (row) => (
        <p className="whitespace-pre-line break-words mr-3">{row?.customerName}</p>
      ),
      sortable: true,
    },
    {
      name: (
        <p className="whitespace-pre-line break-words mr-3">
          date
        </p>
      ),
      selector: (row) => (
        <p className="text-green-600">
          {Moment(row.date)?.format("DD-MMMM-yyy")}
        </p>
      ),
      sortable: true,
    },
    {
      name: <p className="whitespace-pre-line break-words mr-3">creditAmount</p>,
      selector: (row) => `${row?.creditAmount.toLocaleString()}.00`,
      sortable: true,
    },
    {
      name: "narration",
      selector: (row) => `${row?.narration.toLocaleString()}.00`,
      sortable: true,
    },
    ...(email
      ? [
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
          },
        ]
      : []),
  ];

  const downloadPdf = () => {
      const exportExcel = filterData.map((item, i) => ({
        SNo: i,
        Customer_Name: item.customerName,
        Date : item.date,
        Credited_Amount : item.creditAmount,
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
    <div className="rounded-lg ">
      {email && (
        <div className="flex justify-center p-2 pt-10 shadow-inner shadow-transparent">
          <div>
            <p className=" text-[#bb777f] underline text-lg ">Credited Amount Total</p>
            <p className="text-green-600 font-bold">
              {totalData[0]?.AmountCreditedTotal?.toLocaleString()}.00
            </p>
          </div>
        </div>
      )}

      {/*  */}
      <div className="rounded-lg pt-5 shadow-lg ">
        <div className="flex justify-between p-3 bg-[#fff7cd] text-[#b78105]">
            <div>
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
            </div>
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
    </div>
  );
};

export default BankingReport;







