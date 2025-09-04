# Quiz App

A clean, responsive quiz application built with React and pure CSS.

## Live Demo

[View the app live here!](https://quizapp-plum-mu.vercel.app)

## Features

- Loads questions from local JSON
- One question at a time, 4 options
- Progress bar and score tracking
- Results summary with correct/incorrect answers
- Restart quiz functionality
- Responsive and accessible
- Timer per question (auto-advance)
- Difficulty selector (easy/medium/hard)
- Persistent high scores (localStorage)
- Subtle animations and interactive UI

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```

## Design Decisions & Architecture

- **Component-based:** Each UI part is a separate React component for clarity and reusability.
- **State management:** useState/useEffect for quiz flow, results, and timer.
- **Routing:** React Router for navigation between start, quiz, and results.
- **Styling:** Pure CSS with pastel colors for a modern, friendly look.
- **Accessibility:** Keyboard navigation, ARIA labels, and focus states.
- **Persistence:** High scores are stored in localStorage per difficulty.
- **Bonus:** Timer, difficulty selector, subtle animations, and responsive design.

## To Deploy

You can deploy to Vercel, Netlify, or GitHub Pages.

---

**For any questions, see the code comments or contact the author.**
