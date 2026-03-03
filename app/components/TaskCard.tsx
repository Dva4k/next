"use client";

import { useState } from "react";

export default function TaskCard({ task }: {task : any}) {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    margin: "8px",
    backgroundColor: isCompleted ? "#e8f5e8" : "white",
    cursor: "pointer",
    transition: "0.2s",
    fontFamily: "Arial"
  };

  const titleStyle = {
    margin: "0 0 8px 0",
    fontSize: "16px"
  };

  const statusStyle = {
    margin: 0,
    padding: "4px 8px",
    backgroundColor: isCompleted ? "#4CAF50" : "#ffc107",
    color: "white",
    borderRadius: "4px",
    fontSize: "14px",
    display: "inline-block"
  };

  return (
    <div
      onClick={() => setIsCompleted(!isCompleted)}
      style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      <p style={titleStyle}>{task.title}</p>
      <p style={statusStyle}>
        {isCompleted ? " Готово" : " В работе..."}
      </p>
    </div>
  );
}