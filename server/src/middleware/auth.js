const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../config");

function getTokenFromHeader(headerValue = "") {
  const [scheme, token] = headerValue.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }
  return token;
}

function requireAdminAuth(req, res, next) {
  const token = getTokenFromHeader(req.headers.authorization);
  const jwtSecret = getJwtSecret();

  if (!jwtSecret) {
    return res.status(500).json({ error: "JWT secret is not configured." });
  }

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.admin = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

module.exports = { requireAdminAuth, getTokenFromHeader };
