import React from "react";

export const metadata = {
  title: "StudyMate | Quiz",
  description: "Test your knowledge with interactive quizzes",
};

export default function QuizLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
