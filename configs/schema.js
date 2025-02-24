import { pgTable, varchar, boolean, json, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().notNull().default(false)
});


export const notesTable = pgTable("notes", {
  id: varchar().primaryKey(),
  courseId: uuid().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficulty: varchar().default("Medium"),
  courseContent: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating")
})