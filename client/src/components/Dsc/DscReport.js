import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils/ApiRoutes';

const DscReport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token")
      const {data}  = await axios.post(verifyToken,{
        token
      });

      if(data.status==="false"){
        navigate("/login");
      }
    }
    checkUser()

  }, [navigate]);
  return (
    <div>DscReport</div>
  )
}

export default DscReport