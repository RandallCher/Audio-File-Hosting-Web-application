import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link href="/login">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Login</button>
      </Link>
    </div>
  );
}
