"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "All Pages", path: "/allpages" },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <nav className="flex bg-white/80 backdrop-blur-xl shadow-lg items-center top-6 z-50 fixed transition-all duration-500 justify-between w-[92%] py-3 md:py-3.5 px-5 md:px-10 rounded-full mx-auto border border-neutral-200">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 relative">
            <Image src="/network.png" alt="Linkhub Logo" fill />
          </div>
          <p className="font-bold text-2xl font-sans text-[#1E2330] hidden md:block">
            Linkhub
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative font-medium transition-all duration-200 ${
                pathname === link.path
                  ? "text-[#225ac0] font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#225ac0]"
                  : "text-neutral-700 hover:text-neutral-950"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Desktop Auth Buttons */}
          {isLoggedIn ? (
            <>
              {pathname !== "/dashboard" && (
                <Link href="/dashboard">
                  <button className="bg-gradient-to-r from-[#225ac0] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#225ac0] text-sm cursor-pointer py-3 px-5 rounded-full text-white font-semibold shadow-md transition-all duration-200 active:scale-[0.97]">
                    Dashboard
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-neutral-700 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="text-sm cursor-pointer py-3 px-5 rounded-full text-[#1E2330] font-semibold hover:text-[#225ac0] transition-all duration-200">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-gradient-to-r from-[#225ac0] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#225ac0] text-sm cursor-pointer py-3 px-5 rounded-full text-white font-semibold shadow-md transition-all duration-200 active:scale-[0.97]">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu + Auth Buttons */}
        <div className="flex gap-2 items-center md:hidden">
          {isLoggedIn ? (
            <>
              {pathname !== "/dashboard" && (
                <Link
                  href="/dashboard"
                  className="px-3 py-2 bg-gradient-to-r from-[#225ac0] to-[#1d4ed8] text-white rounded-full text-sm font-semibold shadow-md"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-2 flex items-center gap-1 text-red-600 rounded-full bg-white/20 font-semibold shadow-md"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-[#1E2330] rounded-full text-sm font-semibold bg-white/20 hover:bg-white/30 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 bg-gradient-to-r from-[#225ac0] to-[#1d4ed8] text-white rounded-full text-sm font-semibold shadow-md"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className={`p-2 rounded-full transition-all duration-300 ${
              isOpen ? "bg-[#D2E823]" : "bg-transparent"
            }`}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
          isOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[100vw] opacity-0 pointer-events-none"
        }`}
      >
        <ul className="text-xl font-semibold flex flex-col w-full max-w-md text-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block py-4 mx-8 rounded-xl transition-all duration-300 ${
                pathname === link.path
                  ? "bg-[#225ac0] text-white"
                  : "text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
