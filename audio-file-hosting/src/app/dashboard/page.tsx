"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [audioFiles, setAudioFiles] = useState([]);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const router = useRouter();

    // Hardcoded userId for now (Replace this with actual user authentication)
    const userId = "1"; 

    useEffect(() => {
        const fetchAudioFiles = async () => {
            const res = await fetch(`/api/audio?userId=${userId}`);
            const data = await res.json();
            setAudioFiles(data);
        };
        fetchAudioFiles();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return alert("Please select an audio file.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("userId", userId);

        const res = await fetch("/api/audio/upload", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("File uploaded successfully!");
            setFile(null);
            setDescription("");
            setCategory("");
            router.refresh();
        } else {
            alert("File upload failed.");
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={() => router.push("/login")}>
                Logout
            </button>

            <h2 className="text-xl font-semibold mt-6">Upload Audio File</h2>
            <form onSubmit={handleUpload} className="mt-4">
                <input type="file" accept="audio/*" onChange={handleFileChange} required />
                <input
                    type="text"
                    placeholder="Description"
                    className="border p-2 w-full mt-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    className="border p-2 w-full mt-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                    Upload
                </button>
            </form>

            <h2 className="text-xl font-semibold mt-6">Your Audio Files</h2>
            <ul>
                {audioFiles.length > 0 ? (
                    audioFiles.map((file) => (
                        <li key={file.id} className="border p-2 mt-2">
                            <p><strong>Name:</strong> {file.name}</p>
                            <p><strong>Category:</strong> {file.category}</p>
                            <audio controls src={file.url}></audio>
                        </li>
                    ))
                ) : (
                    <p>No files uploaded yet.</p>
                )}
            </ul>
        </main>
    );
}
