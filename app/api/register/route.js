// app/api/register/route.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Parse JSON safely
    const body = await request.json().catch(() => null);
    if (!body) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("linkhub");
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    return new Response(
      JSON.stringify({ success: true, message: "Registered successfully!" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Register API error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message || "Server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
