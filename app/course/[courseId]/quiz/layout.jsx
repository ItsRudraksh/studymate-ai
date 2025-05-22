import React from "react";

export const metadata = {
  title: "Quiz | StudyMate AI",
  description: "Test your knowledge with interactive quizzes",
};

export default function QuizLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
