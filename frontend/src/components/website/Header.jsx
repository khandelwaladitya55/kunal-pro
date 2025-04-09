"use client";
import { useState } from 'react';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

export default function Header() {
  const [open,setMenuOpen] = useState(false);
  const menuitems = [
    {
      name:"Home",
      path:"/"
    },
    {
      name:"STORE",
      path:"/store"
    }
  ]
// const [menuBar,setMenuBar]= useState(false);
  return (

<>
<div className="header shadow pb-4 w-full">
  <div className="max-w-[1300px] py-2 px-5 mx-auto">
    <div className='flex items-center justify-between  md:justify-end gap-5 font-bold text-[#262626]'>
    <div className='flex  gap-2 cursor-pointer items-center justify-between'>

    <div className='flex items-center justify-end gap-2 cursor-pointer'>
   <CgProfile className='font-bold' />
   My profile
   </div> 
   <div className='flex items-center gap-2 cursor-pointer'>
   <FaBagShopping />
   2 items
   </div>
   
   <IoIosSearch className='cursor-pointer' />
    </div>
    <div >
      {
        open ?  <RxCross2  onClick={()=>
        {
          setMenuOpen(!open);
        }
        } className='inline-block md:hidden'/>: <CiMenuFries onClick={()=>
        {
        setMenuOpen(!open);
        }
        } className='cursor-pointer inline-block md:hidden'/>
      }
     
    
    </div>
    </div>
  </div>
  <h1 className='text-center font-bold text-3xl text-[#FF4252] mt-4 mb-3'>Advik Enterprises</h1>
  <h1 className='text-center font-bold text-xl text-balck mt-4 mb-3'>Customize Photo Frame</h1>
<div className="menuItems  max-w-[600px]  mx-auto flex justify-center items-center">
  <ul className='flex gap-5 fs'>
 {
  menuitems.map((d,i)=>
  {
    return (
      <li className='uppercase' key={i}>
      <Link className='uppercase hidden md:block'  href={d.path}>{d.name}</Link>
    </li>
    )
  })
 }
  </ul>
  {/*  Responsive */}
  <div className={`fixed z-[9999999] md:hidden backdrop-blur-[23px] w-full flex -webkit-backdrop-filter
 justify-center items-center flex-col  bg-gradient-to-b from-[#FF4252] to-[#fff] duration-300  h-screen p-[50px] top-[90px] left-[-100%] ${open ? "left-[0]":""}`}>
  <div className='w-[60%] relative'>
  <CiSearch className='absolute transform top-[50%] left-[10px] -translate-y-1/2' />
  <input type="text" className='px-8 py-1 rounded-full w-[100%] outline-none' />
  </div>
  <ul className=' fs'>
 {
  menuitems.map((d,i)=>
  {
    return (
      <li className='uppercase p-5 ' key={i}>
      <Link className='uppercase md:hidden'  href={d.path}>{d.name}</Link>
    </li>
    
    )
  })
 }
  </ul>
</div>
    
</div>
</div>
</>
  )
}
