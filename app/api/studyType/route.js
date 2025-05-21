import { db } from "@/configs/db";
import { studyTypeTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const requestedStudyType = searchParams.get("studyType");

    if (!courseId || !requestedStudyType) {
      return NextResponse.json(
        { error: "Course ID and study type are required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(studyTypeTable)
      .where(eq(studyTypeTable.courseId, courseId));

    if (result.length === 0) {
      return NextResponse.json({ studyType: null });
    }

    const courseStudyData = result[0];
    let responseData = null;

    if (
      requestedStudyType === "flashcards" &&
      courseStudyData.flashcardContent
    ) {
      responseData = { flashcardContent: courseStudyData.flashcardContent };
    } else if (requestedStudyType === "quiz" && courseStudyData.quizContent) {
      responseData = { quizContent: courseStudyData.quizContent };
    }

    if (responseData) {
      return NextResponse.json({
        studyType: { ...courseStudyData, ...responseData },
      });
    } else {
      const emptyContent = {};
      if (requestedStudyType === "flashcards")
        emptyContent.flashcardContent = null;
      if (requestedStudyType === "quiz") emptyContent.quizContent = null;

      return NextResponse.json({
        studyType: { ...courseStudyData, ...emptyContent },
      });
    }
  } catch (error) {
    console.error("Error fetching study type:", error);
    return NextResponse.json(
      { error: "Failed to fetch study type" },
      { status: 500 }
    );
  }
}
