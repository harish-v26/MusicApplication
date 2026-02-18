import React from 'react'
import { Outlet } from 'react-router-dom';

const ProfileContent = () => {
  return (
    <div className='bg-gray-500 basis-[83%]'>
      <Outlet/>

    </div>
  )
}

export default ProfileContent;