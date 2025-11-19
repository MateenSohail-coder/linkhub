"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import InteractiveLoader from "../components/intractiveloader";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message,
          website_name: "Linkhub",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent:", res.text);
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />
      {loading && <InteractiveLoader />}

      <ToastContainer />
      <section className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white relative overflow-hidden">
        {/* Decorative Glow Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#D2E823]/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8a4fff]/30 blur-3xl rounded-full animate-pulse"></div>

        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[55%] flex flex-col justify-center items-center px-8 md:px-16 py-28 pt-30"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#D2E823] drop-shadow-[0_0_12px_rgba(210,232,35,0.6)]">
            Contact Us
          </h1>
          <p className="text-white/80 text-center max-w-md mb-10">
            Have questions, suggestions, or just want to say hi? Send us a
            message and we'll get back to you as soon as possible.
          </p>

          <motion.form
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-6 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            {/* Name & Email */}
            {[
              {
                placeholder: "Your Name",
                value: name,
                setter: setName,
                type: "text",
              },
              {
                placeholder: "Your Email",
                value: email,
                setter: setEmail,
                type: "email",
              },
            ].map((input, i) => (
              <motion.div
                key={i}
                variants={inputVariant}
                className="relative w-full"
              >
                <input
                  type={input.type}
                  value={input.value}
                  onChange={(e) => input.setter(e.target.value)}
                  required
                  placeholder={input.placeholder}
                  className="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-[#D2E823]/50 placeholder-gray-500 shadow-md transition-all"
                />
              </motion.div>
            ))}

            {/* Message */}
            <motion.div variants={inputVariant} className="relative w-full">
              <textarea
                rows={5}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-4 rounded-xl bg-white/90 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-[#D2E823]/50 placeholder-gray-500 resize-none shadow-md transition-all"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #D2E823" }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                loading
                  ? "bg-white text-[#225ac0] cursor-not-allowed"
                  : "bg-[#D2E823] text-[#1a2a6c] hover:bg-white hover:text-[#225ac0]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Right: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex w-[45%] relative rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="/poster3.png"
            alt="Contact Illustration"
            fill
            className="object-cover brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/80 to-transparent"></div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
