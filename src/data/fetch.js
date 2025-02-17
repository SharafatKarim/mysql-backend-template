import { pool } from "../db/connection.js";

export const fetchData = async (req, res) => {
  try {
    const { query } = req.body;
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
      console.error("Error in fetching data:", error);
      res.status(500).json({ error: error.message });
    }
  };
