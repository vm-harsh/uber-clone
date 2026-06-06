import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { captainContext } from '../context/CaptainProvider';
import axios from 'axios';

const CaptainLogout = () => {
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(captainContext);
    useEffect(()=>{
        const logout = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/captain/auth/logout`,{withCredentials: true});
            if(response.status === 200){
                setCaptain(null);
                navigate('/captain-login');
            }
        }
        logout();
    },[])
    
    return <h1>logout ....</h1>;
}

export default CaptainLogout