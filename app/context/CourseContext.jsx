"use client";

import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [flashcardsState, setFlashcardsState] = useState({
    isGenerating: false,
    isGenerated: false,
    courseId: null,
  });

  const [quizState, setQuizState] = useState({
    isGenerating: false,
    isGenerated: false,
    courseId: null,
  });

  // Function to update flashcard state across all components
  const updateFlashcardsState = (state) => {
    setFlashcardsState((prev) => ({ ...prev, ...state }));
  };

  const updateQuizState = (state) => {
    setQuizState((prev) => ({ ...prev, ...state }));
  };

  return (
    <CourseContext.Provider
      value={{
        flashcardsState,
        updateFlashcardsState,
        quizState,
        updateQuizState,
      }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
}
