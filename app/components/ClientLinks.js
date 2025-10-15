"use client";

export default function ClientLinks({ links }) {
  if (!links || links.length === 0) {
    return (
      <div className="text-gray-400 text-center text-sm">
        No links available.
      </div>
    );
  }

  return (
    <div className="links flex flex-col w-full gap-4 md:gap-5 items-center">
      {links.map((item, index) => {
        const label = item.linktext || item.link || "Untitled";
        const url = item.link?.startsWith("http")
          ? item.link
          : `https://${item.link}`;

        return (
          <button
            key={index}
            onClick={() => window.open(url, "_blank")}
            className="group w-[90%] md:w-[85%] h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 
                       border border-emerald-400/40 backdrop-blur-sm text-white font-semibold 
                       hover:from-emerald-500/40 hover:to-emerald-600/30 
                       hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]
                       transition-all duration-300 active:scale-95"
          >
            <span className="text-base md:text-lg tracking-wide">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
