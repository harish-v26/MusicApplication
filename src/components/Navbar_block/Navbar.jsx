import React from 'react';
import Logo from './logo';
import Menu from './menu';

const Navbar = () => {
  return (
    <header className='w-[100vw] h-[70px] bg-black flex justify-between items-center text-[#D4AF37]'>
      <Logo/>
      <Menu/>
    </header> 
  );
};

export default Navbar;