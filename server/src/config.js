const ALLOWED_CATEGORIES = ["Fabrics", "Handlooms", "Materials", "Custom Made"];

function getJwtSecret() {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  if (process.env.NODE_ENV === "production") {
    return "";
  }

  return "snehas-boutique-dev-secret";
}

module.exports = {
  ALLOWED_CATEGORIES,
  getJwtSecret
};
