import React, {useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import Home from './pages/Home'
import UserProtected from './guards/UserProtected'
import { userContext } from './context/UserProvider'
import axios from 'axios'
import UserLogout from './pages/UserLogout'
import { captainContext } from './context/CaptainProvider'
import CaptainProtected from './guards/CaptainProtected'
import CaptainHome from './pages/CaptainHome'
import { statusContext } from './context/StatusProvider'



const App = () => {
  const {setUserLoading,setUser} = useContext(userContext);
  const {setCaptainLoading,setCaptain} = useContext(captainContext);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`,{withCredentials:true});
      if(response.status === 200){
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
    finally{
      setUserLoading(false)
    };

  }

  const fetchCaptain = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/captain/profile`, {withCredentials:true});
      if(response.status === 200){
      setCaptain(response.data.captain);
    }
    } catch (error) {
      setCaptain(null);
    }
    finally{
      setCaptainLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchUser(),
    fetchCaptain()
  },[])



  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/home' element={
          <UserProtected>
            <Home/>
          </UserProtected>
        } />
        <Route path='/user/logout' element={
          <UserProtected>
            <UserLogout/>
          </UserProtected>} />


          {/* CAPTAIN ROUTES */}

          <Route path='/captain-home' element={
            <CaptainProtected>
              <CaptainHome/>
            </CaptainProtected>
          } />
      </Routes>
    </div>
  )
}

export default App