CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(90) NOT NULL,
  website_url varchar(500) NOT NULL,
  normalized_url varchar(500) NOT NULL UNIQUE,
  image_url varchar(500),
  description varchar(240) NOT NULL,
  category varchar(24) NOT NULL CHECK (category IN ('ai', 'mobile', 'gaming', 'home', 'creator', 'accessories')),
  contact_email varchar(254),
  status varchar(24) NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'active', 'suspended', 'rejected')),
  is_curated boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS boost_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid NOT NULL REFERENCES entries(id) ON DELETE RESTRICT,
  idempotency_key uuid NOT NULL UNIQUE,
  stripe_checkout_session_id varchar(255) UNIQUE,
  checkout_url text,
  amount_cents integer NOT NULL CHECK (amount_cents BETWEEN 1000 AND 100000),
  currency char(3) NOT NULL DEFAULT 'eur' CHECK (currency = 'eur'),
  status varchar(24) NOT NULL DEFAULT 'creating' CHECK (status IN ('creating', 'open', 'paid', 'expired', 'failed', 'refunded')),
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS webhook_events (
  stripe_event_id varchar(255) PRIMARY KEY,
  event_type varchar(120) NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS outbound_clicks (
  id bigserial PRIMARY KEY,
  entry_id uuid NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  clicked_at timestamptz NOT NULL DEFAULT now(),
  referrer_host varchar(255)
);

CREATE INDEX IF NOT EXISTS boosts_entry_status_paid_idx ON boost_orders (entry_id, status, paid_at DESC);
CREATE INDEX IF NOT EXISTS clicks_entry_clicked_idx ON outbound_clicks (entry_id, clicked_at DESC);
CREATE INDEX IF NOT EXISTS entries_status_category_idx ON entries (status, category);

INSERT INTO entries (name, website_url, normalized_url, image_url, description, category, status, is_curated)
VALUES
  ('INIU 25,000 mAh Power Bank', 'https://gadgetsmania.org/mejor-power-bank-25000mah/', 'https://gadgetsmania.org/mejor-power-bank-25000mah/', '/assets/img/products/powerbank-iniu.jpg', 'Editorial pick for high-capacity portable power and travel.', 'mobile', 'active', true),
  ('Fire TV Stick 4K', 'https://gadgetsmania.org/reviews/gadgets-curiosos-amazon/', 'https://gadgetsmania.org/reviews/gadgets-curiosos-amazon/', '/assets/img/products/fire-tv-stick-4k.jpg', 'Editorial pick for simple 4K streaming and smart-home setups.', 'home', 'active', true),
  ('Ergonomic Vertical Mouse', 'https://gadgetsmania.org/mejor-raton-vertical-ergonomico/', 'https://gadgetsmania.org/mejor-raton-vertical-ergonomico/', '/assets/img/products/raton_ergonomico_3.jpg', 'Editorial pick for a more comfortable desk and long work sessions.', 'accessories', 'active', true),
  ('Creator USB Microphone', 'https://gadgetsmania.org/reviews/mejor-microfono-usb-calidad-precio/', 'https://gadgetsmania.org/reviews/mejor-microfono-usb-calidad-precio/', '/assets/img/products/microfono_3.jpg', 'Editorial pick for podcasts, streaming and clear calls.', 'creator', 'active', true)
ON CONFLICT (normalized_url) DO NOTHING;
