import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react'
import { __AUTH } from '../backend/firebase_config';
import toast from 'react-hot-toast';

//! Step-1: Create context for the uset
export let AuthUserContext=createContext(null);

const AuthContextApi = ({children}) => {
    let [authUser,setAuthUser]=useState(null || {});


    useEffect(()=>{
        onAuthStateChanged(__AUTH,(userInfo)=>{
            if(userInfo?.emailVerified===true){
                window.localStorage.setItem("UserToken",userInfo?.accessToken);
                setAuthUser(userInfo);
            }
            else{
                setAuthUser(null);
                window.localStorage.removeItem("Usertoken");
            }
        });
    },[]);

    //! Logout functionality

    let logout= async ()=>{
        try {
           await signOut(__AUTH);
           window.localStorage.removeItem("UserToken");
           toast.success("Logged Out successfully");
           setTimeout(()=>{
            window.location.assign("/");
           },1000)
        } catch (error) {
            toast.error(error.code.slice(5));
        }
    }
  return <AuthUserContext.Provider value={{authUser,logout}}>
    {children}
  </AuthUserContext.Provider>
}

export default AuthContextApi;