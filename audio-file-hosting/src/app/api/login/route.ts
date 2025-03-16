import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in your .env
});

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    console.log("Received username:", username); // Debug log
    console.log("Received password:", password); // Debug log

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    console.log("User query result:", user.rows); // Debug log

    if (user.rows.length === 0) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
