import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { DailyReportRoute, verifyToken } from "../utils/ApiRoutes";
import Table from "../components/Table";

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
    const checkUser = async () => {
      const { data } = await axios.get(verifyToken, { withCredentials: true });
      if (data.msg === "false") {
        navigate("login");
      }
    };
    checkUser();
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
      console.log(data);
      setTotalData(res.data.TotalData);
      setOpenTable(true);
    }
  };

  const handleOnchange = (e) => {
    setStartDate(e);
  };

  return (
    <>
      <div className="bg-[#ffe7d9] w-[100%] shadow-md hover:shadow-xl rounded-lg">
        <section className="text-[#7a0b2e] body-font">
          <div className="px-5 pt-20 pb-10 mx-auto shadow-lg">
            <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto ">
              <div>
                <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font shadow-xl mb-6 p-2">
                  "Never Think I Have Nothing , Never Think I Have Everything ,
                  But Always Think I Have Something And I Can Achieve
                  Anything..."
                </h1>
                <div className="flex-col w-full justify-center items-center lg:inline-flex lg:flex-row lg:items-center lg:justify-center">
                  <div>
                    <DatePicker
                      name="invoiceDate"
                      type="text"
                      size="sm"
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={handleOnchange}
                      className="flex-shrink-0 ml-auto mb-3 lg:mb-0 text-[#ffe7d9] bg-[#b46c77] border-0 py-2 px-8 focus:outline-non rounded text-lg mt-10 sm:mt-0"
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
              remarks="true"
              filterData={filterData}
              name={startDate}
              report="daily"
              totalData={totalData}
              setFilterData={setFilterData}
            />
            {console.log(data)}
          </div>
        )}

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
    </>
  );
};

export default DailyReport;
