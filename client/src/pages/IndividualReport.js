import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import Table from "../components/Table";
import "react-datepicker/dist/react-datepicker.css";
import {
  getCustomerName,
  individualReportRoute,
  verifyToken,
} from "../utils/ApiRoutes";

const DailyReport = () => {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
    };
    fetchCustomerName();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await axios.get(verifyToken, { withCredentials: true });
      if (data.msg === "false") {
        navigate("login");
      }
    };
    checkUser();
  }, [navigate]);

  const [name, setName] = useState("");
  const [customerNameData, setCustomerNameData] = useState(null);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [openTable, setOpenTable] = useState(false);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(individualReportRoute, {
      customerName: name,
    });

    if (res.data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (res.data.status === true) {
      setFilterData(data);
      toast.success("data received", toastOptions);
      setData(res.data.msg);
      setTotalData(res.data.TotalData);
      setOpenTable(true);
    }
  };

  return (
    <>
      <div className="bg-[#ffe7d9] w-[100%] shadow-md hover:shadow-xl rounded-lg">
        <div className="">
          <section className="text-[#7a0b2e] body-font">
            <div className="px-5 pt-20 pb-10 mx-auto shadow-lg">
              <div className="lg:w-2/3 flex  sm:flex-row sm:items-center justify-center items-start mx-auto ">
                <div>
                  <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font shadow-2xl w-full mb-4 p-2">
                    "I will always Choose a Lazy Person to do a difficult job
                    ... because he will find an easy way to do it..."
                  </h1>


                  <div className="flex-col w-full justify-center items-center lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                    <div className="sm:flex-col m-auto lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-[#b46c77] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#ffe7d9]"
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
                            <InputLabel
                              id="demo-simple-select-label"
                              className="text-[#ffe7d9]"
                            >
                              Customer Name
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              name="customerName"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="text-[#ffe7d9]"
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
                        <button
                          type="button"
                          className="flex-shrink-0 bg-[#59b3ae] border-0 py-2 shadow-md hover:shadow-xl px-8 focus:outline-none rounded text-lg ml-2 mt-10 sm:mt-0"
                          onClick={handleSubmit}
                        >
                          submit
                        </button>
                  </div>


                </div>
              </div>
            </div>
            {openTable && (
              <div className="rounded-lg">
                <Table
                  id={data._id}
                  data={data}
                  remarks="true"
                  report="individual"
                  filterData={filterData}
                  name={name}
                  totalData={totalData}
                  setFilterData={setFilterData}
                />
                {console.log(data)}
              </div>
            )}
          </section>
          {/*  Displaying the total data  */}
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
    </>
  );
};

export default DailyReport;
