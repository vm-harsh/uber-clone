
import React, { createContext, useState } from 'react'

export const statusContext = createContext();
const StatusProvider = ({children}) => {


    const [err, setErr] = useState("");
  return (
    <statusContext.Provider value={{err,setErr}}>
        {children}
    </statusContext.Provider>
  )

}

export default StatusProvider