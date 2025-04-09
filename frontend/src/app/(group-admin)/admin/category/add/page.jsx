"use client";
import axios from "axios";
import React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import { titleToSlug, getCookie } from '@/library/helper';
import { toast } from 'react-toastify';

export default function Page() {
  const nameRef = useRef();
  const slugRef = useRef();
  const token = getCookie("admin_token");

  const nameChangeHandler = () => {
    slugRef.current.value = titleToSlug(nameRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
    };

    axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/category/create', data, {
      headers: {
        authorization: token ?? "",
      },
    })
      .then(response => {
        if (response.data.flag == 1) {
          e.target.reset();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="p-4 md:p-6">
        <div className="p-4 rounded-lg shadow-md min-h-[calc(100vh-76px)] bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-0">Category / Add</h2>
            <Link href="/admin/category" legacyBehavior>
              <button className="bg-purple-500 text-sm md:text-base text-white px-4 py-2 rounded hover:bg-purple-600">
                Back to View
              </button>
            </Link>
          </div>
          <div className="bg-purple-500 rounded-md p-4 md:p-6">
            <form
              className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-white"
              onSubmit={submitHandler}
            >
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="categoryName" className="text-sm md:text-base mb-2">
                  Product Size
                </label>
                <input
                  ref={nameRef}
                  onChange={nameChangeHandler}
                  type="text"
                  id="categoryName"
                  className="outline-none px-3 py-2 bg-purple-400 rounded placeholder-purple-800 placeholder:text-sm"
                  placeholder="Enter Product Size"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label htmlFor="categorySlug" className="text-sm md:text-base mb-2">
                 Product Slug
                </label>
                <input
                  ref={slugRef}
                  readOnly
                  type="text"
                  id="categorySlug"
                  className="outline-none px-3 py-2 bg-purple-400 rounded placeholder-purple-800 placeholder:text-sm"
                  placeholder="Enter Product Slug"
                />
              </div>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 self-start md:self-center"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
