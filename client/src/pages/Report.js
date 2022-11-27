import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HistoricalImg from "../assets/1.jpeg"
import DailyImg from "../assets/10.jpeg"
import IndividualImg from "../assets/11.jpeg"

const Report = ({off}) => {
  const navigate = useNavigate();
  
  const navigatePage = (e) => {
    e.preventDefault();
    if (e.target.id === "individual") {
      navigate("/individualReport");
    } else if (e.target.id === "daily") {
      navigate("/dailyReport");
    } else if (e.target.id === "monthly") {
      navigate("/monthlyReport");
    } else if (e.target.id === "yearly") {
      navigate("/yearlyReport");
    }
  };

  return (
    <>
      {off && <Navbar />}
      <section className="text-gray-400 body-font bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                Vaishnavi Consultant
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded" />
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">
              Success Isn't always about greatness, Its about consistency . 
              <br/>
              Consistent HardWork leads to success 
              <br/>
              " Greatness Will Come "     
            </p>
          </div>
          <div className="flex flex-wrap -m-4 items-center justify-center" >
            <div className="xl:w-1/4 md:w-1/2 p-4 ">
              <div
                className="bg-gray-800 bg-opacity-40 p-6 rounded-lg"
                onClick={navigatePage}
                id="individual"
              >
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={IndividualImg}
                  alt="content"
                  onClick={navigatePage}
                  id="individual"
                />
                <h3
                  className="tracking-widest text-indigo-400 text-xs font-medium title-font"
                  onClick={navigatePage}
                  id="individual"
                >
                  REPORT
                </h3>
                <h2
                  className="text-lg text-white font-medium title-font mb-4"
                  onClick={navigatePage}
                  id="individual"
                >
                  Individual Statement
                </h2>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div
                className="bg-gray-800 bg-opacity-40 p-6 rounded-lg"
                onClick={navigatePage}
                id="daily"
              >
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={DailyImg}
                  alt="content"
                  onClick={navigatePage}
                  id="daily"
                />
                <h3
                  className="tracking-widest text-indigo-400 text-xs font-medium title-font"
                  onClick={navigatePage}
                  id="daily"
                >
                  REPORT
                </h3>
                <h2
                  className="text-lg text-white font-medium title-font mb-4"
                  onClick={navigatePage}
                  id="daily"
                >
                  Daily Statement
                </h2>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div
                className="bg-gray-800 bg-opacity-40 p-6 rounded-lg"
                onClick={navigatePage}
                id="monthly"
              >
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={HistoricalImg}
                  alt="content"
                  onClick={navigatePage}
                  id="monthly"
                />
                <h3
                  onClick={navigatePage}
                  id="monthly"
                  className="tracking-widest text-indigo-400 text-xs font-medium title-font"
                >
                  REPORT
                </h3>
                <h2
                  onClick={navigatePage}
                  id="monthly"
                  className="text-lg text-white font-medium title-font mb-4"
                >
                  Historical Statement
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {off && <Footer />}
    </>
  );
};

export default Report;
