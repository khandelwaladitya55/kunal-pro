"use client";
import React from 'react';
import { MdSettingsBackupRestore } from "react-icons/md";
import { axiosApiInstance } from "@/library/helper";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Restore({ apiUrl, className }) {
    const router = useRouter();
    // console.log(apiUrl);
    const RestoreHandler = () => {
        axiosApiInstance.patch(apiUrl).then((response) => {
            if (response.data.flag == 1) {
                toast.success(response.data.message);
                router.refresh();

            }
            else {
                toast.error(response.data.message);
            }
        }).catch((error) => {
            toast.error("something went wrong");
        })
    }

    return (
        <div>
            <button onClick={RestoreHandler} className={`text-blue-500 hover:text-blue-600 pt-2 ${className}`}>
                <MdSettingsBackupRestore />
            </button>
        </div>
    )
}
