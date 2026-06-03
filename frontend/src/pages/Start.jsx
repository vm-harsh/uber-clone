import React from 'react'
import uberWhiteLogo from '../assets/images/uber-white.png'
import screen from '../assets/images/screen.jpg'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className='w-full h-screen max-w-200 mx-auto'>
      <div className='w-full h-[80%]'>
        <h1 className='text-white absolute text-5xl z-10 font-semibold font-sans p-5'>UBER</h1>
        <img className='w-full h-full brightness-60' src={screen} />
      </div>
      <div className='w-full max-w-200'>
        <h1 className='text-3xl font-bold p-5 font-sans tracking-tighter'>Get Started With Uber</h1>
        <div className='w-full fixed bottom-1 [@media(min-height:700px)]:bottom-5 max-w-200'>
          <Link to='/login' className='relative bg-black h-15 w-[90%] mx-auto text-white text-2xl rounded-xl flex items-center justify-center' >
            <span>Continue</span>
            <FaArrowRight className='absolute right-5'/>
          </Link>
        </div>
      </div>  

    </div>
  )
}

export default Start