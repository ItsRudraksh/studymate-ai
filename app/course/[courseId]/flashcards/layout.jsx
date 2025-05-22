import React from "react";

export const metadata = {
  title: "Flashcards | StudyMate",
  description: "Study with flashcards",
};

export default function FlashcardsLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
