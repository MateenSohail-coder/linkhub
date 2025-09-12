import clientPromise from "@/lib/mongodb";
import ClientLinks from "../components/ClientLinks";
export default async function Page({ params }) {
  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");
  const item = await collection.findOne({ handle: handle });

  return (
    <div className="min-h-screen py-0 md:py-10 px-3- w-screen flex items-center justify-center  bg-[#225ac0]/80">
      <div className="min-h-[85vh] border-[#225ac0] border-0 md:border-4 py-10 px-3 md:bg-white/10 rounded-0  md:rounded-4xl flex flex-col gap-6 backdrop-blur-md w-full md:w-1/2">
        <div className="pic flex flex-col items-center justify-center">
          <div className="h-24 w-24 rounded-full relative overflow-hidden">
            {item.pic ? (
              <img
                src={item.pic}
                alt="Not Found"
                fill="true"
                className="bg-cover w-full h-full bg-gray-300"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="handle font-bold text-neutral-50 text-center">
            {item.handle}
          </div>
          <div className="text-sm text-neutral-600 text-center">{item.des}</div>
        </div>
        <div className="links flex flex-col gap-5 items-center">
          <ClientLinks links={item.links} />
        </div>
      </div>
    </div>
  );
}
