import React from 'react'
import car from '../assets/images/uber_car.png'
import moto from '../assets/images/uber_moto.png'
import auto from '../assets/images/uber_auto.png'
import { FaChevronDown, FaUser } from "react-icons/fa6";


const RideSelection = (props) => {

  return (
    <div>
        <div className='rounded-t-3xl border-t-2 w-full bg-white pt-5 pb-1 px-2 flex flex-col gap-10'>
            {<FaChevronDown className='absolute right-6 top-6' onClick={()=>props.setRidePanelOpen(false)}/>} 
            <h1 className='text-2xl font-semibold'>Select a ride</h1>
            <div className='w-full flex items-start justify-between py-2 pr-3 border-2 border-white active:border-black rounded transition duration-200' onClick={()=>{props.setConfirmRidePanel(true),
            props.setSelectedVehicle("car")
            }}>
                <div className='flex'>
                    <img src={car} className='w-25'/>
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-xl font-semibold'>UberGo</h1>
                        <p className='flex items-center text-sm'><FaUser /> <span>4</span></p>
                    </div>
                    <p className='text-sm font-medium text-[#8b8787]' >Affordable, compact rides</p>
                </div>
                </div>
                <h1 className='font-bold text-xl tracking-tighter'>{'\u20B9'} 192.68</h1>
            </div>
            <div className='w-full flex items-start justify-between py-2 pr-3 border-2 border-white active:border-black rounded transition duration-200' onClick={()=>{props.setConfirmRidePanel(true),
            props.setSelectedVehicle("moto")
            }}>
                <div className='flex'>
                    <img src={moto} className='w-25'/>
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-xl font-semibold'>Moto</h1>
                        <p className='flex items-center text-sm'><FaUser /> <span>1</span></p>
                    </div>
                    <p className='text-sm font-medium text-[#8b8787]' >Affordable, motorcycle rides</p>
                </div>
                </div>
                <h1 className='font-bold text-xl tracking-tighter'>{'\u20B9'} 65.17</h1>
            </div>
            <div className='w-full flex items-start justify-between py-2 pr-3 border-2 border-white active:border-black rounded transition duration-200' onClick={()=>{props.setConfirmRidePanel(true),
            props.setSelectedVehicle("auto")
            }}>
                <div className='flex'>
                    <img src={auto} className='w-25 -my-5'/>
                <div className='flex flex-col'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-xl font-semibold'>Auto</h1>
                        <p className='flex items-center text-sm'><FaUser /> <span>3</span></p>
                    </div>
                    <p className='text-sm font-medium text-[#8b8787]' >Affordable, auto rides</p>
                </div>
                </div>
                <h1 className='font-bold text-xl tracking-tighter'>{'\u20B9'} 50.24</h1>
            </div>
        </div>
    </div>
  )
}

export default RideSelection