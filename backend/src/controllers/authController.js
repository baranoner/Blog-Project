import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { 
        role: "admin", 
        id: process.env.ADMIN_DB_ID
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: "Wrong password" });
};