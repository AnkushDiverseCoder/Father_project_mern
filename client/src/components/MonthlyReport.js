import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { monthlyReportRoute } from "../utils/ApiRoutes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const MonthlyReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    const startDateFormated = format(startDate, "yyyy-MM-dd");
    const endDateFormated = format(endDate, "yyyy-MM-dd");
    const res = await axios.post(monthlyReportRoute, {
      startDateFormated,
      endDateFormated,
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
              <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white hidden lg:inline-flex">
                if an egg is broken by an outside force , Life Ends if broken by
                an inside force life begins great thinks always begin from
                inside
              </h1>
              <div className="sm:flex-col m-auto lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                <div>
                  <DatePicker
                    name="invoiceDate"
                    type="text"
                    size="sm"
                    closeOnScroll={true}
                    selected={startDate}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    onChange={(e) => setStartDate(e)}
                    className="mb-3 ml-3 lg:mb-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
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
                    className="mb-3 ml-3 lg:mb-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                  />
                </div>
                <div>
                  <button
                    className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-2 mt-10 sm:mt-0 "
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
              data={data}
              filterData={filterData}
              title="Historical Report"
              setFilterData={setFilterData}
            />
          </div>
        )}

        {/*  Displaying the total data  */}

        {openTable && (
          <section className="text-gray-600 bg-gray-900 body-font">
            <div className=" px-5 py-24 mx-auto">
              <div className="flex flex-wrap text-center justify-center">
                <div className="p-4">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.AmountCreditedTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl  ">
                    Credited Amount Total
                  </p>
                </div>
                <div className="p-4">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.epfTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    EPF Amount Total
                  </p>
                </div>
                <div className="p-4">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.esicTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    ESIC Amount Total
                  </p>
                </div>
                <div className="p-4">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.otherTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    Other Debit Total
                  </p>
                </div>
                <div className="p-4">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                    {totalData[0]?.professionalFeesTotal}
                  </h2>
                  <p className="leading-relaxed text-orange-400 sm:text-xl ">
                    Professional Fees Total
                  </p>
                </div>
                <div className="p-4">
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
                <div className="p-4">
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

        <div>
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

export default MonthlyReport;
