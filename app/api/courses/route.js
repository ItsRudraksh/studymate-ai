import { db } from "@/configs/db";
import { notesTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { createdBy } = await req.json();
  const result = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.createdBy, createdBy));
  return NextResponse.json({ result: result });
}

export async function GET(req) {
  try {
    const reqURL = req.url;
    const { searchParams } = new URL(reqURL);
    const courseId = searchParams?.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    console.log("Fetching course with ID:", courseId);
    const course = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable?.courseId, courseId));

    if (!course || course.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    console.log("Found course:", course[0]);
    return NextResponse.json({ result: course[0] });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
