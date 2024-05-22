  import { drizzle } from "drizzle-orm/postgres-js";
  import postgres from "postgres";
  
  import * as schema from "./schema";
  
  const dbUrl = Bun.env.DATABASE_URL!;
  const queryClient = postgres(dbUrl.toString());
  export const db = drizzle(queryClient, { schema });
  
  
