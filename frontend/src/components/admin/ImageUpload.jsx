"use client";
import React, { useRef } from 'react';
import { RxCross2 } from "react-icons/rx";

export default function ImageUpload() {
    const [prev_image,setPrevImage] = React.useState(null);
    const inpRef = useRef();
    const changeHandler=(e)=>
    {
        // console.log(e.target.files[0]);
        const imageFile = new FileReader();
        imageFile.readAsDataURL(e.target.files[0]);
        imageFile.onload = (e)=>
        {
          setPrevImage(e.target.result);
        }


    }
  return (
<>
<input
          type="file"
          hidden
          name='image'
          ref={inpRef}
          accept='png,jepg,jpg,gif'
          onChange={changeHandler}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  
        />
        <div className="w-full relative p-3  border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-center items-center">

      
        <div className='cursor-pointer'  onClick={()=>
            {
             
                inpRef.current.click();
            }
        } >
{ prev_image && < RxCross2 onClick={(e)=>
    {   e.stopPropagation(); 
        setPrevImage("");
        inpRef.current.value = "";
    }
}  className='absolute z-[9999] top-[20px] right-[20px]'/>}
        {prev_image ? <img src={prev_image} alt="preview" width={200} height={200}/>
        : <p>No image selected</p>
        }
        
        </div>
        </div>
</>
  )
}
