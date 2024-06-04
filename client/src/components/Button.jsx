import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Loader2 from "../components/Loader2";
export default function Button({ children, className, loading, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        " bg-blue-600 text-white flex items-center justify-center px-8 py-2 text-xl hover:bg-blue-800 duration-300 rounded-md",
        className
      )}
    >
      {loading ? (
        <Loader2 className="flex justify-center items-center w-12 h-8 translate-x-2" />
      ) : (
        children
      )}
    </button>
  );
}
