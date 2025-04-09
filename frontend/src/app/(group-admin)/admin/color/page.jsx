"use client";

import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { getColorData } from "@/library/api-call";
import { timeAgo } from "@/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import { motion } from "framer-motion";

const ColorList = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      const colorJSON = await getColorData();
      setColors(colorJSON?.colors || []);
    };

    fetchColors();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <motion.h2 drag className="text-xl font-semibold">
            Colors
          </motion.h2>
          <div className="flex gap-3 sm:gap-5">
            <Link href="/admin/color/move-to-trash">
              <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-600">
                View Trash
              </button>
            </Link>
            <Link href="/admin/color/add">
              <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-600">
                + Add color
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">NAME</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">Color Code</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created / Updated</th>
                <th className="p-2 border">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {colors.length > 0 ? (
                colors.map((color, index) => (
                  <tr
                    key={color._id}
                    className="hover:bg-gray-50 text-gray-700"
                  >
                    <td className="p-2 border text-black">{index + 1}</td>
                    <td className="p-2 border">{color.name}</td>
                    <td className="p-2 border">{color.slug}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                        {color.colorhex}
                        <div
                          style={{ backgroundColor: color.colorhex }}
                          className="w-5 h-5 rounded"
                        ></div>
                      </div>
                    </td>
                    <td className="p-2 border">
                      <ToggleStatus
                        status={color.status}
                        id={color._id}
                        apiUrl={`/color/change-status`}
                      />
                    </td>
                    <td className="p-2 border">
                      {timeAgo(color.createdAt)} / {timeAgo(color.updatedAt)}
                    </td>
                    <td className="p-2 border flex justify-center gap-3">
                      <Link href={`/admin/color/edit/${color._id}`}>
                        <button className="text-yellow-500 hover:text-yellow-600">
                          <FaEdit />
                        </button>
                      </Link>
                      <DeleteBtn
                        flag={1}
                        deleteUrl={`/color/move-to-trash/${color._id}`}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-4 text-gray-500"
                  >
                    No colors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ColorList;
