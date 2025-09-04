import React from "react";
import "../App.css";

export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="progress-bar-bg">
      <div
        className="progress-bar-fill"
        style={{ width: `${percent}%` }}
        aria-valuenow={current + 1}
        aria-valuemax={total}
        aria-valuemin={1}
        role="progressbar"
      />
    </div>
  );
}
