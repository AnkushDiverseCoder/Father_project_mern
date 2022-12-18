import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "../components/Table";
import { monthlyReportRoute, verifyToken } from "../utils/ApiRoutes";

const HistoricalReport = () => {
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
    const checkUser = async () => {
      const { data } = await axios.get(verifyToken,{withCredentials:true});
      if(data.msg === 'false'){
        navigate("login");
      }
    }
    checkUser()

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
      <div className="bg-[#ffe7d9] w-[100%] shadow-md hover:shadow-xl rounded-lg">
      <section className="text-[#7a0b2e] body-font">
          <div className="px-5 pt-20 pb-10 mx-auto shadow-lg">
            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto ">
              <div>

              <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font  shadow-2xl mb-6 p-2">
                "If an Egg is Broken by an Outside Force Life Ends , If Broken by
                an Inside Force , Life Begins Great Thinks always from
                Inside..."
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
                  onClick={handleSubmit}
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
            <Table
              id={data._id}
              data={data}
              remarks='true'
              filterData={filterData}
              name={startDate}
              endDate={endDate}
              report='historicalReport'
              totalData={totalData}
              setFilterData={setFilterData}
            />
          </div>
        )}
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

export default HistoricalReport;
