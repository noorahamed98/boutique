const express = require("express");
const jwt = require("jsonwebtoken");
const { requireAdminAuth } = require("../middleware/auth");
const { getJwtSecret } = require("../config");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const jwtSecret = getJwtSecret();
  const expiresIn = process.env.JWT_EXPIRES_IN || "8h";

  if (!jwtSecret) {
    return res.status(500).json({ error: "JWT secret is not configured." });
  }

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign(
    {
      username,
      role: "admin"
    },
    jwtSecret,
    { expiresIn }
  );

  return res.json({
    token,
    admin: {
      username,
      role: "admin"
    }
  });
});

router.get("/verify", requireAdminAuth, (req, res) => {
  return res.json({
    authenticated: true,
    admin: req.admin
  });
});

module.exports = router;
