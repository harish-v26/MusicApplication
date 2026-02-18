import React from 'react'
import ProfileSidebar from './Profilesidebar';
import ProfileContent from './ProfileContent';

const ProfileContainer = () => {
  return (
    <section className='flex w-[100%]'>
      <ProfileSidebar/>
      <ProfileContent/>
    </section>
  )
}

export default ProfileContainer;