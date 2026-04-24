const express = require("express");
const { query } = require("../db");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const result = await query(
      `
      SELECT metric_key, metric_value
      FROM site_metrics
      WHERE metric_key IN ('whatsapp_inquiries')
      `
    );

    const metrics = Object.fromEntries(result.rows.map((row) => [row.metric_key, Number(row.metric_value || 0)]));

    return res.json({
      whatsappInquiries: metrics.whatsapp_inquiries || 0
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/whatsapp-inquiries", async (_req, res, next) => {
  try {
    await query(
      `
      INSERT INTO site_metrics (metric_key, metric_value)
      VALUES ('whatsapp_inquiries', 1)
      ON CONFLICT (metric_key)
      DO UPDATE SET
        metric_value = site_metrics.metric_value + 1,
        updated_at = NOW()
      `
    );

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
