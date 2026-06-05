CREATE TABLE watchlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    coin_id TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT now(),

    UNIQUE(user_id, coin_id)
);

CREATE INDEX idx_watchlist_user ON watchlist_items(user_id);