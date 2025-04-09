"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { titleToSlug } from '@/library/helper';
import { getCategoryData } from "@/library/api-call";
import { getColorData } from "@/library/api-call";
import Select from 'react-select';
import { axiosApiInstance } from "@/library/helper";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function AddProduct() {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [description, setDescription] = useState("");

  const getData = async () => {
    const category_response = await getCategoryData();
    const categorie_data = category_response?.categories;
    setCategory(categorie_data);
    const color_response = await getColorData();
    const color_data = color_response.colors;
    setColor(color_data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    original_Price: "",
    discountInper: "",
    final_price: ""
  });
  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const percentageRef = useRef();
  const finalPriceRef = useRef();

  const handleChange = () => {
    axiosApiInstance.get(`/product/check-product-exists/${nameRef.current.value}`)
      .then((response) => {
        if (response.data.flag == 0) {
          setErrors({ ...errors, name: "Product name already exists" });
        } else {
          setErrors({ ...errors, name: "" });
        }
      })
      .catch(() => {});
    slugRef.current.value = titleToSlug(nameRef.current.value);
  };

  const priceChangeHandler = () => {
    const originalPrice = originalPriceRef.current.value;
    const discoutPercentage = percentageRef.current.value;
    if (discoutPercentage > 100) {
      setErrors({ ...errors, discountInper: "Discount percent must be less than 100" });
      return;
    } else if (discoutPercentage < 0) {
      setErrors({ ...errors, discountInper: "Price must be greater than 0" });
      return;
    } else {
      setErrors({ ...errors, discountInper: "" });
    }
    const finalPrice = originalPrice - (discoutPercentage / 100 * originalPrice);
    finalPriceRef.current.value = finalPrice;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('slug', slugRef.current.value);
    formData.append('original_price', originalPriceRef.current.value);
    formData.append('discount_percentage', percentageRef.current.value);
    formData.append('final_price', finalPriceRef.current.value);
    formData.append('category', e.target.category.value);
    formData.append('colors', JSON.stringify(selectedColors));
    formData.append('description', description);
    formData.append('image', e.target.image.files[0]);
    axiosApiInstance.post('/product/add', formData)
      .then((response) => {
        if (response.data.flag == 1) {
          router.push("/admin/product");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="max-w-[90%] mt-[50px] mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-xl">
      <div className="flex justify-end mb-4">
        <div className="bg-purple-500 w-[130px] cursor-pointer py-1 text-center rounded-md text-white">
          <Link href="/admin/product">View Products</Link>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form className="space-y-6" onSubmit={submitHandler}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full p-3 border h-[40px] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
              ref={nameRef}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>

          <input
            type="text"
            name="slug"
            placeholder="Product Slug"
            className="w-full h-[40px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ref={slugRef}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Select
            name="category"
            options={category.map((item) => ({ label: item.name, value: item._id }))}
          />
          <Select
            onChange={(options) => {
              const data = options.map((color) => color.value);
              setSelectedColors(data);
            }}
            name="colors"
            closeMenuOnSelect={false}
            isMulti={true}
            options={color.map((item) => ({ label: item.name, value: item._id }))}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <input
            type="number"
            name="original_price"
            onChange={priceChangeHandler}
            ref={originalPriceRef}
            placeholder="Original Price"
            className="w-full h-[50px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div>
            <input
              type="number"
              name="discountInper"
              placeholder="Discount %"
              onChange={priceChangeHandler}
              ref={percentageRef}
              className="w-full h-[50px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.discountInper && <div className="text-red-500 text-sm mt-1">{errors.discountInper}</div>}
          </div>
          <input
            type="number"
            name="final_price"
            ref={finalPriceRef}
            readOnly={true}
            placeholder="Discounted Price"
            className="w-full p-3 h-[50px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <RichTextEditor
          value={description}
          changeHandler={(data) => setDescription(data)}
        />
        <ImageUpload />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
