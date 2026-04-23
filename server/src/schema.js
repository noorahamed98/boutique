const fs = require("node:fs/promises");
const path = require("node:path");
const { pool } = require("./db");

async function ensureDatabaseSchema() {
  const schemaPath = path.join(__dirname, "../db/schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");
  await pool.query(schemaSql);
}

module.exports = { ensureDatabaseSchema };
