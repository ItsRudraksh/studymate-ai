import { db } from "@/configs/db";
import { studyTypeTable, notesTable } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const {
    chapters,
    courseId,
    studyType,
    topic,
    difficulty,
    courseType,
    number, // This will be number of questions for quizzes, number of cards for flashcards
  } = await req.json();

  // Default values for optional parameters
  const itemCount = number || (studyType === "quiz" ? 10 : 15); // Default 10 for quiz, 15 for flashcards
  const mainTopic = topic || "General Topic";
  const complexityLevel = difficulty || "medium";
  const studyUseCase = courseType || "general";

  let prompt;

  if (studyType === "flashcards") {
    prompt = `Generate up to ${itemCount} flashcards based on the main topic: ${mainTopic}, using the following subtopics for context: ${JSON.stringify(
      chapters
    )}. Format the output as a JSON array, where each flashcard includes a front and back field. The overall complexity level of the flashcards is ${complexityLevel} (easy, medium, hard). Tailor the content to the following use-case: ${studyUseCase} (coding, job, exam, general = other). Keep the flashcards concise and focused on quick review. Avoid including examples or diagrams unless absolutely necessary.`;
  } else if (studyType === "quiz") {
    prompt = `Generate up to ${itemCount} multiple-choice questions (MCQs) focused on the main topic: ${mainTopic}. 
Use the following subtopics for additional context: ${JSON.stringify(
      chapters
    )}. 

Requirements: 
- Match the overall complexity level: ${complexityLevel} (easy | medium | hard). 
- Tailor the style and content for the intended use case: ${studyUseCase} (coding | job | exam | general). 
- Always create exactly 4 options for each question. 
- Include questions that involve code snippets or code-based logic where appropriate (especially for coding use cases). 
- Prioritize meaningful, non-repetitive, and high-quality questions. 
- If fewer than ${itemCount} MCQs are feasible, output only as many as meet the quality standards.

Output Format (JSON Array):
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string",
    "correctOption": "A" | "B" | "C" | "D",
    "explanation": "string"
  },
  ...
]

Notes: 
- correctAnswer must exactly match one of the options. 
- correctOption must indicate the corresponding letter ("A", "B", "C", or "D") for the correct answer. 
- explanation should briefly justify why the selected answer is correct (1–2 sentences maximum). 
- For coding MCQs, format short code snippets inline (e.g., \`print(\'Hello\')\`) or use fenced code blocks (\`\`\`python ... \`\`\`) if multiline code is needed. 
- Output only the valid JSON array — no extra commentary or text.`;
  } else {
    return NextResponse.json({ error: "Invalid study type" }, { status: 400 });
  }

  await inngest.send({
    name: "generate.study.type.content",
    data: {
      studyType: studyType,
      prompt: prompt,
      courseId: courseId,
    },
  });
  return NextResponse.json({
    message: "Study material generation queued successfully.",
  });
}
