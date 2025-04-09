"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from '@/components/website/SearchInput';
export default function StoreTool() {
    const searchParams = useSearchParams();
    const [sortName,setSortName] = useState(null);
    const [sortPrice,setSortPrice] = useState(null);
    const [sortByLimit,setSortLimit] = useState(null);
    //Asc:1 Desc:-1
    const router = useRouter();
    useEffect(()=>
    {
if(searchParams.get("sortByName"))
{
    setSortName(parseInt(searchParams.get("sortByName")));
}
if(searchParams.get("sortPrice"))
{
    setSortPrice(parseInt(searchParams.get("sortByPrice")));
}
    },[])
    useEffect(()=>
    {
const query = new URLSearchParams();
if(sortName)
{
    query.set("sortByName",sortName);
}
if(sortPrice)
{
    query.set("sortByPrice",sortPrice);
}
if(sortByLimit)
{
    query.set("sortByLimit",sortByLimit);
}
router.push(`?${query.toString()}`);
    },[sortName,sortPrice,sortByLimit]);
    //Dropdown handler


    const handleDropdownChange = (event) => {
        const value = event.target.value;
        if (value === "name-asc") {
            setSortName(1);
            setSortPrice(null); // Reset Price Sorting
        } else if (value === "name-desc") {
            setSortName(-1);
            setSortPrice(null);
        } else if (value === "price-asc") {
            setSortPrice(1);
            setSortName(null); // Reset Name Sorting
        } else if (value === "price-desc") {
            setSortPrice(-1);
            setSortName(null);
        }
        else if(value=== "tenproducts")
            {
                setSortLimit(10);
                setSortPrice(null);
                setSortName(null);
            }
            else if(value==="twentyproducts")
                {
                    setSortLimit(20);
                    setSortPrice(null);
                    setSortName(null);
                }
                else if(value==="30products")
                    {
                        setSortLimit(30);
                        setSortPrice(null);
                        setSortName(null);
                    }
                    else if(value==="infiniteproducts")
                        {
                            setSortLimit(null);
                            setSortPrice(null);
                            setSortName(null);
                        } else {
            setSortName(null);
            setSortPrice(null);
        }
        
    };
    const clearAll=()=>
    {
        router.replace("/store");
        setSortLimit(null);
        setSortPrice(null);
        setSortName(null);
    }
  return (
    <>
    
      </>
 

  )
}
