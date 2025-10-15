"use client";
import React from "react";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] min-h-screen text-white flex flex-col justify-center items-center py-32 px-6 relative overflow-hidden">
        {/* glowing effects */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#D2E823]/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8a4fff]/20 blur-3xl rounded-full animate-pulse"></div>

        <section className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: text content */}
          <div className="w-full md:w-[55%] flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#D2E823]">
              About Linkhub
            </h1>

            {/* Use a div wrapper instead of an outer <p> so we can have multiple <p> children */}
            <div className="text-lg text-white/90 leading-relaxed space-y-4">
              <p className="text-lg md:text-xl">
                Linkhub is your all-in-one bio link platform designed to help
                you share everything that defines you — effortlessly. Whether
                you’re a creator, brand, or professional, Linkhub brings your
                content, projects, and social presence together in one beautiful
                place.
              </p>

              <p className="text-lg md:text-xl text-white/80">
                Our mission is simple:{" "}
                <span className="text-[#D2E823] font-semibold">
                  empower digital creators
                </span>{" "}
                to own their online identity. With customizable pages,
                analytics, and integrations, Linkhub turns your followers into a
                true audience.
              </p>

              <p className="text-lg md:text-xl text-white/80">
                Now introducing{" "}
                <span className="text-[#D2E823] font-semibold">
                  Custom Themes
                </span>{" "}
                — tailor your page’s colors, layout, and vibe to match your
                personality or brand. Stand out from the crowd and make your
                Linkhub truly{" "}
                <span className="font-semibold text-white">yours.</span>
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="/generate"
                className="bg-[#D2E823] text-neutral-900 px-4 md:px-6 py-3 rounded-full font-bold hover:bg-[#c1da1f] transition-all active:scale-[0.97]"
              >
                Create Your Linkhub
              </a>
              <a
                href="/"
                className="border border-white/40 text-white px-4 md:px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all active:scale-[0.97]"
              >
                Back to Home
              </a>
            </div>
          </div>

          {/* Right: image or illustration */}
          <div className="w-full md:w-[40%] relative flex items-center justify-center">
            <div className="w-[80%] md:w-[70%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md">
              <Image
                src="/hero.png"
                alt="About Linkhub Illustration"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
