"use client";
import { useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@example.com" },
  ]);
  const [newUser, setNewUser] = useState({ username: "", email: "" });

  const handleAddUser = () => {
    if (newUser.username && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ username: "", email: "" });
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <input type="text" placeholder="Username" onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email}) 
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
