
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Statistics from '../components/Statistics'
import Report from './Report'

const Home = () => {
   const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      navigate("/login");
    }

  }, [navigate]);

  return (
    <>
    <Navbar/>
      <Statistics/>
      <Report off={false}/>
    <Footer/>
    </>
  )
}

export default Home