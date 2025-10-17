import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

async function verifyUser(request) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Unauthorized: Missing token");

  try {
    return jwt.verify(token, SECRET);
  } catch {
    throw new Error("Unauthorized: Invalid token");
  }
}

export async function GET(request, { params }) {
  const id = params.id;
  try {
    const user = await verifyUser(request);
    const client = await clientPromise;
    const db = client.db("linkhub");

    const link = await db
      .collection("links")
      .findOne({ _id: new ObjectId(id), userId: user.id });

    if (!link) {
      return NextResponse.json(
        { success: false, message: "Link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, link });
  } catch (err) {
    console.error("GET error:", err.message);
    return NextResponse.json(
      {
        success: false,
        message: err.message.includes("Unauthorized")
          ? err.message
          : "Server error",
      },
      { status: err.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const id = params.id;
  try {
    const user = await verifyUser(request);
    const body = await request.json();
    const { handle, links, pic, des, theme } = body;

    if (!handle || !Array.isArray(links) || links.length === 0) {
      return NextResponse.json(
        { success: false, message: "Handle and links are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("linkhub");

    // ✅ Fetch existing record first
    const existingDoc = await db
      .collection("links")
      .findOne({ _id: new ObjectId(id), userId: user.id });

    if (!existingDoc) {
      return NextResponse.json(
        { success: false, message: "Link not found or unauthorized" },
        { status: 404 }
      );
    }

    // ✅ Check for duplicate handle (excluding this user’s current link)
    const handleConflict = await db
      .collection("links")
      .findOne({ handle, userId: { $ne: user.id } });
    if (handleConflict) {
      return NextResponse.json(
        { success: false, message: "Handle already taken" },
        { status: 409 }
      );
    }

    // ✅ Merge new data with existing (preserve old pic/des/theme)
    const update = {
      handle,
      links,
      pic: pic ?? existingDoc.pic ?? "",
      des: des ?? existingDoc.des ?? "",
      theme: theme ?? existingDoc.theme ?? "blue",
      updatedAt: new Date(),
    };

    const result = await db
      .collection("links")
      .updateOne({ _id: new ObjectId(id), userId: user.id }, { $set: update });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Update failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Link updated successfully",
      updated: update,
    });
  } catch (err) {
    console.error("PUT error:", err.message);
    return NextResponse.json(
      {
        success: false,
        message: err.message.includes("Unauthorized")
          ? err.message
          : "Server error",
      },
      { status: err.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const id = params.id;
  try {
    const user = await verifyUser(request);
    const client = await clientPromise;
    const db = client.db("linkhub");

    const result = await db
      .collection("links")
      .deleteOne({ _id: new ObjectId(id), userId: user.id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Link not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (err) {
    console.error("DELETE error:", err.message);
    return NextResponse.json(
      {
        success: false,
        message: err.message.includes("Unauthorized")
          ? err.message
          : "Server error",
      },
      { status: err.message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
