import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    try {
        const files = await sql`
            SELECT id, name, category, description, url FROM audio_files WHERE user_id = ${userId}
        `;
        return NextResponse.json(files.rows);
    } catch (error) {
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
