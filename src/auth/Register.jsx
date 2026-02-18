import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { __AUTH} from "../backend/firebase_config.js"
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helper/Spinner.jsx";

const Register = () => {
let navigate = useNavigate();
  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [showPassword1, setShowPassword1] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  //! Destructuring of user data
  let { username, email, password, confirmPassword } = userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(password===confirmPassword){

        let registeredUser = await createUserWithEmailAndPassword(__AUTH , email , password);
        console.log(registeredUser);

        //! Send email verification

        sendEmailVerification(registeredUser.user);

        //! Update profile name and photo url which
        //! is not updated by default
        updateProfile(registeredUser.user,{
          displayName:username,
          photoURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAACUCAMAAADIzWmnAAAAMFBMVEXk5ueutLe6wMLp6+uqsLTGyszf4uOmrbDT1ti+w8Wxt7ra3d7O0tTLz9HBxcjX2ttGWgdcAAADx0lEQVR4nO2cXXekIAxAB8KXIPr//+1ia/esM44TEg32LPel5/TpNkAIEPt4dDqdTqfT6XQ6nU6n07kjrrXAW+CRQrbToLUe7BhS+cXNgDTFqIxRC8uPqK2DG2mCy8qrZ4yPo7uJJTirzIvht2bM9xjyvO+3WqrQ2q/Mw/g6ylvLIbUNJRwGcSXOTSWnNxPxKZS5oaJGKRZJ2yqSgFVsKKmxhovk1MIQhgpFpfwoH0kY0QO9Mos7pkrDkoLE6yH8evnBaNnRBlutWCSDqKQjKAqPNkwURdn9ZiYpFgQdcdv0XiDlZiRRUTCQpEW9BlJqt4FIDqOS2rbJK0aJpR+wDEcjdLypK3ieHK2IomNMx4LIokn0zFPwIo7hw2H1GJMkHOnZ8ctRIkNWnhFekDh9cTL4wiThyFNUEtU4sKbjL3G8XvH/cPwF63qQcKw/WW+QyD3kw8yKyJEm8/ZCkWufmVVTeJFCvP42ahNHkdrM1dyNviB0MUW7SFnDKHOdAiMnjiIlbhlshqIWujoDxoSUel+AQM+QQkNdIG/ZUe7erPpNYcULvi1QrwEkascfqLd7om/ZtCJykFR8wEx5+5B+RKqvIiUvw1dirWSDl1dXWUbKPxcWQpWi+GT8piqTy78MfwEZPdymXWsKerhbtvjM77q4NkGMctXOHu7zjYCR3V52gHwcShNlX9b3JdN0tHTsTdoL05vDg1HTffpewVn9PORG6XyTGK7AI42D8n5pczXG+zjcsSO3eAK4EMYxzLfqxN0AG1rbPLEYuTlka4ev1uthsnkMyd3CdHFLIQ/RLDPx30VjlklZlo0NKbl2E3OZfVb/bQp/gzdRT2NqE9Fkseeu5W+Ig3BxBm620VeeFbwZRrHaoiTsiCl3dgJasqbIoIfqw9aWfPH2CC5/aln/HEw1XViUA1hmDH8s9UUbOTzycZapwetLlg93Hm4xyp6d2YH34LHL2QU69VL0EH/iFyGAOFgROS2UgZaxMZz0iQCjIxMjeUoaGq5ULPAvCNypGWcXz5yUAorcFrQkociTdOdtfsfQP65hNoxWQX25OX/7O4B0lICrk84ThNK3/lsoJoS3RE6jOon6rmxuVxlFsnLDuXaTfkOsc+T1gFOpG21OCw+DmrXdJoylmsRvNyCzTb/i8WGsfVI9D3T7D6fHiAn6AVmylnhmRDqyet6YYN/tmB9NsMA+xTdULIcblGJqtqoXUO3jTbbqf0A5tss8C6gJyf0egQtmQnI6Wc8A001F6SQ7EdR/20i6LajmbGgMxrHT6fxy/gCEmi+q7hhtOwAAAABJRU5ErkJggg=="
        })

        toast.success(`Email Verification has been sent to your registered ${email}`);
        toast.success("User has been registered successfully");
        navigate("/auth/login")
      }  
      else {
        toast.error ("password doesn't match")
        setUserData({
          password:"",
          confirmPassword:""
});
}  
    } catch (error) {
      toast.error(error.code.slice(5))
    }   
  };

  let togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  let togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <section className="text-white w-[100vw] min-h-[90vh] flex justify-center items-center">
      <article className="w-[30%] bg-[#222222] p-5 rounded-xl">
        <header className="text-center text-3xl font-bold py-3">
          <h1>Register</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-1 p-3">
            <label htmlFor="username" className="font-semibold text-lg mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mb-1 p-3">
            <label htmlFor="email" className="font-semibold text-lg mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mb-1 p-3 relative">
            <label htmlFor="password" className="font-semibold text-lg mb-1">
              Password
            </label>
            <input
              type={showPassword1 ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <span
              onClick={togglePassword1}
              className="absolute bottom-[25px] right-[20px] cursor-pointer text-lg"
            >
              {showPassword1 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className="flex flex-col mb-1 p-3 relative">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-lg mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <span
              onClick={togglePassword2}
              className="absolute bottom-[25px] right-[20px] cursor-pointer text-lg"
            >
              {showPassword2 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
          <div className="flex flex-col mb-1 p-3">
            <button className="bg-blue-600 py-2 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-700">
              Register
            </button>
          </div>
          <div className="flex items-center justify-center">
            <NavLink to={"/auth/Login"} className="hover:text-yellow-600 hover:underline">Already have an account !!!!</NavLink>
          </div>
        </form>
      </article>
      {isLoading && (<section className='w-[100%] h-[100vh] bg-black/50 fixed top-0'>
        <Spinner/>
      </section>)}
    </section>
  );
};

export default Register;