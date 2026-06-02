import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  return (
    <div className='w-full h-screen p-5 flex flex-col justify-between'>
        <div>
            <img src='https://imgs.search.brave.com/rSuSSYacx1C8jOOc6iUc_xal-ahK3vL90Pl-NKUkJSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw' className='md:w-25 w-20'/>

            <form className='mt-5 flex flex-col items-center justify-center gap-5'>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>What's your email</p>
                    <input required type='email' placeholder='John@xyz.com' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none'/>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold'>Enter Password</p>
                    <input required type='text' placeholder='......' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none'/>
                </div>
                <button type='submit' className='text-2xl bg-black w-full p-2 rounded text-white font-semibold'> Submit </button>

                <p className='text-lg text-center'>Don't have an account? <Link to='/signup' className='text-blue-500 font-semibold'>SignUp</Link></p>
            </form>

        </div>
            <div className='mt-2'>
                <Link to='/captain-login' className=' flex items-center justify-center text-2xl bg-[#eec36f] w-full p-2 rounded text-black font-semibold tracking-tight'>Signin as Captain</Link>
            </div>
    </div>
  )
}

export default UserLogin