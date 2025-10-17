"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfileImage({ pic, handle }) {
  const [imgError, setImgError] = useState(false);
  const [validPic, setValidPic] = useState("");

  useEffect(() => {
    if (!pic) {
      setValidPic("");
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
      setValidPic("");
      setImgError(true);
    };
  }, [pic]);

  return (
    <div
      className="relative rounded-full overflow-hidden border-4 border-[#D2E823]  
                    w-28 h-28  lg:w-32 lg:h-32 xl:w-36 xl:h-36"
    >
      {validPic && !imgError ? (
        <Image
          src={validPic}
          alt={`${handle || "user"}'s profile`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 80px, 
                 (max-width: 768px) 96px, 
                 (max-width: 1024px) 112px, 
                 (max-width: 1280px) 128px, 
                 144px"
        />
      ) : (
        <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
          No Image
        </div>
      )}
    </div>
  );
}
