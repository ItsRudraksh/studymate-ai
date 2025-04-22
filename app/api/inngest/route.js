import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  createNewUser,
  generateChapterNotes,
  generateStudyType,
} from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [createNewUser, generateChapterNotes, generateStudyType],
});
