import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: Bun.env.DATABASE_URL!,
    ssl: true,
  },
  verbose: true,
  out: "./drizzle",
  strict: true,
}) satisfies Config;
