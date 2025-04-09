"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function () {
  const [price,setPrice] = useState([100,50000]);
  const router = useRouter();
  const params = useParams();
  useEffect(()=>
  {
if(params.min && params.max)
{
  setPrice([Number((params.min)),Number((params.max))]);
}
  },[]);
  const changeHandler=(data)=>
  {
setPrice(data);
const query = new URLSearchParams(window.location.search);
query.set('min',data[0]);
query.set("max",data[1]);
router.push(`?${query.toString()}`);
  }
    return (
      <>
<div className='flex mb-2 items-center gap-2'>
<label htmlFor="">₹{price[0]}</label>
<span>-</span>
<label htmlFor="">₹{price[1]}</label>
</div>
<RangeSlider max={200000} onInput={changeHandler} min={100} value={price} className='m-2' />
      </>
    );
}