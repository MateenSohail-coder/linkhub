import { ArrowBigLeft } from "lucide-react";
import React from "react";
import Link from "next/link";
import { TrendingUpIcon } from "lucide-react";

const ArrowLeftbt = ({ text = "Back to Home", href = "/", hidden = true }) => {
  return (
    <Link
      href={href}
      className="cursor-pointer text-white/80 mb-5 hover:text-white transition border border-white/20 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-2 w-fit"
    >
      <ArrowBigLeft />
      <p className={`${hidden ? "hidden" : "block"} md:block`}>{text}</p>
    </Link>
  );
};

export default ArrowLeftbt;
