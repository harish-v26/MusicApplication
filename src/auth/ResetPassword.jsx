import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { __AUTH } from '../backend/firebase_config';
import Spinner from '../helper/Spinner';

const ResetPassword = () => {
    let navigate = useNavigate();
    let [email, setEmail]=useState("");
    let [isLoading, setIsLoading]=useState(false);

    let handleinputchange = (e) =>{
        let value = e.target.value;
        setEmail(value);
    }

    let handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        try {
            //! Reset Password functionality provided by the firebase
           await sendPasswordResetEmail(__AUTH,email);
           toast.success(`Reset Password mail has been sent to registered ${email}`);
           navigate("/auth/login");
        } catch (error) {
            toast.error(error.code.slice(5));
        } setIsLoading(false);
        
    };
  return (
    <section className='text-white w-[100vw] flex justify-center items-center h-[100vh]'>
      <article className='w-[30%] bg-black py-10 px-10 rounded-xl '>
        <header className='text-center text-2xl font-bold py-3'>
          <h1>Reset Password</h1>
        </header>
        <form onSubmit={handleSubmit} >
          <div className='flex flex-col mb-1 p-3 relative'>
            <label htmlFor="email" className='font-semibold text-lg mb-1'>Email</label>
            <input 
              type="email"  
              id="email" 
              placeholder='Enter your Email' 
              className='outline-none border p-2 rounded-4xl' 
              name='email'
              onChange={handleinputchange}
              value={email}
            />
            <span className='absolute bottom-[25px] right-[20px] text-lg cursor-pointer'>
              <FaUser />
            </span>
          </div>
          <div className='flex flex-col mb-1 p-3'>
            <button className=' w-full bg-blue-600 py-2 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-700'>
                Reset Password
            </button>
          </div>
          <div className='flex justify-center items-center'>
            <NavLink 
              to={"/auth/login"} 
              className={"hover:text-blue-800 hover:underline"}>
              Cancel
            </NavLink>
          </div>
        </form>
      </article>
      {isLoading && (<section className='w-[100%] h-[100vh] bg-black/50 fixed top-0'>
        <Spinner/>
      </section>)}
    </section>
  )
}

export default ResetPassword;