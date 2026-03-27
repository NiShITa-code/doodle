-- Run this code in your Supabase SQL Editor to create the required tables for Doodle Bound

-- 1. Create the Users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the Canvas Rooms table
CREATE TABLE IF NOT EXISTS public.canvases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES public.users(id),
    name TEXT NOT NULL,
    type TEXT DEFAULT 'group', -- 'couple' or 'group'
    color TEXT DEFAULT '#a7295a',
    beacon TEXT, -- E.g. "At the library"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the Canvas Snapshots table (FOR THE HOME SCREEN WIDGET)
-- Every time someone draws, we upload a Base64 string of the widget here so the Native iOS/Android code can fetch it lightly.
CREATE TABLE IF NOT EXISTS public.canvas_snapshots (
    canvas_id UUID PRIMARY KEY REFERENCES public.canvases(id) ON DELETE CASCADE,
    snapshot_base64 TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create the Realtime Elements table (for individual strokes and photos while inside the app)
CREATE TABLE IF NOT EXISTS public.canvas_elements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    canvas_id UUID REFERENCES public.canvases(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'stroke' or 'image'
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Realtime for the canvases and elements!
ALTER PUBLICATION supabase_realtime ADD TABLE canvases;
ALTER PUBLICATION supabase_realtime ADD TABLE canvas_elements;
