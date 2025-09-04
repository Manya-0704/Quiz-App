import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ResultsPage({ results, onRestart, userName }) {
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(null);

  useEffect(() => {
    if (!results) {
      navigate("/quiz");
      return;
    }
    // Get high score for this difficulty
    const key = `highscore_${results.questions[0]?.difficulty || "all"}`;
    const stored = localStorage.getItem(key);
    if (stored === null || results.score > Number(stored)) {
      localStorage.setItem(key, results.score);
      setHighScore(results.score);
    } else {
      setHighScore(Number(stored));
    }
  }, [results, navigate]);

  if (!results) return null;

  return (
    <div className="results-container">
      <h2 className="results-title">
        {userName ? `${userName}, y` : "Y"}ou scored {results.score} / {results.questions.length}
      </h2>
      {results.questions[0]?.difficulty && (
        <div className="highscore-bar">
          High Score ({results.questions[0].difficulty}): <b>{highScore}</b>
        </div>
      )}
      <ul className="results-list">
        {results.questions.map((q, i) => (
          <li
            key={i}
            className={`result-item${results.answers[i] === q.correct ? " correct" : " incorrect"}`}
          >
            <div className="result-question">{q.question}</div>
            <div>
              Your answer: <span className="user-answer">{q.options[results.answers[i]] ?? "No answer"}</span>
            </div>
            {results.answers[i] !== q.correct && (
              <div>
                Correct answer: <span className="correct-answer">{q.options[q.correct]}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="restart-btn" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}
