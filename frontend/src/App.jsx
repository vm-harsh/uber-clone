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



const App = () => {
  const {setUser, setLoading} = useContext(userContext);

  useEffect(()=>{
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
        setLoading(false)
      };

    }

    fetchUser();
  },[setUser, setLoading])

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
      </Routes>
    </div>
  )
}

export default App