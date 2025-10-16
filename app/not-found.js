import { OctagonAlert, ArrowBigLeft } from "lucide-react";
import Link from "next/link";
export default function NotFound({ handle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-6">
      <div className="max-w-md w-full flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center">
        {/* ✅ Perfectly Centered Icon */}
        <div className="w-full flex justify-center mb-4">
          <OctagonAlert size={96} color="#D2E823" strokeWidth={1.25} />
        </div>

        <h1 className="text-4xl font-bold mb-3 text-[#D2E823]">
          Page Not Found
        </h1>

        <p className="text-gray-300">
          This page is not defined
          {handle && (
            <>
              , related to{" "}
              <span className="font-semibold text-white">@{handle}</span>.
            </>
          )}
        </p>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-6 px-5 py-2 bg-[#D2E823] text-black font-semibold rounded-full hover:bg-[#e6f867] transition-all"
        >
          <ArrowBigLeft />
          <p>Go back home</p>
        </Link>
      </div>
    </div>
  );
}
