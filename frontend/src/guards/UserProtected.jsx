import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { userContext } from '../context/UserProvider';
import { statusContext } from '../context/StatusProvider';

const UserProtected = ({children}) => {
  const {user,userLoading} = useContext(userContext);
  
  if(userLoading){
    return <h1> Loading ....</h1>
  }

  
  if(!user){
    return <Navigate to='/login' replace />
  }

  

  return children;
}

export default UserProtected;