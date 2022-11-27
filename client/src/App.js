import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DailyReport from "./components/DailyReport";
import IndividualReport from "./components/IndividualReport";
import MonthlyReport from "./components/MonthlyReport";
import AccountingEntries from "./pages/AccountingEntries";
import Contact from "./pages/Contact";
import CustomerHead from "./pages/CustomerHead";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Report from "./pages/Report";

function App() {
  const user = localStorage.getItem("jwt-token");
  return (
    <BrowserRouter>
      <Routes>
        {/* If User Exists */}
        <Route path="/">
          {/* Home Page */}
          <Route
            index
            element={user ? <Home /> : <Navigate to="/Login" />}
          ></Route>
          {/* contact page */}
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/Login" />}
            ></Route>
            {/* customerhead page */}
          <Route
            path="/customerhead"
            element={user ? <CustomerHead /> : <Navigate to="/Login" />}
          ></Route>
            {/* Accounting Entries page */}
          <Route
            path="/accountingentries"
            element={user ? <AccountingEntries /> : <Navigate to="/Login" />}
          ></Route>
            {/* report page */}
          <Route
            path="/report"
            element={user ? <Report off={true}/> : <Navigate to="/Login" />}
          ></Route>
            {/* daily report page */}
          <Route
            path="/dailyReport"
            element={user ? <DailyReport /> : <Navigate to="/Login" />}
          ></Route>
            {/* monthly report page */}
          <Route
            path="/monthlyReport"
            element={user ? <MonthlyReport /> : <Navigate to="/Login" />}
          ></Route>
            {/* Individual report page */}
          <Route
            path="/individualReport"
            element={user ? <IndividualReport/> : <Navigate to="/Login" />}
          ></Route>
        </Route>

        {/* login and signup routes */}
        <Route
          path="/login"
          exact
          element={user ? <Navigate to="/" /> : <Login />}
        />
        {/* <Route
          path="/signup"
          exact
          element={user ? <Navigate to="/" /> : <Signup />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
