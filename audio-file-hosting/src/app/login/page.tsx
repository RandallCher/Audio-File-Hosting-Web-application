"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("username", username); // Temporary session storage
            router.push("/dashboard"); // Redirect to dashboard
        } else {
            setError(data.error);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 w-full mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 w-full mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}
