import { db } from "@/configs/db";
import { studyTypeTable } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const studyType = searchParams.get("studyType");

    if (!courseId || !studyType) {
      return NextResponse.json(
        { error: "Course ID and study type are required" },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(studyTypeTable)
      .where(
        and(
          eq(studyTypeTable.courseId, courseId),
          eq(studyTypeTable.studyType, studyType)
        )
      );

    if (result.length === 0) {
      return NextResponse.json({ studyType: null });
    }

    return NextResponse.json({ studyType: result[0] });
  } catch (error) {
    console.error("Error fetching study type:", error);
    return NextResponse.json(
      { error: "Failed to fetch study type" },
      { status: 500 }
    );
  }
}
