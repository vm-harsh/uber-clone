import React, { useContext, useEffect } from 'react'
import { captainContext } from '../context/CaptainProvider'
import { Navigate } from 'react-router-dom';
import { statusContext } from '../context/StatusProvider';

const CaptainProtected = ({children}) => {

    const {captain,captainLoading} = useContext(captainContext);

    if(captainLoading){
        return <h1>Loading ....</h1>
    }

    if(!captain){
        return <Navigate to='/captain-login' replace />
    }
    

  return children;
}

export default CaptainProtected