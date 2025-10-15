"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import jwt from "jsonwebtoken";
import ArrowLeftbt from "../components/backarrowbt";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");

    // Decode username from token
    try {
      const decoded = jwt.decode(token);
      setUsername(decoded?.name || decoded?.handle || "User");
    } catch (err) {
      console.error("Failed to decode token:", err);
    }

    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await fetch("/api/my-links", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setLinks(data.links || []);
      } catch (err) {
        console.error("Error fetching links:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return (
    <>
      <Navbar />

      {/* Padding to prevent navbar overlap */}
      <div className="min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white flex flex-col items-center pt-32 pb-20 px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mb-10"
        >
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#D2E823] to-white">
              My Dashboard
            </h1>
            <p className="text-white/80 text-lg">
              Welcome,{" "}
              <span className="text-[#D2E823] font-semibold">{username}</span>
            </p>
          </div>

          <Link href="/generate">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D2E823" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D2E823] text-black font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg mt-4 md:mt-0"
            >
              + Create New Link
            </motion.button>
          </Link>
        </motion.div>

        {/* Loader */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center mt-20"
          >
            <div className="w-10 h-10 border-4 border-[#D2E823] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-white/80">Loading your links...</p>
          </motion.div>
        ) : links.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-white/80 text-center mt-10"
          >
            No links yet. Click{" "}
            <span className="text-[#D2E823] font-semibold">
              “Create New Link”
            </span>{" "}
            to get started!
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#D2E823]">
              Your Links
            </h2>

            <AnimatePresence>
              {links.map((l, i) => (
                <motion.div
                  key={l._id || i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-4 mb-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 flex justify-between items-center transition-all duration-300 hover:scale-[1.01]"
                >
                  <div>
                    <p className="font-semibold text-[#D2E823]">
                      @{l.handle || username}
                    </p>
                    <p className="font-medium text-white/90">
                      {l.linktext || "Link Title"}
                    </p>
                  </div>
                  <a
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-200 hover:text-blue-100 transition-colors"
                  >
                    Visit
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  );
}
