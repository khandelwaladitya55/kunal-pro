"use client";
import React, { useState } from 'react';
// import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { axiosApiInstance } from "@/library/helper";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ConfrimBox from "@/components/admin/ConfirmBox";


export default function DeleteBtn({ deleteUrl, flag }) {
  const router = useRouter();
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const deleteProcess = () => {
    if (flag == 1) {
      //trash code 
      toast.loading("moving to trash...");
      axiosApiInstance.patch(deleteUrl).then((response) => {
        if (response.data.flag == 1) {
          toast.dismiss();
          toast.success(response.data.message);
          setToggleConfirm(false);
          router.push("");
        }
        else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        toast.error('something went wrong');
      })

    } else {
      //delete code 
      toast.loading("Deleting...");
      axiosApiInstance.delete(deleteUrl).then((response) => {
        if (response.data.flag == 1) {
          toast.dismiss();
          toast.success(response.data.message);
          router.refresh();
        }
        else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        toast.error('something went wrong');
      })
    }
  }
  const deleteHandler = () => {

    setToggleConfirm(true);
  }
  return (
    <>
      {toggleConfirm && <ConfrimBox flag={flag} onDelClick={deleteProcess} onCanClick={() => { toast.info("Misson abort"); setToggleConfirm(false) }} />}
      <button onClick={deleteHandler} className="text-red-500 hover:text-red-600" >
        <FaTrash />
      </button>
    </>
  )
}
