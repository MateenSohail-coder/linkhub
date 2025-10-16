"use client";
import Image from "next/image";
import Navbar from "./Navbar.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { motion } from "framer-motion";

export default function Herosection() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true); // loader state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check user login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setLoading(false); // stop loader after check
  }, []);

  const createTree = () => {
    if (!text.trim()) return;

    if (isLoggedIn) {
      router.push(`/generate?handle=${text}`);
    } else {
      router.push("/login");
    }
  };

  if (loading) {
    // Fullscreen loader
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] z-50">
        <motion.div
          className="w-20 h-20 border-4 border-t-[#D2E823] border-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] min-h-screen pt-32 md:pt-40 pb-20 flex items-center justify-center overflow-hidden text-white">
        <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-20 gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-[50%] flex flex-col gap-8 justify-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#D2E823] to-white drop-shadow-lg">
              One link to share <br className="hidden md:block" /> everything
              you are — for free.
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Connect all your links, profiles, and content in one sleek,
              personalized page. Join{" "}
              <span className="font-semibold text-[#D2E823]">thousands</span> of
              creators using
              <span className="font-semibold text-white"> LinkHub </span> to
              grow their digital presence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="linkhu.bb/yourname"
                className="h-14 w-full sm:w-64 px-4 text-sm text-neutral-800 font-semibold bg-white rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-[#D2E823]/60 transition-all"
              />
              <button
                onClick={createTree}
                className="px-6 py-3 sm:py-4 bg-[#D2E823] text-sm md:text-base font-bold text-neutral-900 rounded-full hover:bg-[#c1da1f] active:scale-[0.97] transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#D2E823]/50"
              >
                Claim your Linkhub
              </button>
            </div>
          </motion.div>

          {/* Right Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-[50%] flex items-center justify-center relative"
          >
            <div className="w-[70%] md:w-[60%] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)] border border-white/20 bg-white/10 backdrop-blur-md relative">
              <Image
                src="/heropic.png"
                alt="Linkhub Preview"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Soft Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-3xl pointer-events-none"></div>
          </motion.div>
        </section>

        {/* Background Glow Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#D2E823]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8a4fff]/30 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </>
  );
}
