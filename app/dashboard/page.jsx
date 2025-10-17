"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import jwt from "jsonwebtoken";
import { LaptopMinimalCheck } from "lucide-react";
import { PencilIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { ClipboardCopy, Check } from "lucide-react";

export default function Dashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ handle: "", links: [] });
  const [updating, setUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // ID of the page to delete
  const [showConfirm, setShowConfirm] = useState(false); // show/hide modal
  const [modalMessage, setModalMessage] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // revert after 1s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // for AM/PM
    };

    return date.toLocaleString("en-US", options);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const decoded = jwt.decode(token);

      if (!decoded) {
        console.error("Token could not be decoded");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const email = decoded.email;
      if (email) {
        // 🧠 Extract the part before "@"
        let namePart = email.split("@")[0];

        // ✨ Replace dots, underscores, and hyphens with spaces
        namePart = namePart.replace(/[._-]+/g, " ");

        // ✂️ Split into words and take only the first two
        const words = namePart.split(" ").filter(Boolean).slice(0, 2);

        // 💅 Capitalize each word and join with a space
        const username = words
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        setUsername(username);
      } else {
        console.warn("No email found in token payload");
      }

      fetchPages();
    } catch (err) {
      console.error("Failed to decode token:", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  // Updated to be used after a successful update
  const fetchPages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/my-links", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : { success: false };

      if (data.success) setPages(data.links || []);
      else console.warn("Failed to fetch pages:", data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePage = (id) => {
    setDeleteId(id);
    setShowConfirm(true); // open modal
  };
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/my-links/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : { success: false };

      if (data.success) {
        setPages(pages.filter((p) => p._id !== deleteId));
        setModalMessage("Page deleted successfully");
      } else {
        setModalMessage(data.message || "Failed to delete page ❌");
      }
    } catch (err) {
      console.error(err);
      setModalMessage("Failed to delete page ❌");
    } finally {
      setDeleteId(null);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/my-links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : { success: false };

      if (data.success) {
        setEditId(id);
        // Ensure links is an array for mapping
        setEditForm({ handle: data.link.handle, links: data.link.links || [] });
      } else {
        alert(data.message || "Failed to fetch page data");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch page data");
    }
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...editForm.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setEditForm({ ...editForm, links: newLinks });
  };

  const handleAddLink = () => {
    setEditForm((prev) => ({
      ...prev,
      links: [...prev.links, { linktext: "", link: "" }],
    }));
  };

  const handleRemoveLink = (index) => {
    setEditForm((prev) => ({
      ...prev,
      links: prev.links.filter((_, idx) => idx !== index),
    }));
  };

  const handleEditSave = async (id) => {
    // Validation checks
    if (!editForm.handle) {
      setMessage("Handle cannot be empty");
      setMessageType("error");
      return;
    }

    const hasEmptyLink = editForm.links.some(
      (link) => !link.linktext || !link.link
    );
    if (hasEmptyLink) {
      setMessage("All link titles and URLs must be filled out");
      setMessageType("error");
      return;
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/my-links/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : { success: false };

      if (data.success) {
        await fetchPages();
        setEditId(null);
        setMessage("Page updated successfully");
        setMessageType("success");
      } else {
        setMessage(data.message || "Failed to update page");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update page");
      setMessageType("error");
    } finally {
      setUpdating(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#225ac0] to-[#8a4fff] text-white flex flex-col items-center pt-32 pb-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mb-10">
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
              className="flex items-center cursor-pointer space-x-2 bg-[#D2E823] text-black font-bold py-3 px-6 rounded-full transition-all duration-200 shadow-lg mt-4 md:mt-0"
            >
              {/* Plus Icon SVG for "Create" */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create New Link</span>
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-10 h-10 border-4 border-[#D2E823] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-white/80">Loading your pages...</p>
          </div>
        ) : pages.length === 0 ? (
          <p className="text-lg text-white/80 text-center mt-10">
            No pages yet. Click{" "}
            <span className="text-[#D2E823] font-semibold">
              “Create New Link”
            </span>{" "}
            to get started!
          </p>
        ) : (
          <div className="w-full max-w-3xl bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-6 text-[#D2E823]">
              Your Pages
            </h2>

            <AnimatePresence>
              {pages.map((p, i) => (
                <motion.div
                  key={p._id || i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="p-4 mb-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.01]"
                >
                  {editId === p._id ? (
                    // --- Edit Form (Improved Styling) ---
                    <div className="flex flex-col gap-4 w-full p-2 bg-white/5 rounded-lg">
                      <h3 className="text-xl font-bold text-[#D2E823]">
                        Editing: @{editForm.handle}
                      </h3>
                      <label className="text-white/80 font-medium">
                        Handle:
                        <input
                          type="text"
                          className="w-full px-4 py-3 mt-2 rounded-lg bg-gray-900/80 text-white border border-gray-700 placeholder-gray-400 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D2E823] focus:border-transparent transition-all duration-150"
                          value={editForm.handle}
                          onChange={(e) =>
                            setEditForm({ ...editForm, handle: e.target.value })
                          }
                          placeholder="Your handle (e.g., myprofile)"
                        />
                      </label>

                      <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-medium text-white/90 border-b border-white/20 pb-1">
                          Links
                        </h4>
                        <AnimatePresence>
                          {editForm.links.map((linkItem, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col sm:flex-row gap-2 bg-white/10 p-3 rounded-lg"
                            >
                              <input
                                type="text"
                                className="flex-1 px-4 py-3 rounded-lg text-white bg-gray-900/80 border border-gray-700 placeholder-gray-400 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                value={linkItem.linktext || ""}
                                onChange={(e) =>
                                  handleLinkChange(
                                    idx,
                                    "linktext",
                                    e.target.value
                                  )
                                }
                                placeholder="Link Title"
                              />

                              <input
                                type="url"
                                className="flex-1 px-4 py-3 rounded-lg text-white bg-gray-900/80 border border-gray-700 placeholder-gray-400 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                value={linkItem.link || ""}
                                onChange={(e) =>
                                  handleLinkChange(idx, "link", e.target.value)
                                }
                                placeholder="Link URL (e.g., https://example.com)"
                              />
                              <button
                                onClick={() => handleRemoveLink(idx)}
                                className="px-3 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition w-full sm:w-auto"
                              >
                                Remove
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={handleAddLink}
                        className="w-full py-2 cursor-pointer bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition font-medium mt-1"
                      >
                        + Add New Link
                      </button>

                      <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEditSave(p._id)}
                          disabled={updating}
                          className="px-6 py-2 bg-[#D2E823] cursor-pointer text-black font-bold rounded-lg shadow-xl hover:bg-[#c1da1f] transition disabled:opacity-50 flex-1"
                        >
                          {updating ? "Saving..." : "Save"}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setEditId(null)}
                          className="px-6 py-2 cursor-pointer bg-gray-500 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition flex-1"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    // --- View Mode ---
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold font-mono text-2xl text-[#D2E823]">
                        @{p.handle || username}
                      </p>
                      <p className="text-sm flex items-center gap-2  w-full text-[#D2E823]/80">
                        <p className="underline">{p.link}</p>
                        <button
                          onClick={copyToClipboard}
                          className="cursor-pointer p-2 rounded-full bg-gray-100 transition"
                          aria-label="Copy to clipboard"
                        >
                          {copied ? (
                            <div className="flex gap-2 items-center">
                              {" "}
                              <Check className="text-green-500 w-5 h-5" />
                              <p className="text-green-700 font-bold flex items-center gap-1">
                                Copy{" "}
                                <p className="hidden md:block">To Clipboard!</p>
                              </p>
                            </div>
                          ) : (
                            <ClipboardCopy className="text-blue-700 w-5 h-5" />
                          )}
                        </button>
                      </p>
                      <p className="text-sm text-white">
                        {formatDateTime(p.createdAt) || username}
                      </p>
                      {/* Only show link details in edit mode, as requested */}
                      <div className="flex gap-2 mt-2">
                        <Link
                          href={`/${p.handle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex flex-col md:flex-row items-center justify-center md:space-x-2 space-y-1 md:space-y-0 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out transform hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full md:w-auto"
                          >
                            {/* SVG Icon for External Link */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            <span className="text-center gap-1 hidden sm:flex items-center justify-center text-sm md:text-base">
                              View <p>Public Page</p>
                            </span>
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditClick(p._id)}
                          className="flex items-center justify-center cursor-pointer space-x-1.5 px-3 md:px-3 py-1 bg-slate-500 text-white font-medium rounded-md shadow-sm hover:bg-slate-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                        >
                          {/* Pencil Icon SVG for Editing */}
                          <p>
                            <PencilIcon className="w-6 h-6" />
                          </p>
                          <span className="hidden md:block">Edit</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeletePage(p._id)}
                          className="flex items-center justify-center cursor-pointer space-x-1.5 px-3 md:px-3 py-1 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          {/* Trash Can Icon SVG for Deletion */}
                          <p>
                            <Trash2Icon className="w-6 h-6" />
                          </p>
                          <span className="hidden md:block">Delete</span>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this page?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-100"
            >
              {!modalMessage ? (
                <>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Confirm Delete
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Are you sure you want to delete this page? This action
                    cannot be undone.
                  </p>

                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConfirmDelete}
                      className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      Delete
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowConfirm(false)}
                      className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-full font-semibold shadow-md hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-center mb-5 font-semibold text-gray-800">
                    {modalMessage}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setModalMessage("");
                      setShowConfirm(false);
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Close
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {message && (
        <div
          style={{
            backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
            color: messageType === "success" ? "#155724" : "#721c24",
            border: `1px solid ${
              messageType === "success" ? "#c3e6cb" : "#f5c6cb"
            }`,
            padding: "10px",
          }}
          className="fixed top-0 w-full z-50 flex items-center justify-center gap-3 text-center"
        >
          <LaptopMinimalCheck size={40} color="#0b8413" strokeWidth={1.25} />{" "}
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
