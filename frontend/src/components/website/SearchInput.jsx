"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SearchInput() {
    const [searchquery,setSearchQuery] = useState("");
    const router = useRouter();
    const searchFuc=(e)=>
    {
const query = new URLSearchParams();
query.append("search",e.target.value);
router.push(`?${query.toString()}`);
    }
    return (
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          onChange={searchFuc}
          
          className="w-full p-2 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <svg
          className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-4.65a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
          />
        </svg>
      </div>
    );
  }