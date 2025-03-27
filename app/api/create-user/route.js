import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(request) {
  try {
    const { user } = await request.json();

    if (!user) {
      return NextResponse.json(
        { error: "User data is missing" },
        { status: 400 }
      );
    }

    await inngest.send({
      name: "create.user",
      data: { user },
    });

    return NextResponse.json(
      { message: "User creation event sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send user creation event" },
      { status: 500 }
    );
  }
}
