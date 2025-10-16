// app/api/login/route.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

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

    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("linkhub");
    const users = db.collection("users");

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      SECRET,
      { expiresIn: "7d" }
    );

    // Success response
    return new Response(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Login API error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message || "Server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
