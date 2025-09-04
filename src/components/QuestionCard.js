import React, { useEffect, useRef } from "react";
import "../App.css";

const optionLetters = ["A", "B", "C", "D"];

export default function QuestionCard({ question, options, selected, onSelect }) {
  const optionRefs = useRef([]);

  useEffect(() => {
    if (selected !== null && optionRefs.current[selected]) {
      optionRefs.current[selected].focus();
    } else if (optionRefs.current[0]) {
      optionRefs.current[0].focus();
    }
  }, [selected]);

  const handleKeyDown = (e, idx) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (idx + 1) % options.length;
      optionRefs.current[next].focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (idx - 1 + options.length) % options.length;
      optionRefs.current[prev].focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(idx);
    }
  };

  return (
    <div className="question-card modern-card" role="group" aria-label="Quiz question">
      <h2 className="question-title modern-title">{question}</h2>
      <div className="options-list modern-options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            ref={el => optionRefs.current[idx] = el}
            className={`option-btn modern-option${selected === idx ? " selected" : ""}`}
            onClick={() => onSelect(idx)}
            aria-pressed={selected === idx}
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e, idx)}
            aria-label={opt}
          >
            <span className="option-letter">{optionLetters[idx]}</span>
            <span className="option-text">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
