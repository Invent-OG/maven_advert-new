import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Connection for migrations
export const migrationClient = postgres(connectionString, { max: 1 });

// Connection for queries
const queryClient = postgres(connectionString, {
  connect_timeout: 10, // 10 seconds
  idle_timeout: 20, // 20 seconds
});
export const db = drizzle(queryClient, { schema });
