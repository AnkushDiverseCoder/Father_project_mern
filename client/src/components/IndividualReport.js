import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

import "react-datepicker/dist/react-datepicker.css";
import { getCustomerName, individualReportRoute } from "../utils/ApiRoutes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "./Table";

const DailyReport = () => {
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const allCustomerName = await axios.get(getCustomerName);
      setCustomerNameData(allCustomerName.data.msg);
    };
    fetchCustomerName();
  }, []);

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
      <div className="h-screen bg-gray-900">
        <Navbar />
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="px-5 py-24 mx-auto">
            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
              <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">
                if an egg is broken by an outside force , Life Ends if broken by
                an inside force life begins great thinks always begin from
                inside
              </h1>
              <div className="flex-col justify-center items-center lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                <div className="sm:flex-col m-auto lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
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
                </div>
                <div>
                  <button
                    className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-2 mt-10 sm:mt-0"
                    onClick={handleSubmit}
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {openTable && (
          <div>
            <Table
              id={data._id}
              data={data}
              filterData={filterData}
              setFilterData={setFilterData}
            />
          </div>
        )}
        {/*  Displaying the total data  */}

        {openTable && (
          <section className="text-gray-600 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.AmountCreditedTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl  ">
                    Credited Amount Total
                  </p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.epfTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    EPF Amount Total
                  </p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.esicTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    ESIC Amount Total
                  </p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.otherTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    Other Debit Total
                  </p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.professionalFeesTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    Professional Fees Total
                  </p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.epfTotal +
                      totalData[0]?.esicTotal +
                      totalData[0]?.otherTotal +
                      totalData[0]?.professionalFeesTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    Total Debit
                  </p>
                </div>
                <div className="p-4 sm:min-w-full w-full">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.AmountCreditedTotal -
                      (totalData[0]?.epfTotal +
                        totalData[0]?.esicTotal +
                        totalData[0]?.otherTotal +
                        totalData[0]?.professionalFeesTotal)}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    Net Difference
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="">
          <Footer />
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
      </div>
    </>
  );
};

export default DailyReport;
