import React from 'react'
import car from '../assets/images/uber_car.png'
import moto from '../assets/images/uber_moto.png'
import auto from '../assets/images/uber_auto.png'
import { FaChevronDown } from 'react-icons/fa6'

const ConfirmRide = ({setConfirmRidePanel,selectedVehicle,setIsLookingForDriverPanelOpen}) => {
  return (
    <div className='p-5'>
        {<FaChevronDown className='absolute right-6 top-6' onClick={()=>setConfirmRidePanel(false)}/>}
        <h1 className='text-xl font-medium'>Confirm Your Ride</h1>
        <img src={car} className='w-50 mx-auto'/>
        <div>
            <h4 className='font-medium text-lg text-gray-500'>Destination</h4>
            <p className='text-sm font-semibold'>6 B.N P.A.C R.R.F Rorkee road meerut</p>
        </div>
        <div className='mt-3'>
            <h4 className='font-medium text-lg text-gray-500'>Price</h4>
            <p className='text-sm font-semibold'>{'\u20B9'} 50.45</p>
        </div>

        <button
         className='mx-auto bg-green-500 flex p-3 w-full justify-center mt-4 rounded text-lg font-semibold text-white'
         onClick={()=>{
          setIsLookingForDriverPanelOpen(true);
          setConfirmRidePanel(false)
         }}
         >Confirm Ride</button>

    </div>
  )
}

export default ConfirmRide