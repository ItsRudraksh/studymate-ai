import { Metadata } from "next";

export const metadata = {
  title: "Course | StudyMate AI",
  description:
    "Access your personalized study materials and course content on StudyMate AI",
  keywords:
    "study materials, course content, learning, education, AI-powered learning",
};

export default function CourseLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
