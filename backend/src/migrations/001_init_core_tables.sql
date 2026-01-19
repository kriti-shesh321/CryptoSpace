-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ALERTS
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  coin_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('price_threshold')),
  operator TEXT NOT NULL CHECK (operator IN ('>', '<', 'cross_up', 'cross_down')),
  value NUMERIC NOT NULL,
  cooldown_seconds INTEGER DEFAULT 1800,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_alerts_user_active ON alerts(user_id, is_active);
CREATE INDEX idx_alerts_coin_active ON alerts(coin_id, is_active);

-- ALERT HISTORY
CREATE TABLE alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
  trigger_price NUMERIC NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT now(),
  delivered_via TEXT[],
  delivery_idempotency_key TEXT UNIQUE
);

CREATE INDEX idx_alert_history_alert ON alert_history(alert_id);
CREATE INDEX idx_alert_history_triggered_at ON alert_history(triggered_at);


-- PRICE SNAPSHOTS
CREATE TABLE price_snapshots (
  id BIGSERIAL PRIMARY KEY,
  coin_id TEXT NOT NULL,
  price NUMERIC NOT NULL,
  ts TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_price_snapshots_coin_ts ON price_snapshots(coin_id, ts DESC);

-- EMAIL QUEUE (mocked delivery)
CREATE TABLE email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending','sent','failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  sent_at TIMESTAMPTZ
);