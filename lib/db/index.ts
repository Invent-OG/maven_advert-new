import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Connection for migrations
export const migrationClient = postgres(connectionString, { max: 1 });

// Prevent multiple connections in development and limit connections in production
declare global {
  // eslint-disable-next-line no-var
  var db: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

let dbInstance: ReturnType<typeof drizzle<typeof schema>>;

if (process.env.NODE_ENV === "production") {
  const queryClient = postgres(connectionString, {
    max: 1, // Limit pool size per worker to avoid PgBouncer session limit errors
    connect_timeout: 10,
    idle_timeout: 20,
  });
  dbInstance = drizzle(queryClient, { schema });
} else {
  if (!global.db) {
    const queryClient = postgres(connectionString, {
      max: 1, // Limit pool size in dev too to prevent exhaustion during hot reloads
      connect_timeout: 10,
      idle_timeout: 20,
    });
    global.db = drizzle(queryClient, { schema });
  }
  dbInstance = global.db;
}

export const db = dbInstance;
