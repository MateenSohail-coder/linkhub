"use client";
import { ToastContainer, toast, Bounce } from "react-toastify";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function page() {
  const searchparams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchparams.get("handle"));
  const [pic, setpic] = useState("");
  const [des, setdes] = useState("");
  const handleChange = (index, field, value) => {
    setlinks((prevLinks) =>
      prevLinks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  const hasEmptyFields = links.some(
  (item) => item.link.trim() === "" || item.linktext.trim() === ""
);

  const addlink = () => {
    setlinks((prev) => [...prev, { link: "", linktext: "" }]);
  };

  const submitlinks = async () => {
    if (hasEmptyFields) {
  toast.error("Please fill out all Link Fields !",{
    autoClose: 2000,
    hideProgressBar: true,
  })
}
  else{
      setLoading(true);
    let result = null; // <-- define here
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        links: links,
        handle: handle,
        pic: pic,
        des: des,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const r = await fetch("http://localhost:3000/api/add", requestOptions);
      result = await r.json();
    } catch (error) {
      console.error(error); // <-- use 'error', not 'err'
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      console.log("Result object:", result);

      if (result && result.message) {
        console.log(
          "result.success:",
          result.success,
          "Type:",
          typeof result.success
        );

        if (result.success) {
          toast.success(
            <div>
              {result.message}
              <br />
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 active:text-blue-950 underline"
              >
                {result.link}
              </a>
            </div>,
            {
              autoClose: 2500,
            }
          );
        } else {
          toast.error(
            <div>
              {result.message}
              <br />
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 active:text-red-700 underline"
              >
                {result.link}
              </a>
            </div>,
            {
              autoClose: 2500,
            }
          );
        }

        setlinks([{ link: "", linktext: "" }]);
        sethandle("");
        setpic("");
        setdes("");
      }
    }
  }
  };

  return (
    <section className="h-screen w-full flex">
      <ToastContainer />
      <div
        id="form"
        className="h-full w-[55%] flex flex-col items-center py-20 gap-8 overflow-y-scroll bg-[#225ac0]"
      >
        <div className="text-5xl text-center font-bold text-[#c2d816]">
          Create your Linktree
        </div>
        <div className="flex flex-col gap-4 w-[80%]">
          <div className="flex flex-col gap-3">
            <div className="step1 text-xl font-semibold text-start text-neutral-100">
              Step 1 : Claim a handle
            </div>
            <input
              value={handle || ""}
              onChange={(e) => {
                sethandle(e.target.value);
              }}
              type="text"
              className="bg-neutral-100 py-3 w-full text-neutral-800 rounded-2xl px-3"
              placeholder="Choose a handle"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="step1 text-xl font-semibold text-start text-neutral-100">
              Step 2 : Add Links
            </div>
            {links &&
              links.map((item, index) => {
                return (
                  <div key={index} className="flex gap-3">
                    <input
                      value={item.linktext}
                      onChange={(e) =>
                        handleChange(index, "linktext", e.target.value)
                      }
                      type="text"
                      className="bg-neutral-100 py-3 w-70 text-neutral-800 rounded-2xl px-3"
                      placeholder="Enter a Link text"
                    />

                    <input
                      value={item.link}
                      onChange={(e) =>
                        handleChange(index, "link", e.target.value)
                      }
                      type="text"
                      className="bg-neutral-100 py-3 w-70 text-neutral-800 rounded-2xl px-3"
                      placeholder="Enter a Link"
                    />
                  </div>
                );
              })}
            <button
              onClick={() => {
                addlink();
              }}
              className="w-70 cursor-pointer hover:bg-white hover:text-[#ff6c03] active:bg-white active:text-[#ff6c03] active:scale-[0.96] transition-all  text-white py-2 px-1 font-bold bg-[#ff6c03] rounded-2xl"
            >
              + Add Links
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="step1 text-xl font-semibold text-start text-neutral-100">
              Step 3 : Add Picture and Description then Finalize
            </div>
            <input
              value={pic}
              onChange={(e) => {
                setpic(e.target.value);
              }}
              type="text"
              className="bg-neutral-100 py-3 w-full text-neutral-800 rounded-2xl px-3"
              placeholder="Enter a Link to your picture"
            />
            <input
              value={des}
              onChange={(e) => {
                setdes(e.target.value);
              }}
              type="text"
              className="bg-neutral-100 py-3 w-full text-neutral-800 rounded-2xl px-3"
              placeholder="Enter a Description of linktree"
            />
          </div>

          <button
            onClick={submitlinks}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-1 font-bold rounded-2xl transition-all active:scale-[0.96] ${
              loading
                ? "bg-white text-[#ff6c03] cursor-not-allowed"
                : "bg-[#ff6c03] text-white hover:bg-white hover:text-[#ff6c03] active:bg-white active:text-[#ff6c03]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-[#ff6c03]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create your Linktree"
            )}
          </button>
        </div>
      </div>
      <div className="h-full w-[45%] relative overflow-hidden bg-[url(/loginpic.webp)] bg-cover  bg-center"></div>
    </section>
  );
}
