import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import StartPage from "./pages/StartPage";
import "./App.css";

function AppRoutes({ results, setResults, userName, setUserName, quizStarted, setQuizStarted, difficulty, setDifficulty }) {
  const navigate = useNavigate();

  const handleStart = (name, diff) => {
    setUserName(name);
    setDifficulty(diff);
    setQuizStarted(true);
  };

  useEffect(() => {
    if (quizStarted) {
      navigate("/quiz");
    }
  }, [quizStarted, navigate]);

  useEffect(() => {
    if (results) {
      navigate("/results");
    }
  }, [results, navigate]);

  const handleRestart = () => {
    setResults(null);
    setQuizStarted(false);
    setUserName("");
    setDifficulty("easy");
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<StartPage onStart={handleStart} />}
      />
      <Route
        path="/quiz"
        element={quizStarted ? <QuizPage setResults={setResults} userName={userName} difficulty={difficulty} /> : <Navigate to="/" />}
      />
      <Route
        path="/results"
        element={<ResultsPage results={results} onRestart={handleRestart} userName={userName} />}
      />
    </Routes>
  );
}

function App() {
  const [results, setResults] = useState(null);
  const [userName, setUserName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <Router>
      <div className="app-root">
        <AppRoutes
          results={results}
          setResults={setResults}
          userName={userName}
          setUserName={setUserName}
          quizStarted={quizStarted}
          setQuizStarted={setQuizStarted}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </div>
    </Router>
  );
}

export default App;
