-- =========================================
-- SUPABASE RESUME BUILDER SCHEMA
-- =========================================

-- users table is managed by Supabase Auth automatically

CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Resume',
  region TEXT NOT NULL DEFAULT 'bd',
  data JSONB NOT NULL DEFAULT '{}',
  template_id TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE resume_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own resumes
CREATE POLICY "Users can only access their own resumes"
ON resumes
FOR ALL
USING (auth.uid() = user_id);

-- Users can only access versions of their own resumes
CREATE POLICY "Users can only access their own versions"
ON resume_versions
FOR ALL
USING (
  resume_id IN (
    SELECT id FROM resumes WHERE user_id = auth.uid()
  )
);