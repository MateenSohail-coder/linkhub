"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Twitter, Github, Instagram } from "lucide-react";
import Fiverr from "./fiverrlogo";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "All Pages", path: "/allpages" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const socialLinks = [
    { icon: <Twitter size={20} />, href: "https://x.com/AbDuL_MaTeEn77" },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/lege.nd87747/",
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/MateenSohail-coder",
    },
    {
      icon: <Fiverr className="w-7 h-7" />,
      href: "https://www.fiverr.com/s/Eg1voQD",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white py-16 px-6 overflow-hidden">
      {/* Decorative glow blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D2E823]/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8a4fff]/30 blur-3xl rounded-full animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12"
      >
        {/* Brand / Logo */}
        <div className="flex flex-col gap-4 min-w-[220px]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image src="/network.png" alt="Linkhub Logo" fill />
            </div>
            <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D2E823] to-white">
              Linkhub
            </p>
          </div>
          <p className="text-white/80 text-sm md:text-base">
            Empowering creators to own their digital identity. Connect all your
            links and content in one beautiful page.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-white/80 hover:text-[#D2E823] transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 min-w-[120px]">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className="text-white/80 hover:text-[#D2E823] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Resources / Support */}
        <div className="flex flex-col gap-3 min-w-[140px]">
          <h3 className="font-semibold text-lg">Resources</h3>
          <Link
            href="/about"
            className="text-white/80 hover:text-[#D2E823] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-white/80 hover:text-[#D2E823] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-white/80 hover:text-[#D2E823] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/privacy"
            className="text-white/80 hover:text-[#D2E823] transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>

        {/* CTA / Auth Button (only if not on dashboard) */}
        {pathname !== "/dashboard" && (
          <div className="flex flex-col gap-4 min-w-[180px]">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D2E823" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 md:py-4 font-bold text-sm md:text-base bg-[#D2E823] text-neutral-900 rounded-full shadow-lg hover:bg-[#c1da1f] transition-all duration-200"
                >
                  Go to Dashboard
                </motion.button>
              </Link>
            ) : (
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D2E823" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 md:py-4 font-bold text-sm md:text-sm bg-[#D2E823] text-neutral-900 rounded-full shadow-lg hover:bg-[#c1da1f] transition-all duration-200"
                >
                  Get Started for Free
                </motion.button>
              </Link>
            )}
            <p className="text-white/50 text-sm mt-4 md:mt-auto">
              © {year} Linkhub. All rights reserved.
            </p>
          </div>
        )}
      </motion.div>
    </footer>
  );
}
