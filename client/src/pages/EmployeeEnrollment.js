// {/* Report */}
// {/* Historical Report */}
// {/* CustomerHead Name*/}

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import {
  CreateEmployeeEnrollment,
  getCustomerName,
  verifyToken,
} from "../utils/ApiRoutes";

const CustomerHead = () => {
  const [name, setName] = useState("");
  const [customerNameData, setCustomerNameData] = useState(null);
  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
    };
    fetchCustomerName();
  }, []);
  const [customerData, setCustomerData] = useState({
    joiningDate: "",
    enrollmentDate: moment().format('YYYY-MM-DD'),
    EmployeeName: "",
    fatherName: "",
    esicIpNumber: "",
    Uan: "",
    remarks: "",
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
    const { joiningDate, enrollmentDate, EmployeeName, fatherName, remarks } =
      customerData;
    if (joiningDate === "") {
      toast.error("Customer Name is required", toastOptions);
    } else if (enrollmentDate === "") {
      toast.error("ContactNumber is required", toastOptions);
      return false;
    } else if (EmployeeName === "") {
      toast.error("joiningDate of commencement is required", toastOptions);
      return false;
    } else if (fatherName === "") {
      toast.error("joiningDate of commencement is required", toastOptions);
      return false;
    } else if (remarks === "") {
      toast.error("joiningDate of commencement is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {
        EmployeeName,
        esicIpNumber,
        enrollmentDate,
        Uan,
        joiningDate,
        fatherName,
        remarks,
      } = customerData;
      const { data } = await axios.post(CreateEmployeeEnrollment, {
        customerName: name,
        EmployeeName,
        enrollmentDate,
        esicIpNumber,
        Uan,
        joiningDate,
        fatherName,
        remarks,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        setName("");
        setCustomerData({
          ...customerData,
          EmployeeName: "",
          enrollmentDate: moment().format('YYYY-MM-DD'),
          esicIpNumber: "",
          Uan: "",
          joiningDate: "",
          fatherName: "",
          remarks: "",
        });
      }
    }
  };

  const individualReport = () => {
    navigate("/dashboard/EmployeeIndividualReport");
  };
  const historicalReport = () => {
    navigate("/dashboard/EmployeeHistoricalReport");
  };

  return (
    <>
      <div className="w-full md:flex">
        <div className="flex justify-center py-10 items-center mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="">
              <h1 className="text-gray-800 font-bold text-2xl mb-7">
                Employee Enrollment Entry Done Here!
              </h1>
            </div>

            {/* first Box */}
            <div className="flex gap-6 w-full">
              <div className="sm:flex-col m-auto lg:inline-flex lg:flex-row lg:items-center lg:justify-center w-full">
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full justify-center  ">
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
                  <Box
                    sx={{ minWidth: 190 }}
                    className="pl-2 outline-none border-none bg-transparent hover:border-none"
                  >
                    <FormControl
                      fullWidth
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Customer Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="customerName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className=""
                      >
                        {customerNameData?.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item._id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
            </div>

            {/* Second Box */}
            <div className="flex gap-6 justify-between ">
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
            
                <div>
                  <h1 className="mr-1 text-gray-400">DOE</h1>
                </div>
                <input
                  className="pl-2 outline-none border-none bg-transparent w-full text-w-full"
                  type="date"
                  name="enrollmentDate"
                  onChange={handleChange}
                  value={customerData.enrollmentDate}
                  autoComplete="off"
                  placeholder="Enrollment Date"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
            
                <div>
                  <h1 className="mr-1 text-gray-400">DOJ</h1>
                </div>
            
                <input
                  className="pl-2 outline-none border-none bg-transparent w-full text-w-full"
                  type="date"
                  name="joiningDate"
                  onChange={handleChange}
                  value={customerData.joiningDate}
                  autoComplete="off"
                  placeholder="Joining Date"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="flex gap-6">
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
                  name="EmployeeName"
                  onChange={handleChange}
                  value={customerData.EmployeeName}
                  autoComplete="off"
                  placeholder="Employee Name"
                />
              </div>
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
                  type="text"
                  name="fatherName"
                  value={customerData.fatherName}
                  onChange={handleChange}
                  placeholder="Father Name "
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Fourth Row */}
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
                  type="Number"
                  name="esicIpNumber"
                  value={customerData.esicIpNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="ESIC IP Number"
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
                  name="Uan"
                  value={customerData.Uan}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="UAN Number"
                />
              </div>
            </div>

            {/* Fifth Row */}
            <div className="flex gap-6">
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

            <button
              type="submit"
              className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Save The Employee Enrollment
            </button>
            <div className="flex gap-6">
            <button
                  type="submit"
                  className="block w-full bg-[#fed7aa] mt-4 py-2 rounded-2xl text-[#ab4f2d] font-semibold mb-2"
                  onClick={historicalReport}
                  >
                  Historical Report
                </button>

              <button
                type="button"
                onClick={individualReport}
                className="block w-full bg-[#fed7aa] mt-4 py-2 rounded-2xl text-[#ab4f2d] font-semibold mb-2"
              >
                Individual Report
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CustomerHead;
