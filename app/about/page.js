"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonHover = {
    hover: { scale: 1.05 },
    tap: { scale: 0.97 },
  };

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] min-h-screen text-white flex flex-col justify-center items-center py-32 px-6 relative overflow-hidden">
        {/* glowing effects */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#D2E823]/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8a4fff]/20 blur-3xl rounded-full animate-pulse"></div>

        <motion.section
          className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: text content */}
          <motion.div
            className="w-full md:w-[55%] flex flex-col gap-6"
            variants={fadeUp}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-[#D2E823]"
              variants={fadeUp}
            >
              About Linkhub
            </motion.h1>

            <motion.div
              className="text-lg text-white/90 leading-relaxed space-y-4"
              variants={fadeUp}
            >
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
            </motion.div>

            <motion.div className="flex gap-4 mt-6" variants={fadeUp}>
              <motion.a
                href="/generate"
                className="bg-[#D2E823] text-neutral-900 px-4 md:px-6 py-3 rounded-full font-bold"
                whileHover={buttonHover.hover}
                whileTap={buttonHover.tap}
              >
                Create Your Linkhub
              </motion.a>
              <motion.a
                href="/"
                className="border border-white/40 text-white px-4 md:px-6 py-3 rounded-full font-bold"
                whileHover={buttonHover.hover}
                whileTap={buttonHover.tap}
              >
                Back to Home
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            className="w-full md:w-[40%] relative flex items-center justify-center"
            variants={fadeUp}
          >
            <motion.div
              className="w-[80%] md:w-[70%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              }}
            >
              <Image
                src="/aboutpic.png"
                alt="About Linkhub Illustration"
                width={700}
                height={600}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
