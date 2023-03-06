
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import { verifyToken } from '../../utils/ApiRoutes';

const DscDashboard = () => {

  const navigate = useNavigate();

  // Checking the Login User
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(verifyToken, {
        token,
      });

      if (data.status === "false") {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <section>
          <Link to="/dashboard/NewDsc">
        <div className='flex w-full'>
            <button className='m-auto w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2' type='button'> New Dsc Entry </button>
        </div>
          </Link>

        <Link to="/dashboard/DscReport">
        <div className='flex w-full'>
            <button className='m-auto w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2' type='button'> Report Dsc Entry </button>
        </div>
        </Link>

    </section>
  )
}
export default DscDashboard