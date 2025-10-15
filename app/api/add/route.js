import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const client = await clientPromise;
  const body = await request.json();
  const db = client.db("linktree");
  const collection = db.collection("links");

  // Extract base URL from the incoming request
  const origin =
    request.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "";

  // 1. Check for existing handle BEFORE inserting
  const existingDoc = await collection.findOne({ handle: body.handle });

  if (existingDoc) {
    return Response.json({
      success: false,
      error: true,
      message: "This Linktree already exists!",
      link: `${origin}/${body.handle}`,
      result: null,
    });
  }

  // 2. Insert only if handle is unique
  const result = await collection.insertOne(body);

  return Response.json({
    success: true,
    error: false,
    message: "Linktree was created successfully!",
    link: `${origin}/${body.handle}`,
    result,
  });
}
