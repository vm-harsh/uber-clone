import React, { useContext, useRef, useState } from 'react'
import map from '../assets/images/map.png'
import LocationSearchPanel from '../components/LocationSearchPanel';
import RideSelection from '../components/RideSelection';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaChevronDown } from "react-icons/fa6";


const Home = () => {

  const [open, setOpen] = useState(false);
  const [ridePanelOpen, setRidePanelOpen] = useState(false);
  const locationPanelRef = useRef(null);
  const ridePanelRef = useRef(null);
  const [formData, setFormData] = useState({
    "source":"",
    "destination":""
  });

  const handleClick = () => {
    setOpen(true);
  }

  const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
      ...prev, 
      [name] : value
    }))
  }

  const isTallHeight = window.innerHeight;

  useGSAP(()=>{
    gsap.to(locationPanelRef.current, {
      height: ridePanelOpen ? "0%" : open ? "75%" : "0%",
      duration: 0.3
    }),

    gsap.to(ridePanelRef.current, {
      transform: ridePanelOpen ? "translateY(0%)" : "translateY(100%)",
      duration: 0.3  
    })
  },{dependencies: [open,ridePanelOpen]})

  

  return (
    <div className='w-full h-screen flex flex-col items-center justify-end'>
      <img src={map} className='h-[80%] absolute top-0' onClick={()=>setOpen(false)}/>
      <h1 className='text-black absolute top-3 left-3 text-4xl z-10 font-semibold font-sans tracking-tighter'>UBER</h1>
      <div className={`w-full h-screen flex flex-col justify-end items-center z-10 overflow-hidden `}>
        <div className=' relative rounded-t-3xl border-t-2 h-[30%] w-full bg-white p-5 flex flex-col gap-2 [@media(min-height:700px)]:gap-5 [@media(min-height:700px)]:h-[25%]'>
         {open && <FaChevronDown className='absolute right-6 top-6' onClick={()=> setOpen(false)}/>} 
        <h1 className='text-xl font-semibold'>Find a trip</h1>
        <p className='absolute h-12 w-0.5 bg-black top-20 left-10 [@media(min-height:700px)]:h-21'></p>
        <form className='w-full flex flex-col gap-2  [@media(min-height:700px)]:gap-5'>
          <input 
            name='source'
            value={formData.source} 
            type='text' 
            className='w-[98%] mx-auto border bg-[#ededed] text-lg rounded-xl py-2 px-10'
            placeholder='Add a pick-up location'
            onClick={handleClick}
            onChange={handleChange}
          />
          <input 
            name='destination' 
            value={formData.destination} 
            type='text' 
            className='w-[98%] mx-auto border bg-[#ededed] text-lg rounded-xl p-2 px-10' 
            placeholder='Enter your destination' 
            onClick={handleClick} 
            onChange={handleChange}
          />
        </form>
        </div>
        <div className='w-full h-0 bg-white px-5' ref={locationPanelRef} >
          <LocationSearchPanel setRidePanelOpen={setRidePanelOpen}/>
        </div>
      </div>
      <div className='fixed bottom-0 w-full bg-white z-20 rounded-3xl' ref={ridePanelRef}>
        <RideSelection setRidePanelOpen={setRidePanelOpen}/>
      </div>
    </div>
  )
}

export default Home