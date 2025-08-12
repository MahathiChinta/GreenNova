// utils/generateToken.js
import jwt from "jsonwebtoken";

export const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || "demo-secret", { expiresIn: "7d" });
