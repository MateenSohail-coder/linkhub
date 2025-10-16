import clientPromise from "@/lib/mongodb";
import ProfileImage from "../components/portfolioimg";
import NotFound from "../not-found";
import Link from "next/link";
export default async function Page({ params }) {
  const { handle } = await params;

  const client = await clientPromise;
  const db = client.db("linkhub");
  const collection = db.collection("links");
  const item = await collection.findOne({ handle });

  if (!item) {
    return <NotFound handle={handle} />;
  }

  // 🎨 Dynamic theme based on user's choice
  const themes = {
    blue: {
      bg: "from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8]",
      accent: "#D2E823",
      button: "bg-[#ff6c03] hover:bg-white hover:text-[#ff6c03]",
    },
    purple: {
      bg: "from-[#3b0764] via-[#6d28d9] to-[#9333ea]",
      accent: "#D2E823",
      button: "bg-[#D2E823] hover:bg-white hover:text-[#6d28d9]",
    },
    green: {
      bg: "from-[#064e3b] via-[#047857] to-[#059669]",
      accent: "#D2E823",
      button: "bg-[#D2E823] hover:bg-white hover:text-[#047857]",
    },
    orange: {
      bg: "from-[#7c2d12] via-[#c2410c] to-[#f97316]",
      accent: "#D2E823",
      button: "bg-[#D2E823] hover:bg-white hover:text-[#c2410c]",
    },
    blackGreen: {
      bg: "from-[#000000] via-[#064e3b] to-[#059669]", // black to green gradient
      accent: "#D2E823", // yellow accent
      button: "bg-[#D2E823] text-[#000000] hover:bg-white hover:text-[#059669]", // button style
    },
  };

  const theme = themes[item.theme] || themes.blue; // fallback to blue

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-b ${theme.bg} text-white px-4 py-12`}
    >
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center gap-8 hover:shadow-[#D2E823]/20 transition-all duration-500">
        {/* Avatar */}
        <ProfileImage pic={item.pic} handle={item.handle} />

        {/* Handle + Description */}
        <div>
          <h1
            className="text-3xl font-extrabold mb-2"
            style={{ color: theme.accent }}
          >
            @{item.handle}
          </h1>
          {item.des && (
            <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
              {item.des}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-4">
          {item.links?.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 px-4 ${theme.button} font-bold rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg`}
            >
              {link.linktext}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-xs mt-6">
          Powered by{" "}
          <Link
            href="/"
            className="text-[#D2E823] font-semibold hover:underline"
          >
            LinkHub
          </Link>
        </div>
      </div>
    </div>
  );
}
