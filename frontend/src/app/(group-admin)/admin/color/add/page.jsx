"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRef } from "react";
import { titleToSlug } from "@/library/helper";
import { toast } from "react-toastify";

export default function Page() {
  const nameRef = useRef();
  const slugRef = useRef();
  const haxRef = useRef();

  const nameChnageHandler = () => {
    slugRef.current.value = titleToSlug(nameRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      colorhex: haxRef.current.value,
    };
    if (!data.name || !data.slug || !data.colorhex) {
      toast.info("Please fill in all the fields");
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/color/create", data)
      .then((response) => {
        if (response.data.flag == 1) {
          e.target.reset();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <div className="p-4 md:p-6">
        <div className="p-4 rounded-lg shadow-md min-h-[calc(100vh-76px)]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-0">
              Color / Add
            </h2>
            <Link href="/admin/color" legacyBehavior>
              <button className="bg-purple-500 text-sm md:text-[14px] text-white px-3 py-2 rounded hover:bg-purple-600">
                Back to View
              </button>
            </Link>
          </div>
          <div className="max-w-full shadow-md rounded-md p-4 md:p-7">
            <form
              action=""
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="categoryName"
                  className="text-sm md:text-[14px] block mb-1"
                >
                  Color Name
                </label>
                <input
                  ref={nameRef}
                  onChange={nameChnageHandler}
                  type="text"
                  id="categoryName"
                  className="outline-none w-full px-3 py-2 shadow-xl rounded placeholder-purple-800 placeholder:text-sm"
                  placeholder="Enter Color name"
                />
              </div>
              <div>
                <label
                  htmlFor="colorPicker"
                  className="text-sm md:text-[14px] block mb-1"
                >
                  Select Color
                </label>
                <input
                  ref={haxRef}
                  type="color"
                  id="colorPicker"
                  className="outline-none w-full px-3 py-2 shadow-xl rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="categorySlug"
                  className="text-sm md:text-[14px] block mb-1"
                >
                  Category Slug
                </label>
                <input
                  ref={slugRef}
                  readOnly
                  type="text"
                  id="categorySlug"
                  className="outline-none w-full px-3 py-2 shadow-xl rounded placeholder-purple-800 placeholder:text-sm"
                  placeholder="Enter Category Slug"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <button className="bg-purple-500 text-white w-full md:w-auto px-4 py-2 rounded hover:bg-purple-600">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
