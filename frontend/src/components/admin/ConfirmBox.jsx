"use client";
import React from "react";

const ConfirmationCard = ({ onDelClick, onCanClick, flag }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
      <div className="group select-none w-[350px]  p-6 relative items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 border border-purple-500 shadow-2xl rounded-2xl">
        <div className="text-center p-3 flex-auto justify-center">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="group-hover:animate-bounce w-14 h-14 flex items-center text-purple-300 fill-white mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            />
          </svg>
          <h2 className="text-2xl font-extrabold py-4 text-white">Are you sure?</h2>
          <p className="font-medium text-sm text-purple-200 px-3">
            Do you really want to {flag ? "trash" : "delete"}?
          </p>
        </div>
        <div className="p-2 mt-4 text-center space-x-2 md:block">
          <button
            onClick={onCanClick}
            className="mb-2 md:mb-0 bg-purple-700 px-6 py-2 text-sm shadow-lg font-semibold tracking-wider border-2 border-purple-600 hover:border-purple-400 text-white rounded-full hover:shadow-xl hover:bg-purple-800 transition ease-in duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelClick}
            className="bg-white hover:bg-transparent px-6 ml-4 mt-4 py-2 text-sm shadow-lg hover:shadow-xl font-semibold tracking-wider border-2 border-white hover:border-white text-purple-700 hover:text-white rounded-full transition ease-in duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;