import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import jwt from 'jsonwebtoken';

// 📌 API Endpoint: Fetch all users
export const allUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error in fetching all users:", error);
  }
};

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const [result] = await pool.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email]);
    res.json({ message: "User added successfully!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error in signUp :: ", error);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found!" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    
    generateToken(user.Username, res);
    res.json({ message: "Sign in successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error in signIn :: ", error);
  }
}

export const checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  res.json({ message: "Authorized!" });
}

export const signOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sign out successful!" });
}