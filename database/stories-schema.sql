CREATE TABLE IF NOT EXISTS travel_stories (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  display_name TEXT,
  email TEXT NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  hotel TEXT NOT NULL,
  travel_date TEXT,
  travel_type TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  topics TEXT NOT NULL DEFAULT '[]',
  story TEXT NOT NULL,
  highlights TEXT,
  improvements TEXT,
  social TEXT,
  recommend TEXT,
  anonymous INTEGER NOT NULL DEFAULT 0,
  show_social INTEGER NOT NULL DEFAULT 0,
  media_json TEXT NOT NULL DEFAULT '[]',
  source_ip TEXT,
  moderation_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_travel_stories_status_created
ON travel_stories(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_travel_stories_destination
ON travel_stories(destination);
