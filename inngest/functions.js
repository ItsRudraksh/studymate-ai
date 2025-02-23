import { db } from "@/configs/db";
import { inngest } from "./client";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "create.user" },
  async ({ event, step }) => {
    console.log("data before call: " + event.data);
    const { user } = event.data;
    console.log("User before call: " + user);
    await step.run("Create user if not exists", async () => {
      if (!user) {
        console.log("No user found");
        return
      };
      console.log("User in call: " + user);

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

        console.log(userResponse);
      }
    })
    return "User Creation Successfull"
  }
)