"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setAuthChecked(true);
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
    { name: "Contact", path: "/contact" },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Auth Buttons component
  const AuthButtons = ({ isMobile = false }) => {
    if (!authChecked) return null;

    // Dashboard page: show only Logout
    if (pathname === "/dashboard" && isLoggedIn) {
      return (
        <div
          className={
            isMobile ? "flex flex-col gap-3" : "flex items-center gap-4"
          }
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-5 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      );
    }

    // Logged in: Dashboard + Logout
    if (isLoggedIn) {
      return (
        <div
          className={
            isMobile ? "flex flex-col gap-3" : "flex items-center gap-4"
          }
        >
          <Link href="/dashboard">
            <button className="px-5 py-2 cursor-pointer bg-[#D2E823] text-neutral-900 font-semibold rounded-full shadow-lg hover:bg-[#c1da1f] transition-all duration-200">
              Dashboard
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-1 text-red-500 font-semibold hover:text-red-600 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      );
    }

    // Not logged in: Login + Register
    return (
      <div
        className={isMobile ? "flex flex-col gap-3" : "flex items-center gap-4"}
      >
        <Link href="/login">
          <button className="px-5 py-2 cursor-pointer rounded-full font-semibold text-white bg-[#225ac0]/80 hover:bg-[#225ac0]/60 transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-5 py-2 cursor-pointer bg-[#D2E823] text-neutral-900 font-semibold rounded-full shadow-lg hover:bg-[#c1da1f] transition-all duration-200">
            Get Started
          </button>
        </Link>
      </div>
    );
  };

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-6 w-full z-50 flex justify-center"
    >
      <nav className="w-[92%] backdrop-blur-lg bg-gradient-to-r from-[#1a2a6c]/70 via-[#225ac0]/60 to-[#8a4fff]/50 rounded-3xl border border-white/20 shadow-xl flex items-center justify-between py-3 px-6 md:px-10 transition-all duration-500 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 relative">
            <Image
              src="/network.png"
              alt="Linkhub Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="hidden md:block text-2xl font-bold text-white tracking-wide">
            Linkhub
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                pathname === link.path
                  ? "bg-[#D2E823] text-neutral-900 shadow-md"
                  : "text-white/80 hover:text-[#D2E823] hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons - Always Visible */}
        <AuthButtons />

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className={`p-2 rounded-full transition-colors ${
              isOpen ? "bg-white/20" : "bg-white/10"
            }`}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 backdrop-blur-md flex bg-white flex-col items-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>

            {/* Links */}
            <ul className="flex flex-col gap-6 w-full px-8 mt-24 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-4 px-6 rounded-lg text-xl font-semibold transition-colors border-b-2 border-b-[#D2E823] ${
                    pathname === link.path
                      ? "bg-[#D2E823] text-neutral-900 shadow-md"
                      : "bg-white text-[#D2E823]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
