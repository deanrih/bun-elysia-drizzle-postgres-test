import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: true,
  },
  verbose: true,
  out: "./drizzle",
  strict: true,
}) satisfies Config;
