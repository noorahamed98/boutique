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
