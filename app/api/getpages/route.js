import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("links");

    // Get minimal fields
    const pages = await collection
      .find({}, { projection: { handle: 1, createdAt: 1, pic: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const formatted = pages.map((p) => ({
      handle: p.handle,
      link: `${base}/${p.handle}`,
      createdAt: p.createdAt,
      pic: p.pic,
    }));

    return Response.json({ success: true, pages: formatted });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return Response.json({ success: false, pages: [] });
  }
}
