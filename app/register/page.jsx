"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowLeftbt from "../components/backarrowbt";
import Link from "next/link";
import InteractiveLoader from "../components/intractiveloader";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json(); // Try to parse JSON
      } catch (err) {
        console.error("Failed to parse JSON response:", err);
        data = null; // Fallback if response is empty or invalid
      }

      if (res.ok) {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const errorMessage = data?.message || "Something went wrong!";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Server error:", error);
      toast.error("Server error. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white">
      {loading && <InteractiveLoader />}
      <ToastContainer />
      <div className="absolute w-100 px-4 py-4">
        <ArrowLeftbt />
      </div>
      {/* Left Section: Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[55%] flex flex-col justify-center items-center px-8 md:px-16 py-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-[#D2E823] drop-shadow-[0_0_12px_rgba(210,232,35,0.6)]">
          Join LinkHub
        </h1>
        <p className="text-white/80 text-center max-w-md mb-10">
          Create your account and start building your personalized link page —
          connect all your content in one place!
        </p>

        <div className="flex flex-col gap-4 w-full max-w-md bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-lg shadow-lg">
          <input
            className="p-3 rounded-lg text-gray-900 bg-white/90 font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="p-3 rounded-lg text-gray-900 bg-white/90 font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="p-3 rounded-lg text-gray-900 bg-white/90 font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition-all ${
              loading
                ? "bg-white text-[#225ac0] cursor-not-allowed"
                : "bg-[#D2E823] text-[#1a2a6c] hover:bg-white hover:text-[#225ac0] active:scale-95"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        <p className="mt-6 text-sm text-white/80">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#D2E823] hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.div>

      {/* Right Section: Illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden md:block w-[45%] relative bg-[url(/poster.png)] bg-cover bg-center brightness-[0.85]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a6c]/80 to-transparent"></div>
      </motion.div>
    </section>
  );
}
