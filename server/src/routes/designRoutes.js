const express = require("express");
const { randomUUID } = require("node:crypto");
const { query } = require("../db");
const { requireAdminAuth } = require("../middleware/auth");
const { ALLOWED_CATEGORIES } = require("../config");

const router = express.Router();

const CATEGORY_LOOKUP = new Map([
  ["fabrics", "Fabrics"],
  ["fabric", "Fabrics"],
  ["textiles", "Fabrics"],
  ["textile", "Fabrics"],
  ["handloom", "Handlooms"],
  ["handlooms", "Handlooms"],
  ["materials", "Materials"],
  ["material", "Materials"],
  ["custom made", "Custom Made"],
  ["custom-made", "Custom Made"],
  ["custommade", "Custom Made"],
  ["custom", "Custom Made"]
]);

function normalizeCategory(value = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return "";

  const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
  return CATEGORY_LOOKUP.get(normalized) || "";
}

function normalizeAmount(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return Number.NaN;
  return Number(parsed.toFixed(2));
}

function normalizeDesignPayload(body = {}) {
  return {
    name: typeof body.name === "string" ? body.name.trim() : "",
    category: normalizeCategory(body.category),
    description: typeof body.description === "string" ? body.description.trim() : "",
    image: typeof body.image === "string" && body.image.trim() ? body.image.trim() : null,
    price: normalizeAmount(body.price),
    originalPrice: normalizeAmount(body.originalPrice ?? body.original_price),
    badge: typeof body.badge === "string" && body.badge.trim() ? body.badge.trim().slice(0, 32) : null
  };
}

function validateDesignPayload(payload) {
  if (!payload.name) return "Design name is required.";
  if (!payload.category) return `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}.`;
  if (!payload.description) return "Description is required.";
  if (Number.isNaN(payload.price)) return "Price must be a valid number.";
  if (Number.isNaN(payload.originalPrice)) return "Original price must be a valid number.";
  if (payload.originalPrice !== null && payload.price === null) {
    return "Add the current price before the original price.";
  }
  if (
    payload.price !== null &&
    payload.originalPrice !== null &&
    payload.originalPrice <= payload.price
  ) {
    return "Original price should be higher than the current price.";
  }
  return null;
}

router.get("/", async (req, res, next) => {
  try {
    const category = normalizeCategory(req.query.category ? String(req.query.category).trim() : "");
    const params = [];
    let sql = `
      SELECT id, name, category, description, image, price, original_price, badge, created_at, updated_at
      FROM designs
    `;

    if (category) {
      params.push(category);
      sql += ` WHERE category = $1`;
    }

    sql += ` ORDER BY updated_at DESC, created_at DESC`;

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
});

router.get("/categories", async (_req, res, next) => {
  try {
    const result = await query(
      `
      SELECT DISTINCT category
      FROM designs
      WHERE category IS NOT NULL AND TRIM(category) <> ''
      ORDER BY category ASC
      `
    );
    return res.json(result.rows.map((row) => row.category));
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAdminAuth, async (req, res, next) => {
  try {
    const payload = normalizeDesignPayload(req.body);
    const validationError = validateDesignPayload(payload);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const id = randomUUID();
    const result = await query(
      `
      INSERT INTO designs (id, name, category, description, image, price, original_price, badge)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, category, description, image, price, original_price, badge, created_at, updated_at
      `,
      [
        id,
        payload.name,
        payload.category,
        payload.description,
        payload.image,
        payload.price,
        payload.originalPrice,
        payload.badge
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", requireAdminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = normalizeDesignPayload(req.body);
    const validationError = validateDesignPayload(payload);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await query(
      `
      UPDATE designs
      SET
        name = $1,
        category = $2,
        description = $3,
        image = $4,
        price = $5,
        original_price = $6,
        badge = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING id, name, category, description, image, price, original_price, badge, created_at, updated_at
      `,
      [
        payload.name,
        payload.category,
        payload.description,
        payload.image,
        payload.price,
        payload.originalPrice,
        payload.badge,
        id
      ]
    );

    if (!result.rowCount) {
      return res.status(404).json({ error: "Design not found." });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", requireAdminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query(`DELETE FROM designs WHERE id = $1 RETURNING id`, [id]);

    if (!result.rowCount) {
      return res.status(404).json({ error: "Design not found." });
    }

    return res.json({ id: result.rows[0].id });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
