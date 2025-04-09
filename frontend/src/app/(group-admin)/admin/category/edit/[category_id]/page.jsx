"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRef } from "react";
import { titleToSlug } from "@/library/helper";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { axiosApiInstance } from "@/library/helper";
import { getCategoryData } from "@/library/api-call";

export default function Page() {
  const nameRef = useRef();
  const slugRef = useRef();
  const params = useParams();
  const id = params.category_id;
  const [category, setCategory] = useState(null);

  const getData = async () => {
    const categoryJSON = await getCategoryData(id);
    const data = categoryJSON?.categories;
    setCategory(data);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const nameChnageHandler = () => {
    slugRef.current.value = titleToSlug(nameRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
    };

    axiosApiInstance
      .put(`/category/update/${id}`, data)
      .then((response) => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="p-4 md:p-6">
        <div className="p-4 rounded-lg shadow-md min-h-[calc(100vh-76px)] bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h2 className="text-lg md:text-xl font-semibold">Product Size / Edit</h2>
            <Link href="/admin/category" legacyBehavior>
              <button className="bg-purple-500 text-sm md:text-base text-white px-3 py-2 rounded hover:bg-purple-600">
                Back to View
              </button>
            </Link>
          </div>
          <div className="bg-purple-500 rounded-md p-4 md:p-6">
            <form
              action=""
              className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-white"
              onSubmit={submitHandler}
            >
              <div className="flex flex-col w-full md:w-1/2">
                <label
                  htmlFor="categoryName"
                  className="text-sm md:text-base mb-1"
                >
              Product Size
                </label>
                <input
                  defaultValue={category?.name}
                  ref={nameRef}
                  onChange={nameChnageHandler}
                  type="text"
                  id="categoryName"
                  className="outline-none px-3 py-2 bg-purple-400 rounded placeholder-purple-800 placeholder:text-sm"
                  placeholder="Enter Category Name"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label
                  htmlFor="categorySlug"
                  className="text-sm md:text-base mb-1"
                >
                  Product Slug
                </label>
                <input
                  defaultValue={category?.slug}
                  ref={slugRef}
                  readOnly
                  type="text"
                  id="categorySlug"
                  className="outline-none px-3 py-2 bg-purple-400 rounded placeholder-purple-800 placeholder:text-sm"
                  placeholder="Enter Category Slug"
                />
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 self-start md:self-center">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
