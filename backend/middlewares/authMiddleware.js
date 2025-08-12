// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "demo-secret");
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify failed:", err.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const companyOnly = (req, res, next) => {
  if (req.user?.role === "company") return next();
  return res.status(403).json({ message: "Access denied: company role required" });
};

export const governmentOnly = (req, res, next) => {
  if (req.user?.role === "government") return next();
  return res.status(403).json({ message: "Access denied: government role required" });
};
