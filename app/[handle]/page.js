import clientPromise from "@/lib/mongodb";
import ClientLinks from "../components/ClientLinks";
import Image from "next/image";

export default async function Page({ params }) {
  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const item = await collection.findOne({ handle });

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-6">
        <div className="max-w-md w-full bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-lg text-center">
          <h1 className="text-3xl font-semibold mb-2">User Not Found</h1>
          <p className="text-gray-400">
            We couldn’t find a profile for{" "}
            <span className="text-emerald-400">@{handle}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-4 py-10 md:py-20">
      <div className="w-full max-w-lg bg-gray-900/60 backdrop-blur-2xl border border-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center text-center gap-8 transition-all duration-500 hover:shadow-emerald-500/20">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
            {item.pic ? (
              <Image
                src={item.pic}
                alt={`${item.handle}'s profile picture`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 128px"
                priority
              />
            ) : (
              <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              @{item.handle}
            </h1>
            {item.des && (
              <p className="mt-2 text-gray-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                {item.des}
              </p>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col gap-4 md:gap-5">
          <ClientLinks links={item.links} />
        </div>

        {/* Footer */}
        <div className="text-gray-500 text-xs mt-4">
          Powered by{" "}
          <span className="text-emerald-400 font-semibold">LinkHub</span>
        </div>
      </div>
    </div>
  );
}
