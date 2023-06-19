import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, user } from '../assets';
import { navlinks } from '../constants';
import "./index.css"
import { ConnectWallet } from '@thirdweb-dev/react';

//isActive: a string that keeps track of the currently active navigation link.
//toggleDrawer: a boolean value that toggles the visibility of the navigation menu on small screens.
//uses the useStateContext hook from the application context to get the current wallet address and the connect function to connect to a wallet.

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[358px] py-2 pl-4 pr-2 h-[52px] bg-[#420468] rounded-[100px]">
        <input type="text" placeholder="Search for shipments" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#989ea6] text-white bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-[#1dc071] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

        {/* LOGO & NAME */}
      <div className='flex'>
        <img src={logo} className="h-10 ml-3 mt-1"></img>
        <div className='ml-3 mt-3'>
          <p className='font-link text-xl text-[#ffffff]'> M I R A G E</p>
        </div>
      </div>


      <ConnectWallet
        accentColor='#420468'
      />

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#420468] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="logo" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-gradient-to-b from-gray-900 to-slate-700 z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#4acd8d]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#ffffff]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? 'Create Shipment' : 'Connect'}
              styles={address ? 'bg-[#420468]' : 'bg-[#1dc071]'}
              handleClick={() => {
                if (address) navigate('create-shipment')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar