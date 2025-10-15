import { ArrowBigLeft } from "lucide-react";
import React from "react";
import Link from "next/link";

const ArrowLeftbt = () => {
  return (
    <Link
      href="/"
      className=" cursor-pointer absolute top-6 left-6 text-white/80 hover:text-white transition border border-white/20 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-2"
    >
      <ArrowBigLeft />
      <p className="hidden md:block"> Back to Home</p>
    </Link>
  );
};

export default ArrowLeftbt;
