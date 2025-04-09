"use client";
// import { RiMenu3Fill } from "react-icons/ri";
// import ResponsiveMenu from "@/components/admin/ResponsiveMenu";
// import { useState } from "react";
import {axiosApiInstance} from "@/library/helper";
import { useRouter } from "next/navigation";

export default function Header({ className }) {
  const router = useRouter();
  const logoutHandler =async ()=>
  {
await axiosApiInstance.get("/admin/logout",{withCredentials:true});
router.push("/admin-login");

  }
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`box shadow p-3 flex md:justify-end justify-between items-center ${className}`}>
        <button onClick={logoutHandler} className="bg-purple-500 px-2 py-1 rounded text-white">Logout</button>
        {/* <RiMenu3Fill 
          // onClick={() => setIsOpen(!isOpen)} 
          className="cursor-pointer md:hidden"
          aria-label="Toggle menu"
        /> */}
      </div>
      
    </>
  );
}
