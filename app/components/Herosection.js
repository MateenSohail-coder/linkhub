import Image from "next/image";
import Navbar from "./Navbar.js";
export default function Heroection() {
  return (
    <>
            <Navbar />

      <div className="bg-[#254f1a] h-[200vh] md:h-[120vh] pt-25 py-15">
        <section className="md:px-15 px-6 flex flex-col md:flex-row md:justify-between justify-center items-center h-full">
          {/* Left side */}
          <div className="w-full md:w-[40%] h-[90vh] md:h-full flex flex-col gap-12 justify-start md:justify-center">
            <div className="heading text-5xl md:text-7xl font-extrabold text-[#D2E823]">
              Everything you are. In one, simple link in bio.
            </div>
            <div className="des text-xl text-white">
              Join 70M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                className="h-14 w-50 p-1 px-1.5 text-sm text-neutral-600 font-semibold bg-white rounded"
                value="Linktr.ee/"
              />
              <button className="px-4 py-2 md:py-4 font-bold text-sm text-neutral-800 bg-[#e9c0e9] rounded-full">
                Claim your Linktree
              </button>
            </div>
          </div>
          {/* Right side */}
          <div className="md:w-[50%] w-screen h-[80vh] md:h-full relative flex items-center justify-center">
            <div className="w-[60%] md:w-[50%] rounded-2xl overflow-hidden h-[80%] relative">
              <Image src="/card3.png" fill alt="image" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
