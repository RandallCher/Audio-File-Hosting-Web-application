"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Default credentials (Replace with backend authentication)
    const defaultUser = { username: "admin", password: "password123" };

    if (username === defaultUser.username && password === defaultUser.password) {
      localStorage.setItem("user", JSON.stringify(defaultUser));
      router.push("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
