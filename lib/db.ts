import pg from "pg";

const { Pool } = pg;

declare global {
  // eslint-disable-next-line no-var
  var gadgetsmaniaPool: pg.Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is required");
  return new Pool({
    connectionString,
    max: 4,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
    ssl: connectionString.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
  });
}

export const db = globalThis.gadgetsmaniaPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalThis.gadgetsmaniaPool = db;
