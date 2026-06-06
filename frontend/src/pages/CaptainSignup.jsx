import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { statusContext } from '../context/StatusProvider';
import axios from 'axios';
import { captainContext } from '../context/CaptainProvider';

const CaptainSignup = () => {

  const {captainLoading,setCaptainLoading, setCaptain} = useContext(captainContext);
  const {err, setErr} = useContext(statusContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    color:"",
    plate:"",
    capacity:"1",
    vehicleType:"car"
  })

  const handleInput = (e) => {
        const {value, name} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCaptainLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/auth/register`, {
        firstName:formData.firstName,
        ...(formData.lastName && { lastName: formData.lastName}),
        email: formData.email,
        password: formData.password,
        vehicle:{
          color:formData.color,
          plate: formData.plate,
          capacity: formData.capacity,
          vehicleType: formData.vehicleType
        }
      }, {withCredentials:true});

     if(response.status === 201){
      setCaptain(response.data)
      navigate('/captain-home')
     }

    } catch (error) {
      setErr(error.response?.data?.message);
    } finally{
      setCaptainLoading(false)
    }
  }

  return (
    <div className='w-full h-screen p-5 flex flex-col justify-between'>
        <div>
            <img src='https://imgs.search.brave.com/pTgj08asbbPZa7mluuj8W9DLU05lUE-Sbclbtqqwxdw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI5LzIvdWJlci1s/b2dvLXBuZ19zZWVr/bG9nby0yOTk2MzAu/cG5n' className='md:w-25 w-20 rounded-3xl'/>

            <form className='mt-5 flex flex-col items-center justify-center gap-5' onSubmit={handleSubmit}>
                <div className='flex gap-3'>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>FirstName</p>
                    <input name='firstName' value={formData.firstName} required type='text' placeholder='John' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                  </div>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>LastName</p>
                    <input name='lastName' value={formData.lastName} type='text' placeholder='Doe' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>Enter your email</p>
                    <input name='email' value={formData.email} required type='email' placeholder='John@xyz.com' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold'>Enter Password</p>
                    <input name='password' value={formData.password} required type='text' placeholder='......' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>VehicleColor</p>
                    <input name='color' value={formData.color} required type='text' placeholder='Red' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                  </div>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>Plate Number</p>
                    <input name='plate' value={formData.plate} required type='text' placeholder='UP 15 XXXX' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                  </div>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>Capacity</p>
                    <input name='capacity' value={formData.capacity} required type='number' placeholder='1' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                  </div>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>Vehicle Type</p>
                    <select name='vehicleType' value={formData.vehicleType} className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}>
                      <option>car</option>
                      <option>bike</option>
                      <option>auto</option>
                    </select>
                  </div>
                </div>

                <button disabled={captainLoading} type='submit' className='text-2xl bg-black w-full p-2 rounded text-white font-semibold'> Create Account </button>
                
                {err && <p className='text-lg text-center text-red-500'>{err}</p>}
                <p className='text-lg text-center'>Already have an account? <Link to='/captain-login' className='text-blue-500 font-semibold'>login here</Link></p>
            </form>

        </div>
            <div className='mt-2'>
                <Link to='/signUp' className=' flex items-center justify-center text-2xl bg-[#28df4f] w-full p-2 rounded text-white font-semibold tracking-tight'>SignUp as User</Link>
            </div>
    </div>
  )
}

export default CaptainSignup