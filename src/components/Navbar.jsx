import React, { useState } from 'react';
import { RxCross2, RxTextAlignJustify } from 'react-icons/rx';
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from '@headlessui/react';
import img2 from '../assets/logo.png'
import Switcher from './Switcher';
const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  let Links = [
    isAuthenticated && { name: 'Favorites', link: '/favorites' },
    isAuthenticated && { name: 'Watchlist', link: '/watchlist' },
    isAuthenticated && { name: 'Profile', link: '/profile' },
  ].filter(Boolean);

  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className='shadow-md w-full top-0 left-0 '>
      <div className='md:grid grid-flow-col justify-between align-items-center bg-white dark:bg-amber-400 py-4 md:px-5 px-5'>
        <div className='font-bold text-2xl cursor-pointer flex items-center justify-between font-[Poppins] text-gray-800'>
          <Link id='logo' to='/'><img src={img2} alt="" className='h-12'/></Link>

          <div
            onClick={toggleMenu}
            className='cursor-pointer md:hidden text-xl'
          >
            {open ? <RxCross2 size={25} /> : <RxTextAlignJustify size={25} />}
          </div>
        </div>
  
        <ul
          className={` md:flex md:items-center md:pb-0 absolute md:static md:z-auto z-50 left-0 w-full md:w-auto md:pl-0 pl-9 ${
            open ? 'bg-white dark:bg-amber-400 top-18 shadow-md' : 'top-[-490px]' 
          }`}
        >
          {Links.map((link, index) => (
            <li key={index} className={`md:ml-8 font-semibold md:my-0 my-7 ${index < Links.length - 1 ? 'md:mr-20' : ''}`}>
              <Link
                to={link.link}
                className='flex font-semibold md:pl-6 items-center dark:text-white dark:hover:text-gray-700 text-gray-800 hover:text-gray-400 duration-500'
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {isAuthenticated && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-full px-4 py-2 font-semibold">
                  <img className='rounded-full border border-1 border-black w-8 h-8 md:block hidden' src={user.picture} alt="Profile" />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white  dark:bg-black border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col items-center">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100 text-gray-900 dark:text-red ' : 'text-gray-700 dark:text-white '
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        disabled 
                      >
                        {user.name}
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={ `${
                          active ? 'bg-gray-100 text-gray-900 dark:text-white dark:bg-yellow-300 ' : 'dark:bg-yellow-400 text-gray-700 dark:text-white '
                        } group flex rounded-md items-center w-full px-6 py-2 text-sm`}
                        onClick={() => logout({ returnTo: window.location.origin })}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          )}
          {!isAuthenticated && (
            <li>
              <button onClick={loginWithRedirect} className="flex font-semibold md:pl-6 items-center dark:text-white dark:hover:text-gray-700 text-gray-800 hover:text-gray-400 duration-500 my-8 md:my-3">Login</button>
            </li>
          )}
          <li className=' md:ml-2'>
             <Switcher />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
