require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { query } = require("./db");
const { ensureDatabaseSchema } = require("./schema");
const authRoutes = require("./routes/authRoutes");
const designRoutes = require("./routes/designRoutes");

const app = express();
const port = Number(process.env.PORT || 5000);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl
  })
);
app.use(express.json({ limit: "6mb" }));

app.get("/api/health", async (_req, res) => {
  try {
    await query("SELECT 1");
    return res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Database is unavailable."
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/designs", designRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ error: "Internal server error." });
});

async function startServer() {
  try {
    await ensureDatabaseSchema();
  } catch (error) {
    console.error("Database schema sync failed:", error);
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
