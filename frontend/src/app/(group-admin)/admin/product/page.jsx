"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { getProductData } from '@/library/api-call';
import { timeAgo } from "@/library/helper";
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from '@/components/admin/ToggleStatus';
import ViewDetail from '@/components/admin/ViewDetail';
import MultipleImage from '@/components/admin/MultipleImage';
import { CiSearch } from "react-icons/ci";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productJson = await getProductData();
        setProducts(productJson?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative w-[90%] sm:w-[50%] mx-auto mt-5">
        <CiSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          className="outline-none border-purple-400 bg-gradient-to-r from-white to-purple-100 text-gray-500 rounded-full border-2 w-full px-8 placeholder:text-[14px] py-1 shadow-lg block"
          placeholder="Search Products..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        <div className="font-bold text-xl mb-3 sm:mb-0">Products</div>
        <div className="flex gap-3">
          <div className="px-3 py-1 text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md">
            <Link href="/admin/product/trash-products">View Trash</Link>
          </div>
          <Link
            href="/admin/product/add"
            className="py-1 px-2 text-white rounded-md bg-gradient-to-r from-purple-500 to-indigo-600"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="p-3 sm:p-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">NAME / slug</th>
              <th className="p-2 border">PRICE</th>
              <th className="p-2 border">IMAGE</th>
              <th className="p-2 border">CATEGORY</th>
              <th className="p-2 border">COLOR</th>
              <th className="p-2 border">CREATED / UPDATED</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod, index) => (
                <tr key={prod._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-black">{index + 1}</td>
                  <td className="p-2 border">{prod.name}/{prod.slug}</td>
                  <td className="p-2 border">
                    <div>Price: {prod.price}</div>
                    <div>Discount: {prod.discount}%</div>
                    <div>Final Price: {prod.final_price}</div>
                  </td>
                  <td className="p-2 border">
                    <img
                      className="rounded-lg w-16 h-16 sm:w-20 sm:h-20"
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${prod.main_image}`}
                      alt=""
                    />
                  </td>
                  <td className="p-2 border">{prod.category_id?.name}</td>
                  <td className="p-5 border">
                    <ul className="list-disc text-center">
                      {prod.colors?.map((color, index) => (
                        <div key={index}>
                          <li>{color.name}</li>
                          <div
                            style={{ backgroundColor: color.name }}
                            className="w-10 h-5 mx-auto rounded-full"
                          ></div>
                        </div>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border">
                    {timeAgo(prod.createdAt)} / {timeAgo(prod.updatedAt)}
                  </td>
                  <td className="p-2 border">
                    <ToggleStatus
                      status={prod.status}
                      id={prod._id}
                      apiUrl={`/product/change-status`}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Link href={`/admin/product/edit/${prod._id}`}>
                        <button className="text-yellow-500 hover:text-yellow-600">
                          <FaEdit />
                        </button>
                      </Link>
                      <DeleteBtn
                        flag={1}
                        deleteUrl={`/product/move-to-trash/${prod._id}`}
                      />
                      <ViewDetail data={prod.description} />
                      <MultipleImage
                        imgDelApiUrl={`/product/delete-image/${prod._id}`}
                        apiUrl={`/product/add-other-images/${prod._id}`}
                        other_images={prod.other_images}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="p-4 text-center text-gray-500"
                >
                  No products found which you are finding{" "}
                  <img
                    className="rounded-full mx-auto w-24"
                    src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544940.jpg?ga=GA1.1.1757076545.1688881343&semt=ais_hybrid"
                    alt="No data"
                  />
                  ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
