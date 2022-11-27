
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Statistics from '../components/Statistics'
import Report from './Report'

const Home = () => {

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