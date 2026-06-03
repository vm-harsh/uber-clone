import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../context/UserProvider';


const UserLogin = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(userContext)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const handleInput = (e) => {
        const {value, name} = e.target
        setErr("");
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(loading) return;
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/auth/login`,formData,{withCredentials:true});
            if(response.status === 200)
            {
                setUser(response.data);
                navigate('/home')
            }
        } catch (error) {
            setErr(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='w-full h-screen p-5 flex flex-col justify-between'>
        <div>
            <img src='https://imgs.search.brave.com/rSuSSYacx1C8jOOc6iUc_xal-ahK3vL90Pl-NKUkJSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw' className='md:w-25 w-20'/>

            <form className='mt-5 flex flex-col items-center justify-center gap-5' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>What's your email</p>
                    <input name='email' value={formData.email} required type='email' placeholder='John@xyz.com' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold'>Enter Password</p>
                    <input name='password' value={formData.password} required type='password' placeholder='......' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <button disabled={loading} type='submit' className='text-2xl bg-black w-full p-2 rounded text-white font-semibold'> {loading ? "Logging in...": "Login"} </button>

                {err && <p className='text-lg text-center text-red-500'>{err}</p>}
                <p className='text-lg text-center'>Don't have an account? <Link to='/signup' className='text-blue-500 font-semibold'>Create Account</Link></p>
            </form>

        </div>
            <div className='mt-2'>
                <Link to='/captain-login' className=' flex items-center justify-center text-2xl bg-[#f1e536] w-full p-2 rounded text-black font-semibold tracking-tight'>Signin as Captain</Link>
            </div>
    </div>
  )
}

export default UserLogin