import Link from "next/link";
import { MoveToTrashData } from "@/library/api-call";
import { timeAgo } from "@/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Restore from "@/components/admin/Restore";
import { FcEmptyTrash } from "react-icons/fc";

const CategoryList = async () => {
    const categoryJSON = await MoveToTrashData();
    const categories = categoryJSON?.categories;

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Trash</h2>
                    <div className="flex gap-3 sm:gap-5">
                        <Link href="/admin/category">
                            <button className="bg-purple-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center hover:bg-purple-600">
                                Back to Categories
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border text-sm sm:text-base">ID</th>
                                <th className="p-2 border text-sm sm:text-base">NAME</th>
                                <th className="p-2 border text-sm sm:text-base">Slug</th>
                                <th className="p-2 border text-sm sm:text-base">Status</th>
                                <th className="p-2 border text-sm sm:text-base">Deleted</th>
                                <th className="p-2 border text-sm sm:text-base">Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryJSON != null &&
                                categories.map((category, index) => (
                                    <tr key={category._id} className="hover:bg-gray-50">
                                        <td className="p-2 border text-black text-sm sm:text-base">{index + 1}</td>
                                        <td className="p-2 border text-sm sm:text-base">{category.name}</td>
                                        <td className="p-2 border text-sm sm:text-base">{category.slug}</td>
                                        <td className="p-2 border text-sm sm:text-base">
                                            <ToggleStatus flag={5} status={category.status} />
                                        </td>
                                        <td className="p-2 border text-sm sm:text-base">{timeAgo(category.deletedAt)}</td>
                                        <td className="p-2 border flex justify-center items-center gap-2 sm:gap-3">
                                            <Restore apiUrl={`/category/restore/${category._id}`} />
                                            <DeleteBtn className="h-[30px]" flag={0} deleteUrl={`/category/delete/${category._id}`} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {categories.length === 0 && (
                    <div className="bg-purple-500 flex flex-col sm:flex-row gap-4 text-lg sm:text-xl text-white p-4 justify-center items-center rounded mt-5">
                        The trash is empty right now <FcEmptyTrash />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;