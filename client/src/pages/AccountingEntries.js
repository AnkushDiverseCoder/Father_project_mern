import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AccountingEntryRoute, getCustomerName } from "../utils/ApiRoutes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const AccountingEntries = () => {
  const [name, setName] = useState("");
  const [customerEntry, setCustomerEntry] = useState({
    customerName: "",
    monthComplianceDate: "",
    monthComplianceAmount: "",
    epfAmount: "",
    esicAmount: "",
    otherDebit: "",
    remarks: "",
    phoneNumber: "",
    email: "",
  });

  const [customerNameData, setCustomerNameData] = useState(null);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
    };
    fetchCustomerName();
  }, []);

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
    setCustomerEntry({
      ...customerEntry,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidation = () => {
    const {
      customerName,
      monthComplianceDate,
      monthComplianceAmount,
      epfAmount,
      esicAmount,
      otherDebit,
      remarks,
    } = customerEntry;
    if (customerName === "") {
      toast.error("Customer Name is required", toastOptions);
      return false;
    } else if (monthComplianceDate === "") {
      toast.error("monthComplianceDate is required", toastOptions);
      return false;
    } else if (monthComplianceAmount === "") {
      toast.error("monthComplianceAmount is required", toastOptions);
      return false;
    } else if (epfAmount === "") {
      toast.error("epfAmount is required", toastOptions);
      return false;
    } else if (esicAmount === "") {
      toast.error("esicAmount is required", toastOptions);
      return false;
    } else if (otherDebit === "") {
      toast.error("otherDebit is required", toastOptions);
      return false;
    } else if (remarks === "") {
      toast.error("remarks is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCustomerEntry({
      ...customerEntry,
      customerName: name,
    });

    if (handleValidation()) {
      const {
        customerName,
        monthComplianceDate,
        monthComplianceAmount,
        epfAmount,
        esicAmount,
        otherDebit,
        remarks,
      } = customerEntry;

      const { data } = await axios.post(AccountingEntryRoute, {
        customerName,
        monthComplianceDate,
        monthComplianceAmount,
        epfAmount,
        esicAmount,
        otherDebit,
        remarks,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
          
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen md:flex">
        {/* Left Side Div */}
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-7">
              Accounting Entry Done Here!
            </h1>

            {/* first Box */}
            <div className="flex">
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
                <Box
                  sx={{ minWidth: 190 }}
                  className="pl-2 outline-none border-none bg-transparent hover:border-none"
                >
                  <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">
                      Customer Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="customerName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    >
                      {customerNameData?.map((item, index) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item._id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
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
                  className="pl-2 outline-none border-none bg-transparent"
                  type="date"
                  name="monthComplianceDate"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Date of Commencement"
                />
              </div>
            </div>

            {/* Second Box */}
            <div className="flex">
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
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="Number"
                  name="monthComplianceAmount"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Compliance Credited"
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
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="Number"
                  name="epfAmount"
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Epf Fees"
                />
              </div>
            </div>

            {/*Third Box */}
            <div className="flex">
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
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="Number"
                  autoComplete="off"
                  name="esicAmount"
                  onChange={handleChange}
                  placeholder="Esic Fees"
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
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="Number"
                  name="otherDebit"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Other Debit"
                />
              </div>
            </div>

            {/* Fourth Box */}
            <div className="flex">
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
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="remarks"
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Remarks"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  type="number"
                  name="phoneNumber"
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="PhoneNumber"
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Save The Accounting Entry
            </button>
          </form>
        </div>
        {/* Right Side Div */}
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
         
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AccountingEntries;
