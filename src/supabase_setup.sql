-- ══════════════════════════════════════════════════════
--  SETUP SUPABASE — Portfolio Mihary
--  Exécute dans : Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. Table vues
CREATE TABLE IF NOT EXISTS page_views (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page       text NOT NULL DEFAULT 'home',
  user_agent text,
  referrer   text,
  created_at timestamptz DEFAULT now()
);

-- 2. Table messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  from_name  text,
  subject    text,
  created_at timestamptz DEFAULT now()
);

-- 3. RLS — Lecture uniquement pour les admins authentifiés
ALTER TABLE page_views      ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Insertion publique (pour tracker les vues et messages)
CREATE POLICY "public_insert_views" ON page_views
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "public_insert_messages" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Lecture uniquement pour les utilisateurs authentifiés (admin)
CREATE POLICY "admin_read_views" ON page_views
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_read_messages" ON contact_messages
  FOR SELECT TO authenticated USING (true);

-- 4. Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT DO NOTHING;

-- Policy storage : upload uniquement si authentifié
CREATE POLICY "admin_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-media');

CREATE POLICY "public_read_storage" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'portfolio-media');
