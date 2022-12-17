import { BrowserRouter, Routes, Route } from "react-router-dom";
import DailyReport from "./components/DailyReport";
import IndividualReport from "./components/IndividualReport";
import MonthlyReport from "./components/MonthlyReport";
import AccountingEntries from "./pages/AccountingEntries";
import Contact from "./pages/Contact";
import CustomerHead from "./pages/CustomerHead";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Report from "./pages/Report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* If User Exists */}
        <Route path="/">
          {/* Home Page */}
          <Route
            index
            element={<Home /> }
          ></Route>
          {/* contact page */}
          <Route
            path="/contact"
            element={ <Contact /> }
            ></Route>
            {/* customerhead page */}
          <Route
            path="/customerhead"
            element={ <CustomerHead /> }
          ></Route>
            {/* Accounting Entries page */}
          <Route
            path="/accountingentries"
            element={ <AccountingEntries /> }
          ></Route>
            {/* report page */}
          <Route
            path="/report"
            element={ <Report off={true}/> }
          ></Route>
            {/* daily report page */}
          <Route
            path="/dailyReport"
            element={ <DailyReport /> }
          ></Route>
            {/* monthly report page */}
          <Route
            path="/monthlyReport"
            element={ <MonthlyReport /> }
          ></Route>
            {/* Individual report page */}
          <Route
            path="/individualReport"
            element={ <IndividualReport/> }
          ></Route>
        </Route>

        {/* login and signup routes */}
        <Route
          path="/login"
          exact
          element={ <Login />}
        />
         {/* <Route
          path="/signup"
          exact
          element={<Signup /> }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
