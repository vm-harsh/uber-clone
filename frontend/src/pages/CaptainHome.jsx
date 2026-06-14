import React from 'react'
import map from '../assets/images/map.png';
import user from '../assets/images/user.png'
import { FaChevronDown } from 'react-icons/fa6';
import { CiClock2 } from "react-icons/ci";
import { TbBrandSpeedtest } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";




const CaptainHome = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-end">
          <img
            src={map}
            alt="Map"
            className="h-[80%] absolute top-0"
            onClick={() => {
              setIsLocationPanelOpen(false);
            }}
          />

          <h1 className="text-black absolute top-3 left-3 text-4xl z-10 font-semibold tracking-tighter">
            UBER
          </h1>

          <div className="relative rounded-t-3xl border-t-2 w-full bg-white p-5 flex flex-col gap-5 [@media(min-height:700px)]:gap-5 [@media(min-height:700px)]:h-[25%]">
            <div className='flex w-full justify-between items-center'>
              <div className='flex items-center gap-2'>
                  <img className='h-20 w-20 rounded-full object-cover' src={user} alt="uber_car" />
                  <div className='flex flex-col items-start'>
                      <h1 className='text-lg font-semibold'>Harsh Verma</h1>
                      <h4 className='text-sm font-semibold text-gray-400'>Basic Level</h4>
                  </div>
              </div>
              <div className='flex flex-col items-end'>
                <h1 className='text-xl font-semibold'>$132.00</h1>
                <h4 className='text-sm font-semibold text-gray-400'>Earned</h4>
              </div>
            </div>

            <div className='w-full bg-amber-300 rounded-2xl mx-auto flex gap-2 itmes-center justify-evenly py-4'>
              <div className='flex flex-col gap-1 items-center'>
                <CiClock2 className='text-2xl text-gray-400'/>
                <h4 className='font-semibold text-lg'>10.2</h4>
                <h4 className='font-light text-[10px] text-gray-400'>HOURS ONLINE</h4>
              </div>

              <div className='flex flex-col gap-1 items-center'>
                <TbBrandSpeedtest className='text-2xl text-gray-400'/>
                <h4 className='font-semibold text-lg'>30 KM</h4>
                <h4 className='font-light text-[10px] text-gray-400'>TOTAL DISTANCE</h4>
              </div>

              <div className='flex flex-col gap-1 items-center'>
                <SlNotebook className='text-2xl text-gray-400'/>
                <h4 className='font-semibold text-lg'>20</h4>
                <h4 className='font-light text-[10px] text-gray-400'>TOTAL JOBS</h4>
              </div>
            </div>

          </div>


    </div>
  )
}

export default CaptainHome