import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(request, { params }) {
  const id = params.id;

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

    const link = await db
      .collection("links")
      .findOne({ _id: new ObjectId(id), userId: user.id });
    if (!link)
      return NextResponse.json(
        { success: false, message: "Link not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, link });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const id = params.id;

  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const user = jwt.verify(token, SECRET);
    const body = await request.json();
    const { handle, links, pic, des, theme } = body;

    if (!handle || !Array.isArray(links) || links.length === 0)
      return NextResponse.json(
        { success: false, message: "Handle and links are required" },
        { status: 400 }
      );

    const client = await clientPromise;
    const db = client.db("linkhub");

    const existing = await db
      .collection("links")
      .findOne({ handle, userId: { $ne: user.id } });
    if (existing)
      return NextResponse.json(
        { success: false, message: "Handle already taken" },
        { status: 409 }
      );

    const update = {
      handle,
      links,
      pic: pic || "",
      des: des || "",
      theme: theme || "blue",
      updatedAt: new Date(),
    };
    const result = await db
      .collection("links")
      .updateOne({ _id: new ObjectId(id), userId: user.id }, { $set: update });

    if (result.matchedCount === 0)
      return NextResponse.json(
        { success: false, message: "Link not found or unauthorized" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Link updated successfully",
      updated: update,
    });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const id = params.id;

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

    const result = await db
      .collection("links")
      .deleteOne({ _id: new ObjectId(id), userId: user.id });
    if (result.deletedCount === 0)
      return NextResponse.json(
        { success: false, message: "Link not found or unauthorized" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
