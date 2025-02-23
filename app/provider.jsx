"use client";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      checkIsNewUser();
    }
  }, [user]);

  const checkIsNewUser = async () => {
    const res = await axios.post("/api/create-user", { user: user });
    // if (!user) return;
    // console.log(user);

    // const result = await db
    //   .select()
    //   .from(usersTable)
    //   .where(eq(usersTable.id, user.id));

    // if (result.length === 0) {
    //   const name = user.username || "Unknown User";
    //   const email =
    //     user.primaryEmailAddress?.emailAddress || "no-email@example.com";

    //   const userResponse = await db
    //     .insert(usersTable)
    //     .values({
    //       id: user.id,
    //       name,
    //       email,
    //     })
    //     .returning({ id: usersTable.id });

    //   console.log(userResponse);
    // }
  };
  return <div>{children}</div>;
}

export default Provider;
