import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres",      // Change if needed
  host: "localhost",
  database: "audio_hosting_db",
  password: "Royg2biv",  // Change to your actual password
  port: 5432,           // Default PostgreSQL port
});

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    // Check if user exists
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 AND password_hash = $2",
      [username, password]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user: result.rows[0] });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
