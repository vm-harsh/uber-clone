import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserProvider'
import axios from 'axios'
import { statusContext } from '../context/StatusProvider'

const UserSignup = () => {
    const navigate = useNavigate();
    const {userLoading,setUserLoading, setUser} = useContext(userContext);
    const {err, setErr} = useContext(statusContext);

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
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
        if(userLoading) return;
        try {
            setUserLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/auth/register`,formData, {withCredentials:true});
            if(response.status === 201)
            {
                setUser(response.data);
                navigate('/home')
            }
        } catch (error) {
            setErr(error.response?.data?.message);
        } finally{
            setUserLoading(false);
        }
    }

  return (
    <div className='w-full h-screen p-5 flex flex-col justify-between'>
        <div>
            <img src='https://imgs.search.brave.com/rSuSSYacx1C8jOOc6iUc_xal-ahK3vL90Pl-NKUkJSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw' className='md:w-25 w-20'/>

            <form className='mt-5 flex flex-col items-center justify-center gap-5' onSubmit={handleSubmit}>
                <div className='flex gap-3'>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>FirstName</p>
                    <input name='firstName' value={formData.firstName} required type='text' placeholder='John' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                  </div>
                  <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>LastName</p>
                    <input name='lastName' value={formData.lastName} required type='text' placeholder='Doe' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold '>Enter your email</p>
                    <input name='email' value={formData.email} required type='email' placeholder='John@xyz.com' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-1'>
                    <p className='text-xl font-semibold'>Enter Password</p>
                    <input name='password' value={formData.password} required type='password' placeholder='......' className='bg-[#ededed] w-full text-2xl px-3 rounded py-2 outline-none' onChange={handleInput}/>
                </div>
                <button disabled={userLoading} type='submit' className='text-2xl bg-black w-full p-2 rounded text-white font-semibold'> {userLoading ? "Creating Account ..." : "Create Account"} </button>

                {err && <p className='text-lg text-center text-red-500'>{err}</p>}
                <p className='text-lg text-center'>Already have an account? <Link to='/login' className='text-blue-500 font-semibold'>login here</Link></p>
            </form>

        </div>
            <div className='mt-2'>
                <Link to='/captain-signUp' className=' flex items-center justify-center text-2xl bg-[#f1e536] w-full p-2 rounded text-black font-semibold tracking-tight'>SignUp as Captain</Link>
            </div>
    </div>
  )
}

export default UserSignup