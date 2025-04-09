import React from 'react';
import {getCategoryData} from "@/library/api-call";
import Link from 'next/link';
import StoreTool from '@/components/website/StoreTool';
import ColorBox from '@/components/website/ColorBox';

export default async function page({children}) {
const categorieJSON = await getCategoryData(true,null);
const categories = categorieJSON?.categories;




  return (
    <div className='bg mt-4 p-2 md:p-4'>
<div className='grid gap-3  grid-cols-[100%] md:grid-cols-[20%_79%] '>
<div className="left-section hidden md:block shadow-md  p-4 rounded">
    <div className='md:text-[24px] font-bold uppercase'>Product Size</div>
    <ul>
      {categories.map((category,index)=>
      {
        return (
<div key={category._id} className='flex justify-between'>
  <Link href={`/store/${category.slug}`}>
<li  className='p-1 cursor-pointer hover:text-[blue]'>{category.name}</li>
  </Link>
<div className='w-[20px] h-[20px] bg-blue-300 text-white mt-1  flex justify-center items-center rounded-full'>
<span>{category.productCount}</span>
</div>
</div>          
        )
      })}
   
    
    </ul>
   
    {/* <div className='mt-3'>$22.50</div> */}
    <div className='text-[24px] p-3 rounded-md font-bold shadow-lg uppercase mt-3'>Frame color
<ColorBox/>
</div>
</div>
<div className="right-section shadow-md">
<StoreTool/>
{children}



</div>
</div>
</div>

  )
}
