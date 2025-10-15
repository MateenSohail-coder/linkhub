import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("linktree");
  const users = db.collection("users");
  const { email, password } = await request.json();

  const user = await users.findOne({ email });
  if (!user)
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return Response.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "7d",
  });

  return Response.json({ success: true, token });
}
