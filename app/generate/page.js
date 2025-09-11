import React from "react";
export default function page() {
  return (
    <section className="h-screen w-full flex">
      <div className="h-full w-[55%] flex flex-col items-center py-20 gap-8 bg-[#225ac0]">
        <div className="text-5xl text-center font-bold text-[#c2d816]">
          Create your Linktree
        </div>
        <div className="flex flex-col gap-4 w-[80%]">
          <div className="flex flex-col gap-3">
            <div className="step1 text-xl font-semibold text-start text-neutral-100">
              Step 1 : Claim a handle
            </div>
            <input
              type="text"
              className="bg-neutral-100 py-3 w-full text-neutral-800 rounded-2xl px-3"
              placeholder="Choose a handle"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="step1 text-xl font-semibold text-start text-neutral-100">
              Step 2 : Add Links
            </div>
           <div className="flex gap-3">
             <input
              type="text"
              className="bg-neutral-100 py-3 w-70 text-neutral-800 rounded-2xl px-3"
              placeholder="Enter a Link text"
            />

            <input
              type="text"
              className="bg-neutral-100 py-3 w-70 text-neutral-800 rounded-2xl px-3"
              placeholder="Enter a Link"
            />
            <button className="w-70 cursor-pointer hover:bg-white hover:text-[#ff6c03] active:bg-white active:text-[#ff6c03] active:scale-[0.96] transition-all  text-white py-2 px-1 font-bold bg-[#ff6c03] rounded-2xl">
            Add Link
          </button>
           </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="step1 text-xl font-semibold text-start text-neutral-100">
            Step 3 : Add Picture and Finalize
          </div>
          <input
              type="text"
              className="bg-neutral-100 py-3 w-full text-neutral-800 rounded-2xl px-3"
              placeholder="Enter a Link to your picture"
            />
          </div>
          <button className="w-full cursor-pointer hover:bg-white active:bg-white active:text-[#ff6c03] hover:text-[#ff6c03] active:scale-[0.96] transition-all  text-white py-3 px-1 font-bold bg-[#ff6c03] rounded-2xl">
            Create your Linktree
          </button>
        </div>
      </div>
      <div className="h-full w-[45%] relative overflow-hidden bg-[url(/loginpic.webp)] bg-cover  bg-center"></div>
    </section>
  );
}
