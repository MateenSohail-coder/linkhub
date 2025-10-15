import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("links");

    // ✅ 1. Extract and verify JWT
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    let user;
    try {
      user = jwt.verify(token, SECRET);
    } catch {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 403 }
      );
    }

    // ✅ 2. Parse request body
    const body = await request.json();
    const { handle, links, pic, des, theme } = body;

    if (!handle || !Array.isArray(links) || links.length === 0) {
      return Response.json(
        { success: false, message: "Missing handle or links." },
        { status: 400 }
      );
    }

    // ✅ 3. Determine origin (for production and dev)
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";

    // ✅ 4. Check for existing handle (globally — one handle per site)
    const existing = await collection.findOne({ handle });
    if (existing) {
      return Response.json(
        {
          success: false,
          message: "This handle is already taken!",
          link: `${origin}/${handle}`,
        },
        { status: 409 }
      );
    }

    // ✅ 5. Construct link document
    const pageLink = `${origin}/${handle}`;
    const linkDoc = {
      handle,
      links,
      pic: pic || "",
      des: des || "",
      theme: theme || "blue",
      userId: user.id,
      link: pageLink,
      createdAt: new Date(),
    };

    await collection.insertOne(linkDoc);

    // ✅ 6. Return success
    return Response.json(
      {
        success: true,
        message: "Your LinkHub was created successfully!",
        link: pageLink,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in /api/add:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
