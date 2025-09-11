import React from "react";
import Image from "next/image";

export default function Herosection2() {
  return (
    <section className="md:px-15 px-6 flex flex-col-reverse h-[200vh] md:h-screen bg-[#e9c0e9] w-full md:flex-row md:justify-between justify-center items-center">
      {/* Right side */}
      <div className="md:w-[50%] w-screen h-[80vh] md:h-full relative flex items-center justify-center">
        <div className="w-[60%] md:w-[50%] rounded-2xl overflow-hidden h-[80%] relative">
          <Image src="/card2.png" fill alt="image" />
        </div>
      </div>
      {/* Left side */}
      <div className="w-full md:w-[40%] h-[90vh] md:h-full flex flex-col gap-12 justify-start md:justify-center">
        <div className="heading text-5xl md:text-6xl font-extrabold text-[#502274]">
          Create and customize your Linktree in minutes
        </div>
        <div className="des text-xl text-white">
  Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
        </div>
        <div>
          <button className="text-white px-4 py-2 md:py-4 font-bold text-1xl bg-[#502274] rounded-full">
            Get Started for free
          </button>
        </div>
      </div>
    </section>
  );
}
