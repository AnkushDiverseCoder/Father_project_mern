import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  AccountingEntryRoute,
  getCustomerEmail,
  getCustomerName,
} from "../utils/ApiRoutes";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import emailjs from "@emailjs/browser";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const AccountingEntries = () => {
  const [name, setName] = useState("New EPF/ESIC Registration");
  const [sendEmail, setSendEmail] = useState(false);
  const [Email, setEmail] = useState("");
  const refEmail = useRef();

  const handleNameChange = async (e) => {
    setName(e.target.value);
  };

  const [customerEntry, setCustomerEntry] = useState({
    monthComplianceDate: "",
    monthComplianceAmount: "",
    epfAmount: "",
    esicAmount: "",
    otherDebit: "",
    remarks: "Compliance For the Month/Period ",
    professionalFees: "",
  });

  const [customerNameData, setCustomerNameData] = useState(null);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
      const getCustomerEmailAddress = await axios.post(getCustomerEmail, {
        customerName: name,
      });
      setEmail(getCustomerEmailAddress.data.email);
    };
    fetchCustomerName();
  }, [name]);

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
      monthComplianceDate,
      monthComplianceAmount,
      epfAmount,
      esicAmount,
      otherDebit,
      professionalFees,
      remarks,
    } = customerEntry;
    const customerName = name;
    console.log(customerName);
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
    } else if (professionalFees === "") {
      toast.error("professionalFees is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setCustomerEntry({
      ...customerEntry,
      customerName: name,
    });

    if (handleValidation()) {
      const {
        monthComplianceDate,
        monthComplianceAmount,
        epfAmount,
        esicAmount,
        otherDebit,
        professionalFees,
        remarks,
      } = customerEntry;

      const { data } = await axios.post(AccountingEntryRoute, {
        customerName: name,
        monthComplianceDate,
        monthComplianceAmount,
        epfAmount,
        esicAmount,
        otherDebit,
        remarks,
        professionalFees,
        sendEmailCheck: sendEmail,
      });

      if (sendEmail) {
        
        emailjs
          .sendForm(
            "service_dm3bdfi",
            "template_ogwlg4e",
            refEmail.current,
            "Wjf9hzjOl_FZgISVH"
          )
          .then(
            (result) => {
              console.log(result);
            },
            (error) => {
              console.log(error);
            }
          );
        console.log(refEmail.current);
      }

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        if (data.response) {
          console.log(data.response);
        }
        setSendEmail(false);
      }
    }
  };

  // setCustomerEntry({
  //   ...customerEntry,
  //   monthComplianceDate: "",
  //   monthComplianceAmount: "",
  //   epfAmount: "",
  //   esicAmount: "",
  //   otherDebit: "",
  //   remarks: "Compliance For the Month/Period ",
  //   professionalFees: "",
  // });

  const creditedAmount = parseInt(customerEntry.monthComplianceAmount);

  const debit =
    parseInt(customerEntry.epfAmount) +
    parseInt(customerEntry.esicAmount) +
    parseInt(customerEntry.otherDebit) +
    parseInt(customerEntry.professionalFees);
  const balance =
    parseInt(customerEntry.monthComplianceAmount) -
    (parseInt(customerEntry.epfAmount) +
      parseInt(customerEntry.esicAmount) +
      parseInt(customerEntry.otherDebit) +
      parseInt(customerEntry.professionalFees));

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
                      onChange={handleNameChange}
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
                  value={customerEntry.monthComplianceDate}
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
                  value={customerEntry.monthComplianceAmount}
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
                  value={customerEntry.epfAmount}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Epf Payable"
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
                  value={customerEntry.esicAmount}
                  onChange={handleChange}
                  placeholder="Esic Payable"
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
                  value={customerEntry.otherDebit}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Other Debit"
                />
              </div>
            </div>

            {/* Fourth Box */}
            <div className="flex">
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
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="remarks"
                  autoComplete="off"
                  onChange={handleChange}
                  value={customerEntry.remarks}
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
                  name="professionalFees"
                  value={customerEntry.professionalFees}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="professionalFees"
                />
              </div>
            </div>

            {/* Email Check Box */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                }
                label="Email"
                className="text-gray-400"
              />
            </FormGroup>
            {/* Checking block */}
            {sendEmail && (
              <>
                <label>Check Details</label>
                <form
                  ref={refEmail}
                  onSubmit={sendEmail}
                  className="flex flex-col "
                >
                  <div>
                    <label className="pr-3">creditedAmount</label>
                    <input
                      type="text"
                      name="creditedAmount"
                      value={creditedAmount}
                    />
                  </div>
                  <div>
                    <label className="pr-3">debit</label>
                    <input type="text" name="debit" value={debit} />
                  </div>
                  <div>
                    <label className="pr-3">balance</label>
                    <input type="text" name="balance" value={balance} />
                  </div>
                  <div>
                    <label className="pr-3">Email</label>
                    <input type="email" name="user_email" value={Email} />
                  </div>
                </form>
              </>
            )}

            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Save The Accounting Entry
            </button>
          </form>
        </div>
        {/* Right Side Div */}
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden"></div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AccountingEntries;
