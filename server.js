import express from "express";
import cors from "cors";
import pkg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "0.0.0.0",
  database: "forumx",
  password: "YOUR_DB_PASSWORD",
  port: 5432,
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const check = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  if (check.rows.length > 0) {
    return res.status(400).json({ message: "User exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id,username,email",
    [username, email, hash]
  );

  res.json(result.rows[0]);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) return res.status(400).json({ message: "Wrong password" });

  res.json({ id: user.id, username: user.username, email: user.email });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});
