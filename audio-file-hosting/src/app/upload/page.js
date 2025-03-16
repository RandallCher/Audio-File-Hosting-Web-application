"use client";
import { useState } from "react";

const UploadAudio = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("category", category);

    console.log("Uploading File:", file.name, description, category);
    // Later, send to backend using axios: axios.post("/api/upload", formData);
  };

  return (
    <div>
      <h2>Upload Audio</h2>
      <input type="file" accept=".mp3,.wav" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadAudio;
