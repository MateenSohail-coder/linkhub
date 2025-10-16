import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const user = jwt.verify(token, SECRET);

    const client = await clientPromise;
    const db = client.db("linkhub");

    const links = await db
      .collection("links")
      .find({ userId: user.id })
      .toArray();

    return NextResponse.json({ success: true, links });
  } catch (err) {
    console.error("GET all links error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
