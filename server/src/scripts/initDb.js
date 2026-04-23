require("dotenv").config();
const fs = require("node:fs/promises");
const path = require("node:path");
const { pool } = require("../db");

async function initDatabase() {
  const schemaPath = path.join(__dirname, "../../db/schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");

  await pool.query(schemaSql);
  console.log("Database schema applied successfully.");
}

initDatabase()
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
