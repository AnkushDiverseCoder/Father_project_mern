import React, { useEffect, useState } from "react";
import Moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import excel from "../components/microsoft-excel-icon.png";
import {
  CustomerHeadRoute,
  allCustomerHeadData,
  verifyToken,
} from "../utils/ApiRoutes";

const CustomerHead = () => {
  const [customerData, setCustomerData] = useState({
    customerName: "",
    representativeName: "",
    epfNumber: "",
    esicNumber: "",
    contactNumber: "",
    date: "",
    email: "",
    remarks: "",
    epfUserId: "",
    esiUserId: "",
    lwfUserId: "",
    gstUserId: "",
    shramSuvidaUserId: "",
    additionalUserId: "",
    epfPassword: "",
    esiPassword: "",
    lwfPassword: "",
    gstPassword: "",
    shramSuvidaPassword: "",
    additionalPassword: "",
  });

  const navigate = useNavigate();

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

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setCustomerData({
      ...customerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidation = () => {
    const { customerName, contactNumber, date } = customerData;
    if (customerName === "") {
      toast.error("Customer Name is required", toastOptions);
    } else if (contactNumber === "") {
      toast.error("ContactNumber is required", toastOptions);
      return false;
    } else if (date === "") {
      toast.error("date of commencement is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {
        customerName,
        representativeName,
        epfNumber,
        esicNumber,
        contactNumber,
        date,
        email,
        remarks,
        epfUserId,
        esiUserId,
        lwfUserId,
        gstUserId,
        shramSuvidaUserId,
        additionalUserId,
        epfPassword,
        esiPassword,
        lwfPassword,
        gstPassword,
        shramSuvidaPassword,
        additionalPassword,
      } = customerData;
      const { data } = await axios.post(CustomerHeadRoute, {
        customerName,
        representativeName,
        epfNumber,
        esicNumber,
        contactNumber,
        date,
        email,
        remarks,
        epfUserId,
        esiUserId,
        lwfUserId,
        gstUserId,
        shramSuvidaUserId,
        additionalUserId,
        epfPassword,
        esiPassword,
        lwfPassword,
        gstPassword,
        shramSuvidaPassword,
        additionalPassword,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        setCustomerData({
          ...customerData,
          customerName: "",
          representativeName: "",
          epfNumber: "",
          esicNumber: "",
          contactNumber: "",
          date: "",
          email: "",
          remarks: "",
        });
      }
    }
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    const totalCustomerData = async () => {
      const res = await axios.get(allCustomerHeadData);
      setData(res.data.msg);
      console.log(res.data.msg);
    };
    totalCustomerData();
  },[]);

  const navigateToCustomerHeadReport = () => {
    navigate("/dashboard/customerHeadReport");
  };

  const downloadPdf = () => {
    const exportExcel = data.map((item, i) => ({
      SNo: i+1,
      Customer_Name: item.customerName,
      representativeName: item.representativeName,
      epfNumber: item.epfNumber,
      esicNumber: item.esicNumber,
      contactNumber: item.contactNumber,
      date: Moment(item.date).format("DD-MM-yyy"),
      email: item.email,
      remarks: item.remarks,
      epfUserId: item?.epfUserId,
      esiUserId: item?.esiUserId,
      lwfUserId: item?.lwfUserId,
      gstUserId: item?.gstUserId,
      shramSuvidaUserId: item?.shramSuvidaUserId,
      additionalUserId: item?.additionalUserId,
      epfPassword: item?.epfPassword,
      esiPassword: item?.esiPassword,
      lwfPassword: item?.lwfPassword,
      gstPassword: item?.gstPassword,
      shramSuvidaPassword: item?.shramSuvidaPassword,
      additionalPassword: item?.additionalPassword,
    }));
    const workSheet = XLSX.utils.json_to_sheet(exportExcel);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      "Accounting Entries Data"
    );

    // Binary String
    XLSX.write(workBook, { bookType: "csv", type: "binary" });
    // Download Excel file
    XLSX.writeFile(workBook, "Accounting-Entries-Data.csv");
  };

  return (
    <>
      <div className="w-full md:flex">
        <div className="flex justify-center py-10 items-center mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <h1 className="text-gray-800 font-bold text-2xl mb-7">
                Customer Head Entry Done Here!
              </h1>
              <button
                type="button"
                className="p-1 rounded-lg text-white active:bg-green-600 active:scale-90 transition duration-150 ease-out w-10"
                onClick={downloadPdf}
              >
                <img src={excel} alt="" />
              </button>
            </div>

            {/* first Box */}
            <div className="flex gap-6">
              <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="text"
                  name="customerName"
                  value={customerData.customerName}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Full Customer name"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="text"
                  name="representativeName"
                  onChange={handleChange}
                  value={customerData.representativeName}
                  autoComplete="off"
                  placeholder="Representative Name"
                />
              </div>
            </div>

            {/* Second Box */}
            <div className="flex gap-6">
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="text"
                  name="epfNumber"
                  value={customerData.epfNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="EPF Code Number"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="Number"
                  name="esicNumber"
                  value={customerData.esicNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="ESIC Code Number"
                />
              </div>
            </div>

            {/* Third Box */}
            <div className="flex gap-6">
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="Number"
                  name="contactNumber"
                  onChange={handleChange}
                  value={customerData.contactNumber}
                  autoComplete="off"
                  placeholder="Contact Number"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-transparent w-full text-w-full"
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={customerData.date}
                  autoComplete="off"
                  placeholder="Date of Commencement"
                />
              </div>
            </div>

            {/* Fourth Box */}
            <div className="flex gap-6">
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="email "
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none w-full bg-inherit"
                  type="text"
                  name="remarks"
                  autoComplete="off"
                  value={customerData.remarks}
                  onChange={handleChange}
                  placeholder="Remarks"
                />
              </div>
            </div>

            {/* 10th Box */}
            <div className="flex gap-6">
              <div>
                <h1 className="inline bg-[#fed7aa] mt-4 p-2 ml-2 rounded-2xl text-[#ab4f2d] font-semibold px-">
                  EPF{" "}
                </h1>
                <div className="flex gap-6">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text "
                      name="epfUserId"
                      value={customerData.epfUserId}
                      onChange={handleChange}
                      placeholder="User ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full bg-inherit"
                      type="text"
                      name="epfPassword"
                      autoComplete="off"
                      value={customerData.epfPassword}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5th Box */}
            <div className="flex gap-6">
              <div>
                <h1 className="inline bg-[#fed7aa] mt-4 p-2 ml-2 rounded-2xl text-[#ab4f2d] font-semibold px- mx-auto w-full">
                  {" "}
                  ESI{" "}
                </h1>
                <div className="flex gap-6">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text "
                      name="esiUserId"
                      value={customerData.esiUserId}
                      onChange={handleChange}
                      placeholder="User ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full bg-inherit"
                      type="text"
                      name="esiPassword"
                      autoComplete="off"
                      value={customerData.esiPassword}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6th Box */}
            <div className="flex gap-6">
              <div>
                <h1 className="inline bg-[#fed7aa] mt-4 p-2 ml-2 rounded-2xl text-[#ab4f2d] font-semibold px- mx-auto w-full">
                  {" "}
                  LWF{" "}
                </h1>
                <div className="flex gap-6">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text "
                      name="lwfUserId"
                      value={customerData.lwfUserId}
                      onChange={handleChange}
                      placeholder="User ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full bg-inherit"
                      type="text"
                      name="lwfPassword"
                      autoComplete="off"
                      value={customerData.lwfPassword}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 7th Box */}
            <div className="flex gap-6">
              <div>
                <h1 className="inline bg-[#fed7aa] mt-4 p-2 ml-2 rounded-2xl text-[#ab4f2d] font-semibold px- mx-auto w-full">
                  {" "}
                  GST{" "}
                </h1>
                <div className="flex gap-6">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text "
                      name="gstUserId"
                      value={customerData.gstUserId}
                      onChange={handleChange}
                      placeholder="User ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full bg-inherit"
                      type="text"
                      name="gstPassword"
                      autoComplete="off"
                      value={customerData.gstPassword}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 8th Box */}
            <div className="flex gap-6">
              <div>
                <h1 className="inline bg-[#fed7aa] mt-4 p-2 ml-2 rounded-2xl text-[#ab4f2d] font-semibold px- mx-auto w-full">
                  {" "}
                  ShramSuvida{" "}
                </h1>
                <div className="flex gap-6">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text "
                      name="shramSuvidaUserId"
                      value={customerData.shramSuvidaUserId}
                      onChange={handleChange}
                      placeholder="User ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full bg-inherit"
                      type="text"
                      name="shramSuvidaPassword"
                      autoComplete="off"
                      value={customerData.shramSuvidaPassword}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 9th Box */}
            <div className="flex gap-6">
              <div>
                <h1 className="inline bg-[#fed7aa] mt-4 p-2 ml-2 rounded-2xl text-[#ab4f2d] font-semibold px- mx-auto w-full">
                  Additional{" "}
                </h1>
                <div className="flex gap-6">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text "
                      name="additionalUserId"
                      value={customerData.additionalUserId}
                      onChange={handleChange}
                      placeholder="User ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    <input
                      className="pl-2 outline-none border-none w-full bg-inherit"
                      type="text"
                      name="additionalPassword"
                      autoComplete="off"
                      value={customerData.additionalPassword}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Save The Customer Head
            </button>

            <button
              type="button"
              onClick={navigateToCustomerHeadReport}
              className="block w-full bg-[#fed7aa] mt-4 py-2 rounded-2xl text-[#ab4f2d] font-semibold mb-2"
            >
              Modify The Customer Head
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CustomerHead;
