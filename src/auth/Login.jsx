import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from 'react-icons/io5';
import { __AUTH } from '../backend/firebase_config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Spinner from '../helper/Spinner.jsx';

const Login = () => {
  let Navigate = useNavigate();
  let[userdata, setUserdata] = useState({
    email: "",
    password:"",
  });

  let [showpassword1, setShowPassword1] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let { email, password } = userdata;

  let handleinputchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserdata({...userdata, [name]: value});
  };

  let handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{

       let loginUser = await signInWithEmailAndPassword(__AUTH, email, password);
       console.log(loginUser);
       if(loginUser.user.emailVerified===true){
        toast.success('Logged in successfully');
        Navigate('/');
       }
       else{
        toast.error("Email is not yet verified");
       }
    }
    catch(error){
      toast.error(error.code.slice(5))

    }
    setIsLoading(false);
  };

  let togglePassword1 = () => {
    setShowPassword1(!showpassword1);
  };
 
  return (
    <section className='text-white w-[100vw] flex justify-center items-center h-[100vh]'>
      <article className='w-[30%] bg-black py-10 px-10 rounded-xl '>
        <header className='text-center text-2xl font-bold py-3'>
          <h1>Login</h1>
        </header>
        <form onSubmit={handlesubmit}>
          <div className='flex flex-col mb-1 p-3 relative'>
            <label htmlFor="email" className='font-semibold text-lg mb-1'>Email</label>
            <input type="email"  id="email" placeholder='Enter your Email' className='outline-none border p-2 rounded-4xl' 
            name='email'
            value={email}
            onChange={handleinputchange}/>
            <span className='absolute bottom-[25px] right-[20px] text-lg cursor-pointer'>
              <FaUser />
            </span>
          </div>
          <div className='flex flex-col mb-1 p-3 relative'>
            <label htmlFor="password" className='font-semibold text-lg mb-1'>Password</label>
            <input type={showpassword1  ? "text" : "password"}  id="password" placeholder='Enter your Password' className='outline-none border p-2 rounded-4xl'
            name='password'
            value={password}
            onChange={handleinputchange} />
            <span onClick={togglePassword1} className='absolute bottom-[25px] right-[20px] text-lg cursor-pointer'>
              {showpassword1 ? <IoEye /> : <IoIosEyeOff />}
            </span>
          </div>
          <div className='flex justify-center'>
            <button className=' w-full bg-blue-600 py-2 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-700'>
              Login
            </button>
          </div>
          <div className='flex justify-center items-center mb-2'>
          <NavLink 
            to={"/auth/register"} 
            className={"hover:text-blue-800 hover:underline"}>
              Don't have an account?
          </NavLink>
        </div>
        <div className='flex justify-center items-center'>
          <NavLink 
            to={"/auth/reset-password"} 
            className={"hover:text-blue-800 hover:underline"}>
              Forgot Password
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

export default Login;