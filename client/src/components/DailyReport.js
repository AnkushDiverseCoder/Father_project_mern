import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { DailyReportRoute } from "../utils/ApiRoutes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const DailyReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [filterData, setFilterData] = useState([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      navigate("/login");
    }

  }, [navigate]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = format(startDate, "yyyy-MM-dd");
    const res = await axios.post(DailyReportRoute, { date });

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

  const handleOnchange = (e) => {
    setStartDate(e);
  };

  return (
    <>
      <div className="h-screen bg-gray-900">
        <Navbar />
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="px-5 py-24 mx-auto">
            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
              <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">
                never think i have nothing never think i have everything but
                always think i have something and i can achieve anything
              </h1>
              <div className="flex-col justify-center items-center lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                <div>
                  <DatePicker
                    name="invoiceDate"
                    type="text"
                    size="sm"
                    closeOnScroll={true}
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleOnchange}
                    isClearable
                  
                    className="flex-shrink-0 ml-auto mb-3 lg:mb-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                  />
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
              title="Daily Report"
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
