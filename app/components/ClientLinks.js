'use client';

export default function ClientLinks({ links }) {
  return (
    <div className="links flex w-full  flex-col gap-5 items-center">
      {links.map((item, index) => (
        <div
          key={index}
          onClick={() => window.open(item.link, '_blank')} // event handler defined *here*
          className="link text-xl flex items-center px-4 py-1 transition-all transform hover:scale-[1.1] bg-blue-600 border border-white justify-center text-white font-semibold active:scale-[0.96] md:active:scale-[1] w-[90%] h-14 rounded-2xl cursor-pointer"
        >
          {item.linktext || item.link}
        </div>
      ))}
    </div>
  );
}
