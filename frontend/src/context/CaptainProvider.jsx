import React, { createContext, useState } from 'react'

export const captainContext = createContext();
const CaptainProvider = ({children}) => {
  
    const [captain, setCaptain] = useState(null);
    const [captainLoading, setCaptainLoading] = useState(true);

    return (
        <captainContext.Provider value={{captain,setCaptain,captainLoading,setCaptainLoading}}>
            {children}
        </captainContext.Provider>
    );
}

export default CaptainProvider