import React from 'react'
import { FaLocationDot } from "react-icons/fa6";


const LocationSearchPanel = ({setRidePanelOpen}) => {

  const locations = [
    "BLOCK-B TOUCH STONE, Chandana Kadabeesanahalli, Bengaluru, Karnataka",
    "E-90 6 B.N P.A.C R.R.F Roorkee Road, Meerut"
  ]

  return (
    <div className='h-full w-full flex flex-col gap-2'>
      {locations.map((location,idx)=>{
        return <div key={idx} onClick={()=>setRidePanelOpen(true)}>
          <div className='w-full mx-auto rounded  px-3 py-2 flex gap-3 items-center bg-slate-100 border-2 border-white active:border-black'>
        <div className='p-4 rounded-full bg-[#ededed] flex items-center justify-center'><FaLocationDot /></div>
        <div>
          <h4 className='text-sm font-medium'>{location}</h4>
        </div>
      </div>
        </div> 
      })}
    </div>
  )
}

export default LocationSearchPanel