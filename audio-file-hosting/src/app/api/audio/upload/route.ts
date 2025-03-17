import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public/audio");
        await mkdir(uploadDir, { recursive: true });

        // Define file path
        const filePath = path.join(uploadDir, file.name);
        const bytes = await file.arrayBuffer();

        // Write file to disk
        await writeFile(filePath, Buffer.from(bytes));

        console.log("File uploaded successfully:", filePath);

        // Return response
        return NextResponse.json({ url: `/audio/${file.name}` });
    } catch (error) {
        console.error("File upload error:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
        return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
    }
}
