// /lib/auth.js
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret123"; // put a secure one in .env

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" }); // valid for 7 days
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
