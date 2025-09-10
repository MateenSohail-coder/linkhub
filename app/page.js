import Image from "next/image";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import Herosection2 from "./components/Herosection2";
import Herosection3 from "./components/Herosection3";
export default function Home() {
  return (
    <>
    <Herosection />
   <Herosection2 />
   <Herosection3 />
       <section className="md:px-15 px-6 flex flex-col-reverse h-[200vh] md:h-screen bg-[#e8efd6] w-full md:flex-row md:justify-between justify-center items-center">
         {/* Right side */}
         <div className="md:w-[50%] w-screen h-[80vh] md:h-full relative flex items-center justify-center">
           <div className="w-full rounded-2xl overflow-hidden h-[80%] relative">
             <Image src="/grap.avif" fill alt="image" />
           </div>
         </div>
         {/* Left side */}
         <div className="w-full md:w-[40%] h-[90vh] md:h-full flex flex-col gap-12 justify-start md:justify-center">
           <div className="heading text-5xl md:text-6xl font-extrabold text-[#1e2330]">
             Everything you are. In one, simple link in bio.
           </div>
           <div className="des text-xl text-neutral-800">
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
       </section>
    </>
  );
}
