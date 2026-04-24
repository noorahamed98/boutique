CREATE TABLE IF NOT EXISTS designs (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  price NUMERIC(10, 2),
  original_price NUMERIC(10, 2),
  badge VARCHAR(32),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE designs ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2);
ALTER TABLE designs ADD COLUMN IF NOT EXISTS original_price NUMERIC(10, 2);
ALTER TABLE designs ADD COLUMN IF NOT EXISTS badge VARCHAR(32);

CREATE INDEX IF NOT EXISTS designs_category_idx ON designs (category);

CREATE TABLE IF NOT EXISTS site_metrics (
  metric_key VARCHAR(64) PRIMARY KEY,
  metric_value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_metrics (metric_key, metric_value)
VALUES ('whatsapp_inquiries', 0)
ON CONFLICT (metric_key) DO NOTHING;

CREATE OR REPLACE FUNCTION set_design_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_designs_updated_at ON designs;

CREATE TRIGGER trg_designs_updated_at
BEFORE UPDATE ON designs
FOR EACH ROW
EXECUTE FUNCTION set_design_updated_at();
