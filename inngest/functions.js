import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  chapterContentTable,
  notesTable,
  studyTypeTable,
  usersTable,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import {
  genChapterNotes,
  genFlashCards,
  genQuizContent,
} from "@/configs/gemini";
import { v4 as uuid } from "uuid";

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "create.user" },
  async ({ event, step }) => {
    const { user } = event.data;
    await step.run("Create user if not exists", async () => {
      if (!user) {
        return;
      }

      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, user.id));

      if (result.length === 0) {
        const name = user.username || "Unknown User";
        const email =
          user.primaryEmailAddress?.emailAddress || "no-email@example.com";

        const userResponse = await db
          .insert(usersTable)
          .values({
            id: user.id,
            name,
            email,
          })
          .returning({ id: usersTable.id });
      }
    });
    return "User Creation Successfull";
  }
);

export const generateChapterNotes = inngest.createFunction(
  { id: "generate-chapter-notes" },
  { event: "generate.chapter.notes" },
  async ({ event, step }) => {
    const { course } = event.data;
    const chapters = course?.courseContent?.chapters || [];
    const difficulty = course?.difficulty || "medium";
    const type = course?.courseType || "other";

    const notesRes = await step.run("Generate Chapter Notes", async () => {
      // Process each chapter individually
      for (const chapter of chapters) {
        const prompt = `Generate detailed preparation content for the following chapter: ${JSON.stringify(
          chapter
        )}. Ensure that all topic points are covered thoroughly according to the selected difficulty level ${difficulty}. The content should be structured clearly, with explanations formatted in HTML. Avoid including <html>, <head>, <body>, or <title> tags—only provide the content itself. Ensure to always write correct opening and closing tags.
          For each topic, include:
          Detailed explanations with proper formatting.

          Examples (real-world scenarios, case studies, and practical applications where applicable).

          Formulas (use the most appropriate format: LaTeX-style or plain text).

          No Diagrams or Images (avoid external links or AI-generated images).

          Only include links when you are sure that the link is valid and relevant to the topic.

          Use Web Search to find relevant links to articles, videos, and other resources if needed and then include the link in the content.
          
          Code Snippets (formatted properly within <pre><code> blocks, with syntax highlighting where possible).
          
          Lists, tables, and structured formatting to enhance readability.
          
          If a type is provided ${type}, tailor the content accordingly. If the type is other or none given, generate general material.
          `;

        let aiResult = (
          await genChapterNotes.sendMessage({ message: prompt })
        ).text.trim();

        // Remove markdown code block markers if they exist
        if (aiResult.startsWith("```html")) {
          aiResult = aiResult.slice(7); // Remove ```html
        }
        if (aiResult.endsWith("```")) {
          aiResult = aiResult.slice(0, -3); // Remove ```
        }
        aiResult = aiResult.trim(); // Remove any extra whitespace

        // Store each chapter's content separately
        await db.insert(chapterContentTable).values({
          id: uuid(),
          courseId: course?.courseId,
          chapterId: chapter.chapterNumber,
          chapterContent: aiResult || "No content generated",
        });
      }
      return "All chapter notes generated successfully";
    });

    const updateStatus = await step.run("Update course status", async () => {
      await db
        .update(notesTable)
        .set({ status: "Generated" })
        .where(eq(notesTable.courseId, course?.courseId));
      return "Status updated successfully";
    });
  }
);

export const generateStudyType = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "generate.study.type.content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId } = event.data;

    let valuesToUpsert = { courseId };
    let aiGeneratedContent;

    if (studyType === "flashcards") {
      aiGeneratedContent = await step.run("Generating Flashcards", async () => {
        const res = await genFlashCards.sendMessage({ message: prompt });
        const aiRes = JSON.parse(res.text);
        return aiRes;
      });
      valuesToUpsert.flashcardContent = aiGeneratedContent;
    } else if (studyType === "quiz") {
      aiGeneratedContent = await step.run("Generating Quiz", async () => {
        const res = await genQuizContent.sendMessage({ message: prompt });
        const aiRes = JSON.parse(res.text);
        return aiRes;
      });
      valuesToUpsert.quizContent = aiGeneratedContent;
    } else {
      console.error(`Unsupported study type: ${studyType}`);
      return "Unsupported study type";
    }

    if (aiGeneratedContent) {
      await step.run("Upserting Study Type Content", async () => {
        await db
          .insert(studyTypeTable)
          .values(valuesToUpsert)
          .onConflictDoUpdate({
            target: studyTypeTable.courseId, // Conflict on courseId
            set:
              studyType === "flashcards"
                ? { flashcardContent: aiGeneratedContent }
                : { quizContent: aiGeneratedContent }, // Set the specific column
          });
        return "Study Type Content Upserted Successfully";
      });
    }

    // Update notes status to indicate flashcards or quiz generation is complete
    if (studyType === "flashcards") {
      await step.run("Update Flashcards Status", async () => {
        await db
          .update(notesTable)
          .set({ flashcardsGenerated: true })
          .where(eq(notesTable.courseId, courseId));
        return "Flashcards Status Updated Successfully";
      });
    } else if (studyType === "quiz") {
      await step.run("Update Quiz Status", async () => {
        await db
          .update(notesTable)
          .set({ quizGenerated: true }) // Assuming you have a quizGenerated field
          .where(eq(notesTable.courseId, courseId));
        return "Quiz Status Updated Successfully";
      });
    }
  }
);
