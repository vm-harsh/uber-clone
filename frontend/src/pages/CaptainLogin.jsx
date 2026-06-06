import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { captainContext } from '../context/CaptainProvider';
import { statusContext } from '../context/StatusProvider';

const CaptainLogin = () => {

    const navigate = useNavigate();
    const {captainLoading,setCaptainLoading,setCaptain} = useContext(captainContext);
    const {err, setErr} = useContext(statusContext);

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const handleInput = (e) => {
        setErr("");
        const {value, name} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(captainLoading) return;
        try {
            setCaptainLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/auth/login`, formData, {withCredentials:true});

            if(response.status === 200){
                setCaptain(response.data.captain);
                navigate('/captain-home');
            }
        } catch (error) {
            setErr(error.response?.data?.message)
        } finally {
            setCaptainLoading(false);
        }
    }

  return (
    <div className='w-full h-screen p-5 flex flex-col justify-between'>
        <div>
            <img src='https://imgs.search.brave.com/pTgj08asbbPZa7mluuj8W9DLU05lUE-Sbclbtqqwxdw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI5LzIvdWJlci1s/b2dvLXBuZ19zZWVr/bG9nby0yOTk2MzAu/cG5n' className='md:w-25 w-20 rounded-3xl'/>

            <form className='mt-5 flex flex-col items-center justify-center gap-5' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>What's your email</p>
                    <input name='email' value={formData.email} required type='text' placeholder='John@xyz.com' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold'>Enter Password</p>
                    <input name='password' value={formData.password} required type='text' placeholder='......' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <button disabled={captainLoading} type='submit' className='text-2xl bg-black w-full p-2 rounded text-white font-semibold'> Submit </button>
                {err && <p className='text-lg text-center text-red-500'>{err}</p>}
                <p className='text-lg text-center'>Don't have an account? <Link to='/captain-signup' className='text-blue-500 font-semibold'>Create Account</Link></p>
            </form>

        </div>
            <div className='mt-2'>
                <Link to='/login' className=' flex items-center justify-center text-2xl bg-[#28df4f] w-full p-2 rounded text-white font-semibold tracking-tight'>Signin as User</Link>
            </div>
    </div>
  )
}

export default CaptainLogin