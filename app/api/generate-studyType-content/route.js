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
    number,
  } = await req.json();

  // Default values for optional parameters
  const cardCount = number || 15; // Default number of flashcards
  const mainTopic = topic || "General Topic";
  const complexityLevel = difficulty || "medium";
  const studyUseCase = courseType || "general";

  const prompt = `Generate up to ${cardCount} flashcards based on the main topic: ${mainTopic}, using the following subtopics for context: ${JSON.stringify(
    chapters
  )}. Format the output as a JSON array, where each flashcard includes a front and back field. The overall complexity level of the flashcards is ${complexityLevel} (easy, medium, hard). Tailor the content to the following use-case: ${studyUseCase} (coding, job, exam, general = other). Keep the flashcards concise and focused on quick review. Avoid including examples or diagrams unless absolutely necessary.`;

  const res = await db
    .insert(studyTypeTable)
    .values({
      id: uuid(),
      courseId,
      studyType,
    })
    .returning({ id: studyTypeTable.id });

  inngest.send({
    name: "generate.study.type.content",
    data: {
      studyType: studyType,
      prompt: prompt,
      courseId: courseId,
    },
  });
  return NextResponse.json(res);
}
