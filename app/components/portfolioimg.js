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

    const img = new window.Image(); // native Image
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
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#D2E823]">
      {validPic && !imgError ? (
        <Image
          src={validPic}
          alt={`${handle || "user"}'s profile`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 128px, 128px"
        />
      ) : (
        <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
      )}
    </div>
  );
}
