"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white py-20 px-6 overflow-hidden">
      {/* Decorative glowing blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D2E823]/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8a4fff]/30 blur-3xl rounded-full animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 px-6 md:px-10 py-10 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
      >
        {/* Brand & copyright */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image src="/network.png" alt="Linkhub Logo" fill />
            </div>
            <p className="font-bold text-2xl md:text-3xl font-sans bg-clip-text text-transparent bg-gradient-to-r from-[#D2E823] to-white">
              Linkhub
            </p>
          </div>
          <p className="text-sm md:text-base text-white/80 mt-2 md:mt-0">
            © {year} Linkhub. All rights reserved.
          </p>
        </motion.div>

        {/* CTA Section (changes by auth) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4"
        >
          {isAuthenticated ? (
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D2E823" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:py-4 font-bold text-sm md:text-base bg-[#D2E823] text-neutral-900 rounded-full shadow-lg hover:bg-[#c1da1f] active:scale-[0.97] transition-all duration-200"
              >
                Go to Dashboard
              </motion.button>
            </Link>
          ) : (
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D2E823" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:py-4 font-bold text-sm md:text-base bg-[#D2E823] text-neutral-900 rounded-full shadow-lg hover:bg-[#c1da1f] active:scale-[0.97] transition-all duration-200"
              >
                Get Started for Free
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </footer>
  );
}
