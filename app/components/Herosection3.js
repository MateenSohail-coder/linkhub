import React from "react";
import Image from "next/image";
export default function Herosection3() {
  return (
    <section className="md:px-15 px-6 flex flex-col h-[200vh] md:h-screen bg-[#780016] w-full md:flex-row md:justify-between justify-center items-center">
      {/* Right side */}

      {/* Left side */}
      <div className="w-full md:w-[40%] h-[90vh] md:h-full flex flex-col gap-12 justify-start md:justify-center">
        <div className="heading text-5xl md:text-6xl font-extrabold text-[#e9c0e9]">
          Everything you are. In one, simple link in bio.
        </div>
        <div className="des text-xl text-white">
          Join 70M+ people using Linktree for their link in bio. One link to
          help you share everything you create, curate and sell from your
          Instagram, TikTok, Twitter, YouTube and other social media profiles.
        </div>
        <div>
          <button className="text-neutral-800 px-4 py-2 md:py-4 font-bold text-1xl bg-[#e9c0e9] rounded-full">
            Get Started for free
          </button>
        </div>
      </div>
      <div className="md:w-[50%] w-screen h-[80vh] md:h-full relative flex items-center justify-center">
        <div className="w-[60%] md:w-[50%] rounded-2xl overflow-hidden h-[80%] relative">
          <Image src="/card.png" fill alt="image" />
        </div>
      </div>
    </section>
  );
}
