const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const ssl = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "boutique_db",
        ssl
      }
);

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { query, pool };
