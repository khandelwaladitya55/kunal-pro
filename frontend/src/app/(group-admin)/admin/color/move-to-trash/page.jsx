import Link from "next/link";
import { MoveToTrashColorData } from "@/library/api-call";
import { timeAgo } from "@/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Restore from "@/components/admin/Restore";
import { FcEmptyTrash } from "react-icons/fc";

const colorList = async () => {
    const colorJSON = await MoveToTrashColorData();
    const colors = colorJSON?.colors;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Trash</h2>
                    <div className="flex gap-5">
                        <Link href="/admin/color">
                            <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-600">
                                Back to Colors
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm md:text-base">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">NAME</th>
                                <th className="p-2 border">Slug</th>
                                <th className="p-2 border">Color Code</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Deleted</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colorJSON != null &&
                                colors.map((color, index) => (
                                    <tr key={color._id} className="hover:bg-gray-50">
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
                                            <ToggleStatus flag={5} status={color.status} />
                                        </td>
                                        <td className="p-2 border">{timeAgo(color.deletedAt)}</td>
                                        <td className="p-2 border flex justify-center items-center gap-3">
                                            <Restore apiUrl={`/color/restore/${color._id}`} />
                                            <DeleteBtn
                                                className="h-[30px]"
                                                flag={0}
                                                deleteUrl={`/color/delete/${color._id}`}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {colors?.length === 0 && (
                        <div className="bg-purple-500 flex gap-4 text-xl text-white p-2 justify-center items-center rounded mt-5">
                            The trash is empty right now <FcEmptyTrash />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default colorList;