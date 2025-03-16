"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/login");
        } else {
            setUser(storedUser);
        }
    }, [router]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user}!</h1>
                <button
                    className="bg-red-500 text-white px-4 py-2 w-full"
                    onClick={() => {
                        localStorage.removeItem("user");
                        router.push("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </main>
    );
}
