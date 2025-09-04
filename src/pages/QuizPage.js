import React, { useEffect, useState, useRef } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import questionsData from "../data/questions.json";
import "../App.css";

const QUESTION_TIME = 30; // seconds

export default function QuizPage({ setResults, userName, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(QUESTION_TIME);
  const timerRef = useRef();

  useEffect(() => {
    // Filter questions by difficulty
    const filtered = questionsData.filter(q => q.difficulty === difficulty);
    setQuestions(filtered);
  }, [difficulty]);

  useEffect(() => {
    setTimer(QUESTION_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  useEffect(() => {
    if (timer === 0) {
      handleAutoNext();
    }
    // eslint-disable-next-line
  }, [timer]);

  const handleSelect = (idx) => setSelected(idx);

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setTimer(QUESTION_TIME);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Compute results using the newAnswers array
      const score = questions.reduce(
        (acc, q, i) => acc + (newAnswers[i] === q.correct ? 1 : 0),
        0
      );
      setResults({
        questions,
        answers: newAnswers,
        score,
      });
    }
  };

  const handleAutoNext = () => {
    if (selected === null) {
      // No answer selected, auto-lock as unanswered
      setSelected(null);
    }
    handleNext();
  };

  const handlePrev = () => {
    setCurrent((c) => Math.max(0, c - 1));
    setSelected(answers[current - 1] ?? null);
    setAnswers(answers.slice(0, -1));
    setTimer(QUESTION_TIME);
  };

  return (
    <div className="quiz-container">
      {userName && (
        <div className="quiz-greeting">Good luck, {userName}!</div>
      )}
      <ProgressBar current={current} total={questions.length} />
      <div className="timer-bar" aria-label="Time left">
        ⏰ {timer} seconds left
      </div>
      {questions.length > 0 && (
        <QuestionCard
          question={questions[current].question}
          options={questions[current].options}
          selected={selected}
          onSelect={handleSelect}
        />
      )}
      <div className="quiz-actions">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrev}
          disabled={current === 0}
        >
          Previous
        </button>
        <button
          className="nav-btn next-btn"
          onClick={handleNext}
          disabled={selected === null}
        >
          {current === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
      <div className="quiz-progress">
        Question {current + 1} of {questions.length}
      </div>
    </div>
  );
}
