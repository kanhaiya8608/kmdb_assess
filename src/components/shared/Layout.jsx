import React from 'react'
import Navbar from '../Navbar'
import {Outlet} from 'react-router-dom'
import Footer from '../Footer'
import { PacmanLoader } from 'react-spinners';
function Layout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen'>
    <div className='w-screen overflow-x-auto'>
    <div><Navbar/></div>    
    <div><Outlet/></div>
    <div><Footer/></div>
    </div>

    </div>
  )
}

export default Layout