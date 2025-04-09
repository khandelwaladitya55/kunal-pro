"use client"
import React, { useState } from 'react'
import {axiosApiInstance,getCookie} from "@/library/helper";
import { toast } from 'react-toastify';


export default function 
ToggleStatus({status,apiUrl,id,flag}) {
    const [current_status,setCurrentStatus] = useState(status);
  
  const token = getCookie("admin_token");
    const toggleHandler=()=>
    {
      // setCurrentStatus(!current_status);
      axiosApiInstance.patch(apiUrl,{id:id,new_status: !current_status},
        {
          headers:{
authorization:token ?? ""
          }
        }
      ).then((response)=>{
        if(response.data.flag==1)
        {
          setCurrentStatus(!current_status);  
          toast.success(response.data.message);
        }
        else
        {
toast.error(response.data.message);
        }

      }).catch((error)=>
      {
        // console.log(error.message);
toast.error("internal server error");
      })
      
    }
  return (
    <button onClick={()=>
    {
      if(flag!==5)
      {
        toggleHandler();  
      }
    }
    } className={`${current_status?'bg-green-500':'bg-red-500'} text-white px-2  rounded-md `}>
        {current_status?'Active':'Inactive'}
    </button>
  )
}
