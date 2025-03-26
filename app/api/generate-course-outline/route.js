import { db } from "@/configs/db"
import { createCourse } from "@/configs/gemini"
import { notesTable } from "@/configs/schema"
import { inngest } from "@/inngest/client"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { category, content, difficulty, courseId, createdBy } = await request.json()
    const prompt = `Generate comprehensive study material on ${content} tailored for ${category} at a ${difficulty} difficulty. The output should include:
      - A concise course summary.
      - A structured list of chapters, each with a brief chapter summary.
      - For each chapter, a detailed topic list formatted in JSON.
      Ensure the material is clear, logically organized, and appropriate for the specified course type and difficulty level.`

    console.log("Sending request to AI...")
    const aiCall = await createCourse.sendMessage(prompt)
    console.log("AI response received")

    let aiRes
    try {
      aiRes = JSON.parse(aiCall.response.text())
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      console.log("Raw AI response:", aiCall.response.text())
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 })
    }

    console.log("Inserting into database...")
    const dbRes = await db
      .insert(notesTable)
      .values({
        courseId: courseId,
        courseType: category,
        createdBy: createdBy,
        id: courseId,
        topic: content,
        courseContent: aiRes,
        difficulty: difficulty,
      })
      .returning({ resp: notesTable })

    const result = inngest.send({
      name: "generate.chapter.notes",
      data: {
        course: dbRes[0].resp
      }
    })
    console.log("Inngest response:", result.resp);


    console.log("Database insertion successful:", dbRes)
    return NextResponse.json({ result: dbRes })
  } catch (error) {
    console.error("Error in POST /api/generate-course:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

