import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
export const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL);
