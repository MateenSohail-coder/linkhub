import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("linktree");
  const users = db.collection("users");
  const { name, email, password } = await request.json();

  const existing = await users.findOne({ email });
  if (existing)
    return Response.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    );

  const hashed = await bcrypt.hash(password, 10);
  const user = { name, email, password: hashed, createdAt: new Date() };
  await users.insertOne(user);

  return Response.json({ success: true, message: "Registered successfully!" });
}
