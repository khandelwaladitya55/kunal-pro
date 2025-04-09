import React from 'react';
import ProductCard from '@/components/website/ProductCard';
import {getProductData} from "@/library/api-call";


export default async function page({params}) {
const productJson=await getProductData(null,true,params.category_slug);
const products = productJson?.products;

  return (
<div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4  p-2'>
  {products.map((product,index)=>
  {
    return <ProductCard data={product}/>
  })}


</div>

  )
}
