"use client";
import React, { useEffect, useState } from 'react';
import {getColorData} from "@/library/api-call";
import { useRouter } from 'next/navigation';


export default function ColorBox() {
    const [colors,setColor] = useState([]);
    const [user_color,setUserColor] = useState([]);
    const router = useRouter();
    const addColor = (color_slug)=>
    {
        if(user_color.includes(color_slug))
        {
            setUserColor(user_color.filter((color)=>color!==color_slug));
            return;
        }
        else
        {
            setUserColor([...user_color,color_slug]);

        }
    }
    useEffect(()=>
    {
        if(user_color.length>0)
        {
const query = new URLSearchParams();
query.append('color',user_color.join("-"));
router.push(`?${query.toString()}`);
        }
    },[user_color])
    const fetchColor = async ()=>
        {
            const colorsJSON = await getColorData();
            const colorData = colorsJSON?.colors;
            setColor(colorData);
        }

  useEffect(()=>
{
fetchColor();
},[]);
  return (
    <div>
         <div className='flex gap-3  flex-wrap mt-1'>
        
         {
          colors.map((color,i)=>
          {
            return   <div key={i} onClick={()=>
            {
                return addColor(color.slug)
            }
            } className='w-[20px] border h-[20px] rounded-ful rounded-full cursor-pointer' style={{backgroundColor:color.colorhex,border:user_color.includes(color.slug)?"1px dashed blue":"1px solid ",borderColor:user_color.includes(color.slug)?"blue":"#fff"}}></div>
          })
         }
        
        
         </div>
    </div>
  )
}
