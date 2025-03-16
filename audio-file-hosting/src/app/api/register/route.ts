import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // Check if the username already exists
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (checkUser.rows.length > 0) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
