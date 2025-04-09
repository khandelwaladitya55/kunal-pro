"use client";
import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import parse from 'html-react-parser';
export default function ViewDetail({data}) {
    const [open,setIsopen] = useState(false);
  return (
<>
{
    open && <div className='flex fixed inset-0 justify-center items-center'>
        <div className='w-[60%]  h-[50%] overflow-y-scroll  shadow-lg rounded-md p-[20px] bg-white relative'>
<RxCross2 className='absolute bottom-[10px] left-[50%] bg-white p-1  rounded-full border border-grey-200  cursor-pointer text-[30px]' onClick={()=>
    {
        setIsopen(false);
    }
} />
<h1 className='text-[30px] font-bold'>Description</h1>
{parse(data)}
<hr/>
    </div>
    </div>
}
<FaRegEye className='cursor-pointer' onClick={()=>
    {
        setIsopen(true);
    }
} />
</>
  )
}