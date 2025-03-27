import { Metadata } from "next";

export const metadata = {
  title: "Create Study Material | StudyMate AI",
  description:
    "Generate personalized study materials using AI. Create comprehensive learning content for exams, jobs, coding, and more.",
  keywords:
    "create study material, AI learning, personalized education, course generation, study content",
};

export default function CreateLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
