import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import {
  BankingEntryRoute,
  BankingReportRoute,
  getCustomerName,
  verifyToken,
} from "../utils/ApiRoutes";
import BankingReport from "../components/BankingReport";

const BankingEntry = () => {
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(false);
  const [report, setReport] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [totalData, setTotalData] = useState(null);
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filterData, setFilterData] = useState([]);

  const handleNameChange = async (e) => {
    setName(e.target.value);
  };

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

  const [customerEntry, setCustomerEntry] = useState({
    date: "",
    creditAmount: "",
    narration: "",
  });

  const [customerNameData, setCustomerNameData] = useState(null);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
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
    const { narration, date, creditAmount } = customerEntry;
    const customerName = name;
     if (date === "") {
      toast.error("Date is required", toastOptions);
      setDisable(false);
    } else if (creditAmount === "") {
      toast.error("CreditAmount is required", toastOptions);
      setDisable(false);
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setCustomerEntry({
      ...customerEntry,
      customerName: name,
    });
    setDisable(true);

    if (handleValidation()) {
      const { narration, date, creditAmount } = customerEntry;

      const { data } = await axios.post(BankingEntryRoute, {
        customerName: name,
        date,
        creditAmount,
        narration,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        setDisable(false);
      }

      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        setDisable(false);
        setCustomerEntry({
          ...customerEntry,
          date: "",
          creditAmount: "",
          narration: "",
        });
      }
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const startDateFormated = format(startDate, "yyyy-MM-dd");
    const endDateFormated = format(endDate, "yyyy-MM-dd");
    const res = await axios.post(BankingReportRoute, {
      startDateFormated,
      endDateFormated,
    });

    if (res.data.status === false) {
      toast.error(res.data.msg, toastOptions);
    }
    if (res.data.status === true) {
      toast.success("data received", toastOptions);
      setData(res.data.msg);
      setFilterData(res.data.msg);
      setTotalData(res.data.TotalData);
      setOpenTable(true);
    }
  };

  return (
    <>
      <div className="w-full md:flex h-full">
        <div className="flex py-10 items-center m-auto h-full">
          <form className="" onSubmit={handleSubmit}>
            {!report && (
              <>
                <h1 className="text-gray-800 font-bold text-2xl mb-7">
                  Banking Entry Done Here!
                </h1>

                <div className="flex gap-10 w-full mx-auto">
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
                  <div className="flex items-center border-2 px-3 rounded-2xl mb-4">
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
                      name="date"
                      value={customerEntry.date}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Date of Commencement"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4">
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
                      className="pl-2 outline-none border-none bg-inherit w-full"
                      type="number"
                      name="creditAmount"
                      value={customerEntry.creditAmount}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Credited Amount"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center border-2 py-3 px-3 rounded-2xl mb-4">
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
                      className="pl-2 outline-none border-none bg-inherit"
                      type="text"
                      name="narration"
                      value={customerEntry.narration}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="narration"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                  disabled={disable}
                >
                  Save The Banking Entry
                </button>
                <button
                  type="submit"
                  className="block w-full bg-red-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                  disabled={disable}
                  onClick={() => setReport(true)}
                >
                  Banking Entry Report
                </button>
              </>
            )}
          </form>
        </div>
        {report && (
          <div className="bg-[#ffe7d9] w-[100%] shadow-md hover:shadow-xl rounded-lg">
            <section className="text-[#7a0b2e] body-font">
              <div className="px-5 pt-20 pb-10 mx-auto shadow-lg">
                <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto ">
                  <div>
                    <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font  shadow-2xl mb-6 p-2 pt-5">
                      "If an Egg is Broken by an Outside Force Life Ends , If
                      Broken by an Inside Force , Life Begins Great Thinks
                      always from Inside..."
                    </h1>
                    <div className="sm:flex-col w-full m-auto lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                      <div>
                        <DatePicker
                          name="invoiceDate"
                          type="text"
                          size="sm"
                          selected={startDate}
                          dateFormat="dd/MM/yyyy"
                          onChange={(e) => setStartDate(e)}
                          className="flex-shrink-0 ml-auto mb-3 lg:mb-0 mr-2  text-[#ffe7d9] bg-[#b46c77] border-0 py-2 px-8 focus:outline-non rounded text-lg mt-10 sm:mt-0"
                        />
                      </div>
                      <div>
                        <DatePicker
                          name="invoiceDate"
                          type="text"
                          size="sm"
                          selected={endDate}
                          dateFormat="dd/MM/yyyy"
                          onChange={(e) => setEndDate(e)}
                          className="flex-shrink-0 ml-auto mb-3  lg:mb-0 text-[#ffe7d9] bg-[#b46c77] border-0 py-2 px-8 focus:outline-non rounded text-lg mt-10 sm:mt-0"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          className="flex-shrink-0 bg-[#59b3ae] border-0 py-2 px-8 focus:outline-none rounded text-lg ml-2 mt-10 sm:mt-0"
                          onClick={handleReportSubmit}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {openTable && (
              <div className="rounded-lg">
                <BankingReport
                  data={data}
                  remarks="true"
                  filterData={filterData}
                  name={startDate}
                  endDate={endDate}
                  totalData={totalData}
                  setFilterData={setFilterData}
                />
              </div>
            )}

            {report && (
              <button
                type="submit"
                className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                onClick={() => setReport(false)}
              >
                Close The Report
              </button>
            )}
          </div>
        )}
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

export default BankingEntry;
