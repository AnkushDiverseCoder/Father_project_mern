import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { existingDscRoute, getCustomerName, newDscRoute, verifyToken } from "../../utils/ApiRoutes";

const DscEntry = () => {
  // All Variables And State Variables

  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [disable, setDisable] = useState(false);
  const [customerNameData, setCustomerNameData] = useState(null);
  const [newDsc, setNewDsc] = useState(false);
  const [contactNumber, setContactNumber] = useState(null);
  const handleNameChange = async (e) => {
    setName(e.target.value);
  };
  const handleNewDscCustomerNameChange = async (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleChange = (event) => {
    setCustomerEntry({
      ...customerEntry,
      [event.target.name]: event.target.value,
    });
  };

  const [customerEntry, setCustomerEntry] = useState({
    dateOfGeneration: moment().format("YYYY-MM-DD"),
    receivedAmount: "",
    amount: "",
    receivedDate: "",
    remarks: "",
    panNumber: "",
  });

  // All UseEffect Api Calls
  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
    };
    fetchCustomerName();
  }, [name]);

  //  Login Check
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

  // Toast Options

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Handle Submit Event Code
  const handleValidation = () => {
    const customerName = name;
    if (customerName === "") {
      toast.error("Customer Name is required", toastOptions);
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
    setDisable(true);

    if (handleValidation()) {

      const reqBody = {
        customerName: name,
        ...customerEntry,
        closingBalance: customerEntry.amount - customerEntry.receivedAmount,
        validTillDate: moment(customerEntry.dateOfGeneration)
          .add(2, "years")
          .format("YYYY-MM-DD"),
        renewalDate: moment(customerEntry.dateOfGeneration)
          .add(2, "years")
          .add(1, "days")
          .format("YYYY-MM-DD"),
      };
     
      if(!newDsc){
        const { data } = await axios.post(existingDscRoute, reqBody);
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
          setDisable(false);
        }
  
        if (data.status === true) {
          toast.success(data.msg, toastOptions);
          setDisable(false);
          setCustomerEntry({
            ...customerEntry,
            dateOfGeneration: "",
            amount: "",
            receivedDate: "",
            receivedAmount: "",
            remarks: "",
            panNumber: "",
          });
          setName(null)
          
        }
      }else{
       const { data } = await axios.post(newDscRoute, {...reqBody,contactNumber});
       if (data.status === false) {
        toast.error(data.msg, toastOptions);
        setDisable(false);
      }

      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        setDisable(false);
        setCustomerEntry({
          ...customerEntry,
          dateOfGeneration: "",
          amount: "",
          receivedDate: "",
          receivedAmount: "",
          remarks: "",
          panNumber: "",
        });
        setContactNumber(null)
      }      
      }
    }
  };

  return (
    <>
      <div className="w-full md:flex">
        <div className="flex py-10 items-center mx-auto">
          <form className="" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-7 underline">
              DSC Entry Done Here!
            </h1>

            {/* first Box */}
            <div className="flex gap-10 w-full mx-auto">
              {!newDsc && (
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
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
                      sx={{ m: 1, minWidth: 160 }}
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
                        {customerNameData?.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item._id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              )}
              {newDsc && (
                <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4">
                  <input
                    className="outline-none border-none bg-inherit"
                    type="text"
                    name="customerName"
                    value={name}
                    onChange={handleNewDscCustomerNameChange}
                    autoComplete="off"
                    placeholder="Customer Name"
                  />
                </div>
              )}

              <div className="flex items-center border-2 px-3 rounded-2xl mb-4 w-full bg-[#bb6a47] text-white text-xl ">
                {!newDsc && (
                  <button
                    type="button"
                    onClick={() => setNewDsc(true)}
                    className="w-full"
                  >
                    Existing Dsc
                  </button>
                )}
                {newDsc && (
                  <button
                    type="button"
                    onClick={() => setNewDsc(false)}
                    className="w-full"
                  >
                    New Dsc
                  </button>
                )}
              </div>
            </div>

            {/* Second Box */}
            <div className="flex gap-6 justify-center">
              <div className="flex items-center border-2 px-3 rounded-2xl mb-4 w-full">
                <h1 className="pr-2">G-Date</h1>
                <input
                  className="outline-none border-none bg-transparent"
                  type="Date"
                  name="dateOfGeneration"
                  value={customerEntry.dateOfGeneration}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Date of Commencement"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="Number"
                  name="amount"
                  value={customerEntry.amount}
                  autoComplete="off"
                  onChange={handleChange}
                  placeholder="Sale Value"
                />
              </div>
            </div>

            {/* Third Box */}
            <div className="flex gap-6 justify-center">
              <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4 w-full">
                <h1>R-Date</h1>
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="Date"
                  autoComplete="off"
                  name="receivedDate"
                  value={customerEntry.receivedDate}
                  onChange={handleChange}
                  placeholder="Received Date"
                />
              </div>
              <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="Number"
                  name="receivedAmount"
                  value={customerEntry.receivedAmount}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Received Amount"
                />
              </div>
            </div>

            {/* Fourth Box */}
            <div className="flex gap-6 justify-center">
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="Number"
                  value={customerEntry.amount - customerEntry.receivedAmount}
                  autoComplete="off"
                  placeholder="Closing Balance"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                <input
                  className="pl-2 outline-none border-none bg-inherit w-full"
                  type="text"
                  name="remarks"
                  autoComplete="off"
                  onChange={handleChange}
                  value={customerEntry.remarks}
                  placeholder="Remarks"
                />
              </div>
            </div>

            {/* FIFTH Box */}
            <div className="flex gap-6 justify-center">
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                <input
                  className="pl-2 outline-none border-none bg-inherit"
                  type="text"
                  name="panNumber"
                  value={customerEntry.panNumber}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="panNumber"
                />
              </div>
              {newDsc && (
                <div className="flex gap-6 justify-center w-full ">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 w-full">
                    <input
                      className="pl-2 outline-none border-none bg-inherit w-full"
                      type="text"
                      value={contactNumber}
                      onChange={(e) => {
                        setContactNumber(e.target.value);
                      }}
                      placeholder="contactNumber"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              disabled={disable}
            >
              Save The DSC Entry
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DscEntry;
