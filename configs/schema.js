import {
  pgTable,
  varchar,
  boolean,
  json,
  uuid,
  integer,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().notNull().default(false),
});

export const notesTable = pgTable("notes", {
  id: varchar().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficulty: varchar().default("Medium"),
  courseContent: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating"),
  flashcardsGenerated: boolean().default(false),
  quizGenerated: boolean().default(false),
  qnaGenerated: boolean().default(false),
});

export const chapterContentTable = pgTable("chapterContent", {
  id: varchar().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  chapterContent: text(),
});

export const studyTypeTable = pgTable("studyType", {
  id: varchar().primaryKey(),
  courseId: varchar().notNull(),
  flashcardContent: json(),
  quizContent: json(),
  studyType: varchar().notNull(),
});
