import React, { useEffect } from 'react'
import { useContext } from 'react'
import { userContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogout = () => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(userContext);
    useEffect(()=>{
        const logout = async () => {
            const response = await axios.get(`http://localhost:3000/users/auth/logout`,{withCredentials: true});
            console.log(user);
            if(response.status === 200){
                setUser(null);
                navigate('/login');
            }
        }
        logout();
    },[])
    
    return <h1>logout ....</h1>;

}

export default UserLogout