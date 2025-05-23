"use client";
import React from 'react';
import {axiosApiInstance} from "@/library/helper";
import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify';


export default function Login() {
  const router = useRouter();
  const submitHandler=(e)=>
  {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    axiosApiInstance.post("/admin/login",{email,password},{withCredentials:true})
    .then((response)=>
    {
if(response.data.flag==1)
{
  toast.success(response.data.message);
router.push("/admin");
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
  return (
    <div className='flex justify-center items-center min-h-screen'>
    
   
    <div className="max-w-[350px] h-[100%]  bg-gradient-to-t from-purple-100 to-white rounded-[40px] p-6 border-4 border-white shadow-lg shadow-purple-300 m-5">
      <h2 className="text-center font-extrabold text-2xl text-purple-600">Sign In</h2>
      
      <form className="mt-5" onSubmit={submitHandler}>
        <input
          required
          className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
        />
        <input
          required
          className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete='current-password'
        />
        <span className="block mt-2 ml-2 text-xs text-purple-500">
          <a href="#" className="hover:underline">Forgot Password?</a>
        </span>
        <input
          className="w-full font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 mt-5 rounded-2xl shadow-md hover:scale-105 transition-transform active:scale-95"
          type="submit"
          value="Sign In"
        />
      </form>

      <div className="mt-6">
        <span className="block text-center text-xs text-gray-500">Or Sign in with</span>
        <div className="flex justify-center gap-4 mt-2">
          <button className="bg-gradient-to-r from-purple-700 to-purple-500 border-4 border-white p-2 rounded-full w-10 h-10 grid place-content-center shadow-md hover:scale-110 transition-transform active:scale-90">
            <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </button>
          <button className="bg-gradient-to-r from-purple-700 to-purple-500 border-4 border-white p-2 rounded-full w-10 h-10 grid place-content-center shadow-md hover:scale-110 transition-transform active:scale-90">
            <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9z" />
            </svg>
          </button>
          <button className="bg-gradient-to-r from-purple-700 to-purple-500 border-4 border-white p-2 rounded-full w-10 h-10 grid place-content-center shadow-md hover:scale-110 transition-transform active:scale-90">
            <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.c7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </button>
        </div>
      </div>

      <span className="block text-center mt-4 text-xs text-purple-500">
        <a href="#" className="hover:underline">Learn user license agreement</a>
      </span>
    </div>
    </div>
  );
}
