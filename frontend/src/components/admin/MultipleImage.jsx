"use client";
import React, { useState } from 'react';
import { TfiGallery } from "react-icons/tfi";
import { RxCrossCircled } from "react-icons/rx";
import {axiosApiInstance} from "@/library/helper";
import { toast, ToastContainer } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';

export default function MultipleImage({imgDelApiUrl, apiUrl, other_images }) {
    const [otherImages, setOtherImages] = useState(other_images);
    const [open, setIsOpen] = useState(false);
    const deleteHandler=(index)=>
    {
axiosApiInstance.delete(imgDelApiUrl + "/" + index).
then((response)=>
{
    if(response.data.flag==1)
    {

        toast.success(response.data.message);
        setOtherImages(response.data.otherImagesName);
    }
    else
    {
        toast.error(response.data.message);
    }
}).catch((error)=>
{
 toast.error("Internal server error");
})

    }
    const submitHandler=(e)=>
    {
e.preventDefault();
const formData = new FormData();
for(let file of e.target.images.files)
{
    formData.append("images",file);
}
axiosApiInstance.post(apiUrl,formData)
.then(
    (response)=>
    {
if(response.data.flag==1)
{
toast.success(response.data.message);
setOtherImages(response.data.otherImagesName);
}
else
{
toast.error(response.data.message);
}
    }
).catch(()=>
{
toast.error("Internal server error");
})

    }
    return (
        <>
            {
                open && <div className='fixed top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2 shadow-md z-[9999] bg-white'>
                    <div className='flex flex-wrap gap-[20px]'>
                        {otherImages.length != 0 ? otherImages.map((image, index) => {
                            return <div className='relative group'>
                                <img width={90} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/other_images/${image}`} key={index} alt="" />
                                <div className='opacity-0 group-hover:opacity-100 duration-200 w-full flex justify-center items-center h-full absolute top-0 left-0' style={{backgroundColor:"rgb(0,0,0,0.5)"}}>
                                <FaTrashAlt color="white" className='cursor-pointer' size={20} onClick={()=>deleteHandler(index)}/>
                                </div>
                                </div>
                        }):'No image(s)'}
                
                    </div>
                    <RxCrossCircled className='cursor-pointer absolute left-[50%] bottom-[20px] text-[20px]' onClick={() => {
                        setIsOpen(false);
                    }
                    } />
                    <form onSubmit={submitHandler} className='bg-white mt-5 mb-5'> 
<input name='images' type="file" multiple/>
<button  className='py-1 px-2 bg-purple-500 text-white rounded-md'>Save</button>
                    </form>
                </div>

            }

            <TfiGallery onClick={() => {
                setIsOpen(true);
            }
            } className='text-blue-500 cursor-pointer' />
        </>
    )
}
