import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(request) {
  try {
    // ✅ Get token from headers
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    // ✅ Verify token
    let user;
    try {
      user = jwt.verify(token, SECRET);
    } catch (err) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 403 }
      );
    }

    // ✅ Connect to database
    const client = await clientPromise;
    const db = client.db("linktree");
    const links = await db
      .collection("links")
      .find({ userId: user.id })
      .sort({ createdAt: -1 }) // newest first
      .project({ _id: 1, handle: 1, linktext: 1, link: 1 }) // only return needed fields
      .toArray();

    return Response.json({ success: true, links });
  } catch (error) {
    console.error("Error fetching user links:", error);
    return Response.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
