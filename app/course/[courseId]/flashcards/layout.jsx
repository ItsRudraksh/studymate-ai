import React from "react";

export const metadata = {
  title: "StudyMate - Flashcards",
  description: "Study with flashcards",
};

export default function FlashcardsLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
