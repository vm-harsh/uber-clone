import React, { createContext, useState } from 'react'
import UserLogin from '../pages/UserLogin';
import UserSignup from '../pages/UserSignup';

export const userContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  return (
    <userContext.Provider value={{user,setUser,loading,setLoading}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider