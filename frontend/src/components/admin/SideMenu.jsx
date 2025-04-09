  "use client"
  import { useState } from "react";
  import { FiHome, FiUser, FiSettings , FiMenu, FiX, FiLayers, FiGrid } from "react-icons/fi";
  import { IoHome } from "react-icons/io5";
  import { FaStoreAlt,FaUserCircle  } from "react-icons/fa";
  import Link from "next/link";
  const SideMenu = ({className}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [isEcommOpen,setIsEcommOpen]= useState(false);
    const [isUserOpen,setIsUserOpen]= useState(false);

    return (
      
      <div className={`h-screen ${className} hidden md:block `}>
        {/* Sidebar */}
        <div className={`bg-white fixed md:relative  bg-red text-gray-800 shadow-md h-full transition-all duration-300 p-2 md:p-5 pt-8 `}>
          {/* Menu Toggle Button */}
          
          <div className="flex justify-between items-center">
      
          </div>
          
          <h3 className="mt-6 text-gray-600 text-[14px] md:text-xl font-bold uppercase text-center md:text-left">Admin Panel</h3>
          
          <ul className="mt-3">
            {/* Dashboard section */}
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setDashboardOpen(!dashboardOpen)}>
              <IoHome className="md:text-xl mr-2 md:mr-0" />
              <span className={`md:ml-3 text-[14px] md:text-lg ${isOpen ? "block" : "hidden"}`}>Dashboards</span>
   
            </li>
            {dashboardOpen && isOpen && (
              <ul className="ml-6 mt-2">
                <Link href="/admin" className="text-blue-600 block text-sm cursor-pointer">Overview</Link>
                
              </ul>
            )}
            {/* Ecommerce */}
          <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setIsEcommOpen(!isEcommOpen)}>
              <FaStoreAlt className="md:text-xl text-sm mr-2 md:mr-0" />
              <span className={`md:ml-3 text-sm md:text-lg ${isOpen ? "block" : "hidden"}`}>Ecommerce</span>
   
            </li>
            {isEcommOpen && isOpen && (
              <ul className="ml-6 mt-2">

                <Link href="/admin/category" className="text-gray-500 block text-sm cursor-pointer">Product Size</Link>
                <Link href="/admin/color" className="text-blue-600 block text-sm cursor-pointer">Color</Link>
                <Link href="/admin/product" className="text-gray-500 block text-sm cursor-pointer">products</Link>
              </ul>
            )}
     
          </ul>

          {/* Applications Section */}
          <h3 className="mt-6 text-gray-600 text-sm font-bold uppercase">Applications</h3>
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
            <img src="https://react.pixelstrap.com/koho/static/media/2.383678dac802679a7548.png" width={100} alt="Feature" className="mx-auto" />
            <p className="text-gray-700 text-sm mt-2">Experience with more Features</p>
            <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg">Check now</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          {/* <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1> */}
        </div>
      </div>
    );
  };

  const MenuItem = ({ icon, text, isOpen }) => {
    return (
      <li className="flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span className="text-xl">{icon}</span>
        <span className={`ml-3 text-lg transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>{text}</span>
      </li>
    );
  };

  export default SideMenu;
