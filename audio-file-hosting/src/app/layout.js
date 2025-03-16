"use client";
import { useState } from "react";

const AudioList = () => {
  const [audios, setAudios] = useState([
    { id: 1, name: "Sample Audio", url: "/sample.mp3", description: "Test audio", category: "Music" },
  ]);

  return (
    <div>
      <h2>My Audio Files</h2>
      <ul>
        {audios.map((audio) => (
          <li key={audio.id}>
            <p><b>{audio.name}</b> - {audio.description} ({audio.category})</p>
            <audio controls>
              <source src={audio.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioList;
