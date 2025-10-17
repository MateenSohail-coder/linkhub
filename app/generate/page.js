"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, PlusCircle, ArrowBigLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatePresence, Motion } from "framer-motion";
import { CheckCircle, ClipboardCopy, ClipboardCheck, X } from "lucide-react";
import InteractiveLoader from "../components/intractiveloader";
import ProfileImage from "../components/portfolioimg";

// ✅ Separate component wrapped by Suspense
function GenerateInner() {
  const searchparams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchparams.get("handle") || "");
  const [handleError, setHandleError] = useState("");
  const [pic, setPic] = useState("");
  const [des, setDes] = useState("");
  const [theme, setTheme] = useState("blue");
  const [imgError, setImgError] = useState(false);
  const [validPic, setValidPic] = useState(pic);
  const [pageloader, setpageloader] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const [createdHandle, setCreatedHandle] = useState("");
  const [copied, setCopied] = useState(false);

  // ✅ Validate image URL
  useEffect(() => {
    if (!pic) {
      setValidPic(null);
      setImgError(true);
      return;
    }

    const img = new window.Image();
    img.src = pic;
    img.onload = () => {
      setValidPic(pic);
      setImgError(false);
    };
    img.onerror = () => {
      setValidPic(null);
      setImgError(true);
    };
  }, [pic]);

  const themes = {
    blue: {
      bg: "from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8]",
      accent: "#D2E823",
      button: "bg-[#D2E823] text-[#1a2a6c] hover:bg-white hover:text-[#225ac0]",
    },
    purple: {
      bg: "from-[#3b0764] via-[#6d28d9] to-[#9333ea]",
      accent: "#D2E823",
      button: "bg-[#D2E823] text-[#3b0764] hover:bg-white hover:text-[#6d28d9]",
    },
    green: {
      bg: "from-[#064e3b] via-[#047857] to-[#059669]",
      accent: "#D2E823",
      button: "bg-[#D2E823] text-[#064e3b] hover:bg-white hover:text-[#059669]",
    },
    orange: {
      bg: "from-[#7c2d12] via-[#c2410c] to-[#f97316]",
      accent: "#D2E823",
      button: "bg-[#D2E823] text-[#7c2d12] hover:bg-white hover:text-[#f97316]",
    },
    blackGreen: {
      bg: "from-[#000000] via-[#064e3b] to-[#059669]",
      accent: "#D2E823",
      button: "bg-[#D2E823] text-[#000000] hover:bg-white hover:text-[#059669]",
    },
  };

  const currentTheme = themes[theme] || themes.blue;

  const handleChange = (index, field, value) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addLink = () =>
    setLinks((prev) => [...prev, { link: "", linktext: "" }]);
  const deleteLink = (index) =>
    setLinks((prev) => prev.filter((_, i) => i !== index));

  const handleHandleChange = (value) => {
    if (/\s/.test(value)) {
      setHandleError("Handle cannot contain spaces! Use '_' or '-' instead.");
    } else {
      setHandleError("");
    }
    setHandle(value);
  };

  const submitLinks = async () => {
    if (links.some((item) => !item.link || !item.linktext)) {
      toast.error("Please fill out all link fields!");
      return;
    }
    if (!handle.trim()) {
      toast.error("Please enter a handle!");
      return;
    }
    if (handleError) {
      toast.error(handleError);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must log in to create your LinkHub!");
      return;
    }

    setLoading(true);
    setpageloader(true);

    try {
      const fullLink = `${window.location.origin}/${handle}`;
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          links,
          handle,
          pic,
          des,
          theme,
          link: fullLink,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Show success modal
        setCreatedLink(result.link);
        setCreatedHandle(handle);
        setSuccessModal(true);
        setCopied(false);

        // Reset form
        setLinks([{ link: "", linktext: "" }]);
        setHandle("");
        setPic("");
        setDes("");
        setTheme("blue");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setpageloader(false);
    }
  };

  return (
    <>
      {pageloader && <InteractiveLoader />}
      <section
        className={`min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br ${currentTheme.bg} text-white`}
      >
        <ToastContainer />

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="absolute top-6 left-6 text-white/80 hover:text-white transition border border-white/20 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-2"
        >
          <ArrowBigLeft />
        </Link>

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[60%] flex flex-col items-center py-12 px-6 md:px-12 overflow-y-auto"
        >
          <h1
            className="text-4xl md:text-5xl font-extrabold text-center mb-8"
            style={{ color: currentTheme.accent }}
          >
            Create Your LinkHub
          </h1>

          <div className="flex flex-col gap-8 w-full max-w-2xl">
            {/* Step 1 — Handle */}
            <div className="flex flex-col gap-1 bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-lg">
              <h2
                className="text-xl font-semibold"
                style={{ color: currentTheme.accent }}
              >
                Step 1: Claim a Handle
              </h2>
              <input
                value={handle}
                onChange={(e) => handleHandleChange(e.target.value)}
                type="text"
                className={`bg-white/90 text-gray-900 py-3 px-4 rounded-xl font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none ${
                  handleError ? "border border-red-500" : ""
                }`}
                placeholder="Choose your unique handle"
              />
              {handleError && (
                <p className="text-red-500 text-sm">{handleError}</p>
              )}
            </div>

            {/* Step 2 — Add Links */}
            <div className="flex flex-col gap-4 bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-lg">
              <h2
                className="text-xl font-semibold"
                style={{ color: currentTheme.accent }}
              >
                Step 2: Add Links
              </h2>

              {links.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-3 items-center bg-white/10 p-4 rounded-xl border border-white/20"
                >
                  <input
                    value={item.linktext}
                    onChange={(e) =>
                      handleChange(index, "linktext", e.target.value)
                    }
                    type="text"
                    placeholder="Link title (e.g. My Instagram)"
                    className="flex-1 bg-white/90 text-gray-900 py-2.5 px-4 rounded-lg font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
                  />
                  <input
                    value={item.link}
                    onChange={(e) =>
                      handleChange(index, "link", e.target.value)
                    }
                    type="text"
                    placeholder="Enter full URL (https://...)"
                    className="flex-1 bg-white/90 text-gray-900 py-2.5 px-4 rounded-lg font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
                  />
                  {links.length > 1 && (
                    <button
                      onClick={() => deleteLink(index)}
                      className="text-red-400 hover:text-red-600 p-2 transition-all"
                    >
                      <Trash2 size={22} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addLink}
                className={`flex items-center justify-center gap-2 ${currentTheme.button} font-bold py-3 rounded-xl transition-all active:scale-95`}
              >
                <PlusCircle size={20} /> Add Another Link
              </button>
            </div>

            {/* Step 3 — Picture, Description & Theme */}
            {/* Step 3 — Picture, Description & Theme */}
            <div className="flex flex-col gap-3 bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-lg">
              <h2
                className="text-xl font-semibold"
                style={{ color: currentTheme.accent }}
              >
                Step 3: Add Picture, Description & Theme
              </h2>

              {/* Image URL input */}
              <input
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                type="text"
                placeholder="Paste your profile picture URL"
                className="bg-white/90 text-gray-900 py-3 px-4 rounded-xl font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
              />

              {/* OR upload from computer */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer bg-white/10 text-white/80 hover:bg-white/20 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 w-fit transition"
                >
                  <PlusCircle size={18} />
                  Upload from Computer
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setPic(reader.result); // Base64 string
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              {/* Show preview */}
              {pic && <ProfileImage pic={pic} handle="preview" />}

              {/* Description input */}
              <input
                value={des}
                onChange={(e) => setDes(e.target.value)}
                type="text"
                placeholder="Write a short description"
                className="bg-white/90 text-gray-900 py-3 px-4 rounded-xl font-medium focus:ring-4 focus:ring-[#D2E823]/50 outline-none"
              />

              {/* Theme selection */}
              <div className="flex flex-wrap gap-3 mt-3">
                {Object.keys(themes).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 rounded-xl font-semibold border-2 ${
                      theme === t
                        ? "border-[#D2E823] bg-white/20"
                        : "border-transparent bg-white/5 hover:bg-white/10"
                    } transition-all`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={submitLinks}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                loading
                  ? "bg-white text-[#1a2a6c] cursor-not-allowed"
                  : `${currentTheme.button} active:scale-95`
              }`}
            >
              {loading ? "Creating..." : "Create Your LinkHub"}
            </button>
          </div>
        </motion.div>

        {/* RIGHT — Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`hidden md:flex w-[40%] flex-col items-center justify-center bg-gradient-to-b ${currentTheme.bg} px-6 py-12`}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-extrabold mb-8 tracking-wide"
            style={{ color: currentTheme.accent }}
          >
            Live Preview
          </motion.h2>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center gap-6"
          >
            {/* Profile Image */}
            <ProfileImage pic={validPic} handle="preview" />

            <div>
              <h2 className="text-2xl font-bold text-[#D2E823]">
                @{handle || "yourname"}
              </h2>
              {des && <p className="text-gray-300 text-sm mt-2">{des}</p>}
            </div>

            <div className="w-full flex flex-col gap-3">
              {links.map((link, index) => (
                <div
                  key={index}
                  className={`py-2 rounded-xl ${currentTheme.button} text-center transition-transform hover:scale-105`}
                >
                  {link.linktext || "Link Title"}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
      <AnimatePresence>
        {successModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-2xl p-6 md:p-8 max-w-sm w-[90%] shadow-2xl border border-blue-100"
            >
              {/* ❌ Close Button */}
              <button
                onClick={() => setSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ✅ Success Icon */}
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />

              {/* ✨ Heading */}
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                LinkHub Created!
              </h2>
              <p className="text-gray-600 mb-4">
                Your unique handle{" "}
                <span className="font-semibold text-blue-600">
                  @{createdHandle}
                </span>{" "}
                has been generated.
              </p>

              {/* 🔗 Link Box */}
              <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center justify-between">
                <a
                  href={createdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold truncate"
                >
                  {createdLink}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(createdLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  {copied ? (
                    <ClipboardCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <ClipboardCopy className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* 🎯 Action Buttons */}
              <div className="flex justify-center gap-3 mt-6">
                <a
                  href={createdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-[#D2E823] text-neutral-900 rounded-full font-semibold hover:bg-[#c1da1f] transition"
                >
                  View Page
                </a>
                <button
                  onClick={() => setSuccessModal(false)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ✅ Export wrapped with Suspense
export default function GeneratePage() {
  return (
    <Suspense
      fallback={<div className="text-center p-10 text-white">Loading...</div>}
    >
      <GenerateInner />
    </Suspense>
  );
}
