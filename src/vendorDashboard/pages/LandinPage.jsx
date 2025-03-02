import React, { useState ,useEffect } from 'react'
import Navbar from '../components/Navbar'
import "../../App.css";
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import Addfirm from '../components/forms/Addfirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/forms/Welcome';
import AllProducts from '../components/AllProducts';
import NotFound from '../components/Notfound';

const LandinPage = () => {
  const [showLogin,setshowLogin]=useState(false)
  const [showRegister,setshowRegister]=useState(false)
  const [showFirm,setshowFirm]=useState(false)
  const [showProduct,setshowProduct]=useState(false)
  const [showWelcome,setshowWelcome]=useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showLogOut, setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    console.log(loginToken);
    if(loginToken){
        setShowLogOut(true)
        setshowWelcome(true)
    }
  }, [])

  useEffect(()=>{
      const firmName = localStorage.getItem('firmName');
      const firmId = localStorage.getItem('firmId')
      if(firmName || firmId ){
          setShowFirmTitle(false)
          setshowWelcome(true)
      }
  },[])


  const logOutHandler =()=>{
    confirm("Are you sure to logout?")
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem('firmName');
      setShowLogOut(false)
      setShowFirmTitle(true)
      setshowWelcome(false)
  }

  const showLoginHandler=()=>{
    setshowLogin(true)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setShowAllProducts(false)

  }
  
  const showRegisterHandler=()=>{
    setshowRegister(true)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setShowAllProducts(false)

  }
  
  const showFirmHandler=()=>{
    if(showLogOut){
      setshowLogin(false)
      setshowRegister(false)
      setshowFirm(true)
      setshowProduct(false)
      setshowWelcome(false)
      setShowAllProducts(false)
    }else{
      alert("please login");
      setshowLogin(true)
    }

  }

  const showProductHandler=()=>{
    if(showLogOut){
      setshowLogin(false)
      setshowRegister(false)
      setshowFirm(false)
      setshowProduct(true)
      setshowWelcome(false)
      setShowAllProducts(false)
    }else{
      alert("please login")
      setshowLogin(true)
  }
  }

  const showWelcomeHandler=()=>{
    if(showLogOut){
      setshowLogin(false)
      setshowRegister(false)
      setshowFirm(false)
      setshowProduct(false)
      setshowWelcome(true)
      setShowAllProducts(false)
    }else{
      alert("please login")
      setshowLogin(true)
   }
  }

  const showAllProductsHandler = ()=>{
    if(showLogOut){
      setshowRegister(false)
      setshowLogin(false)
      setshowFirm(false)
      setshowProduct(false)
      setshowWelcome(false)
      setShowAllProducts(true)
  
  }else{
      alert("please login")
      setshowLogin(true)
   }
  }
  return (
    <>
         <section className='landingSection'>
            <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}
             showLogOut = {showLogOut}
             logOutHandler = {logOutHandler}
             /> 
            <div className="collectionSection">
            <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} 
            showAllProductsHandler = {showAllProductsHandler}
            showFirmTitle={showFirmTitle}
            />
            {showLogin && <Login showWelcomeHandler={showWelcomeHandler} /> }
            {showRegister && <Register showLoginHandler={showLoginHandler}/> }
            {showFirm &&  showLogOut && <Addfirm/> }
            {showProduct && showLogOut && <AddProduct /> }
            {/* //{showWelcome && <Welcome />} */}
            {showAllProducts && <AllProducts />}
            </div>
            
        </section>
    </>
   
  )
}

export default LandinPage