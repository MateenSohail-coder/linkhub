"use client";
import React from "react";
import Link from "next/link";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="bg-[#e9c0e9] py-20 px-5 flex items-center justify-center">
      <footer className="w-full px-5 md:px-15 py-7 md:w-[90%] mx-auto flex flex-col gap-4 bg-white border-4 rounded-4xl border-[#502274]">
        <div className="font-bold text-[17px] flex items-start md:items-center gap-2">
          <div className="brand flex items-center gap-2 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 "
              viewBox="0 0 24 24"
              // xml:space is removed because React does not support it
            >
              <path d="m13.511 5.853 4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z" />
            </svg>
            <p className="font-bold text-2xl font-mono hidden md:block">
              Linkhub
            </p>
          </div>
          &copy; copyright {year} . All rights reserved.
        </div>
        <div className="buttons flex gap-4">
          <Link href="/generate">
            <button className="text-white px-4 py-2 md:py-4 font-bold text-1xl bg-[#502274] rounded-full cursor-pointer hover:bg-[#3a1d5c] transition-colors">
              Get Started for free
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
