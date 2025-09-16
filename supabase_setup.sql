-- Supabase adatbázis beállítás script
-- Futtatandó a Supabase SQL Editor-ben

-- Countdowns tábla létrehozása
CREATE TABLE IF NOT EXISTS countdowns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    target_date TIMESTAMPTZ NOT NULL,
    scheme TEXT NOT NULL,
    custom_background TEXT,
    custom_color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) engedélyezése
ALTER TABLE countdowns ENABLE ROW LEVEL SECURITY;

-- Mindenki olvashatja a countdown-okat (publikus megosztáshoz)
CREATE POLICY "Anyone can read countdowns" ON countdowns
    FOR SELECT USING (true);

-- Mindenki létrehozhat countdown-okat
CREATE POLICY "Anyone can create countdowns" ON countdowns
    FOR INSERT WITH CHECK (true);

-- Indexek a jobb teljesítményért
CREATE INDEX IF NOT EXISTS idx_countdowns_created_at ON countdowns(created_at);
CREATE INDEX IF NOT EXISTS idx_countdowns_target_date ON countdowns(target_date);

-- Updated_at automatikus frissítése
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_countdowns_updated_at 
    BEFORE UPDATE ON countdowns 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
