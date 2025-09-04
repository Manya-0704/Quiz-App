import React, { useState } from "react";
import "../App.css";

export default function StartPage({ onStart }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(name.trim(), difficulty);
  };

  return (
    <div className="start-container">
      <h1 className="start-title">Welcome to the Quiz App!</h1>
      <form className="start-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="start-label">
          Enter your name to begin:
        </label>
        <input
          id="username"
          className="start-input"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name (optional)"
        />
        <label htmlFor="difficulty" className="start-label">
          Select difficulty:
        </label>
        <select
          id="difficulty"
          className="start-input"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="start-btn" type="submit" disabled={name.trim().length === 0}>
          Start Quiz
        </button>
      </form>
    </div>
  );
}
