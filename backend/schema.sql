DROP TABLE IF EXISTS public.pastes;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public.pastes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  expires_at TIMESTAMP NULL,
  max_views INTEGER NULL,
  views INTEGER NOT NULL DEFAULT 0
);
