require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const fs = require("node:fs");
const { query } = require("./db");
const { ensureDatabaseSchema } = require("./schema");
const authRoutes = require("./routes/authRoutes");
const designRoutes = require("./routes/designRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

const app = express();
const port = Number(process.env.PORT || 5000);
const clientDistPath = path.resolve(__dirname, "../../client/dist");
const hasClientBuild = fs.existsSync(clientDistPath);
const defaultFrontendOrigins = [
  "http://localhost:5173",
  "http://localhost:4182",
  "http://127.0.0.1:4182",
  "https://app.snehasboutique.online"
];

function parseCsv(value = "") {
  return String(value)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

const allowedOrigins = new Set(
  [...defaultFrontendOrigins, process.env.FRONTEND_URL, ...parseCsv(process.env.FRONTEND_URLS)].filter(Boolean)
);
const allowedOriginSuffixes = parseCsv(process.env.FRONTEND_URL_SUFFIXES);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      if (allowedOriginSuffixes.some((suffix) => origin.endsWith(suffix))) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    }
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
app.use("/api/metrics", metricsRoutes);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({ error: error.message });
  }

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
