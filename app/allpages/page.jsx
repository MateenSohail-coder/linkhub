"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArrowLeftbt from "../components/backarrowbt";
import ProfileImage from "../components/portfolioimg";
import { Eye } from "lucide-react";
import Footer from "../components/Footer";

export default function AllPages() {
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPages, setFilteredPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ track login

  // ✅ Check login status once
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Fetch all pages
  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getpages");
        const data = await res.json();
        setPages(data.pages || []);
        setFilteredPages(data.pages || []);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  // ✅ Search functionality
  useEffect(() => {
    const searchLower = search.toLowerCase();
    setFilteredPages(
      pages.filter(
        (p) =>
          p.handle?.toLowerCase().includes(searchLower) ||
          p.link?.toLowerCase().includes(searchLower)
      )
    );
  }, [search, pages]);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8] py-12 px-6 md:px-10 text-white">
        <div className="flex gap-3">
          <ArrowLeftbt />
          {/* ✅ Show only when logged in */}
          {isLoggedIn && (
            <ArrowLeftbt text="Back to Dashboard" href="/dashboard" />
          )}
        </div>

        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-5xl font-extrabold text-[#D2E823] mb-3">
            Explore Linkhub Creators
          </h1>
          <p className="text-white/80 text-lg">
            Discover all Linkhub pages — connect, explore, and get inspired.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-3xl mx-auto mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by username or URL..."
            className="w-full bg-white/90 text-gray-800 py-3 px-5 rounded-2xl border border-white/20 shadow-md focus:ring-4 focus:ring-[#D2E823]/50 focus:outline-none placeholder-gray-600"
          />
        </div>

        {/* ✅ Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-4 border-[#D2E823] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-white/90">Loading pages...</p>
          </div>
        ) : (
          // ✅ Cards Grid
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.length > 0 ? (
              filteredPages.map((page, i) => (
                <div
                  key={i}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-lg rounded-3xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300"
                >
                  {/* Avatar */}
                  <ProfileImage pic={page.pic} handle={page.handle} />

                  {/* Handle */}
                  <h2 className="text-2xl font-bold text-[#D2E823]">
                    @{page.handle}
                  </h2>

                  {/* Link */}
                  <a
                    href={page.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-100 mt-1 text-sm break-all transition-colors"
                  >
                    {page.link}
                  </a>

                  {/* Date */}
                  <p className="text-sm text-gray-200/80 mt-2">
                    Created on:{" "}
                    {page.createdAt
                      ? new Date(page.createdAt).toLocaleDateString()
                      : "—"}
                  </p>

                  {/* ✨ Preview Button */}
                  <a
                    href={`/preview/${page.handle}`}
                    className="mt-4 inline-flex items-center gap-2 bg-[#D2E823] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e7f36c] transition-all shadow-md hover:shadow-lg"
                  >
                    <Eye size={18} />
                    <span>View This Page</span>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-white/80 col-span-full">
                No pages found.
              </p>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
