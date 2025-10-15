"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const menu = useRef(null);
  if (isOpen) {
    menu.current.src = "";
  }
  return (
    <div className="flex items-center justify-center w-full">
      <nav
        className={`flex bg-white items-center top-10 z-50 fixed transition-all duration-900 justify-between w-[90%] py-2 md:py-2.5 px-5 md:px-10 rounded-full mx-auto`}
      >
        <Link href="/">
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
        </Link>
        <div className="flex items-center gap-8">
          <div className="options list-none gap-5 hidden md:flex">
            <li className="py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight">
              Products
            </li>
            <li className="py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight">
              Templates
            </li>
            <li className="py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight">
              Marketplace
            </li>
            <li className="py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight">
              Learn
            </li>
            <li className="py-2 px-2.5 rounded cursor-pointer  hover:bg-neutral-100 active:bg-neutral-100 tracking-tight">
              Pricing
            </li>
          </div>
        </div>

        <div className="buttons flex gap-3 items-center">
          <Link href="/generate">
            <button className="bg-[#1E2330] hover:bg-[#2f3647] text-[12px] md:text-sm cursor-pointer py-3 md:py-4 rounded-full text-white font-bold px-2.5 md:px-5">
              Get Started for free
            </button>
          </Link>
          <div
            onClick={() => setisOpen(!isOpen)}
            className={`block md:hidden p-1.5 rounded-full ${
              isOpen ? "bg-[#D2E823]" : ""
            }`}
          >
            <img
              ref={menu}
              src={!isOpen ? "/menu.svg" : "/cross.svg"}
              className="h-7 w-7 bg-cover"
              alt="Menu Icon"
            />
          </div>
        </div>
      </nav>
      <div
        className={`menu fixed top-0 right-0 h-screen w-screen z-40 flex flex-col items-start justify-center bg-neutral-50 list-none transition-transform duration-400 ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-[100vw] pointer-events-none"
        }`}
      >
        <ul className="text-xl font-semibold flex flex-col w-full">
          <li className="max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200">
            Products
          </li>
          <li className="max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200">
            Templates
          </li>
          <li className="max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200">
            Marketplace
          </li>
          <li className="max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200">
            Learn
          </li>
          <li className="max-w-full py-5 active:bg-neutral-200 px-2 mx-3 border-b-1 border-b-neutral-200">
            Pricing
          </li>
        </ul>
      </div>
    </div>
  );
}
