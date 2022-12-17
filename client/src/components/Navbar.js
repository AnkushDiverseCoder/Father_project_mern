import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/16.jpeg"

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
      if (localStorage.clear("jwt-token")) {
        navigate("/login");
      }

  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <img src={Logo} alt="" className="w-10 h-10 text-white rounded-full" />
          <span className="ml-3 text-xl">Vaishnavi Consultant</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Link to="/customerhead" className="mr-5 hover:text-white">
             Masters
          </Link>
          <Link to="/accountingentries" className="mr-5 hover:text-white">
            Accounting
          </Link>
          <Link to="/report" className="mr-5 hover:text-white">
            Report
          </Link>
          <Link to="/contact" className="mr-5 hover:text-white">
            Contact Us
          </Link>
        </nav>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" onClick={handleLogout}>
          Logout
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
