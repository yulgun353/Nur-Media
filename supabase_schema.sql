-- ============================================================
-- NUR Media — Supabase Database Schema
-- Project URL: https://xigbxymwcvkmnjfebqot.supabase.co
-- Project ID:  xigbxymwcvkmnjfebqot
-- ============================================================

-- 1. Create Leads / Inquiries Table
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    service TEXT,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Site Content & Settings Table
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY DEFAULT 'main',
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 4. Policies for Leads Table
CREATE POLICY "Allow public insert to leads" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select leads" ON public.leads
    FOR SELECT USING (true);

CREATE POLICY "Allow public update leads" ON public.leads
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete leads" ON public.leads
    FOR DELETE USING (true);

-- 5. Policies for Site Content Table
CREATE POLICY "Allow public read site_content" ON public.site_content
    FOR SELECT USING (true);

CREATE POLICY "Allow public write site_content" ON public.site_content
    FOR ALL USING (true);

-- ============================================================
-- Schema Setup Complete ✓
-- ============================================================
