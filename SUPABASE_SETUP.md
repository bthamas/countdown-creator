# Supabase Adatbázis Beállítás

## Adatbázis Kapcsolat
- **Host**: `db.pshwswrfipeaubhcmxsv.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: `Cdfwaz1988s!`

## Lépések a beállításhoz

### 1. Supabase Dashboard
1. Menj a [Supabase Dashboard](https://supabase.com/dashboard)-ra
2. Válaszd ki a `pshwswrfipeaubhcmxsv` projektet
3. Menj a **Settings** > **API** oldalra
4. Másold ki az **anon public** kulcsot

### 2. API Kulcs Frissítése
1. Menj a Supabase Dashboard **Settings** > **API** oldalára
2. Másold ki az **anon public** kulcsot (ez egy hosszú JWT token)
3. Nyisd meg a `src/integrations/supabase/client.ts` fájlt
4. Cseréld le a `SUPABASE_PUBLISHABLE_KEY` értékét a valódi kulcsra
5. Mentés után az alkalmazás automatikusan frissül

### 3. Adatbázis Tábla Létrehozása
1. Menj a Supabase Dashboard **SQL Editor** oldalára
2. Futtasd le a `supabase_setup.sql` fájl tartalmát

### 4. Tesztelés
Az alkalmazás most már használhatja az új Supabase adatbázist a countdown-ok tárolásához és megosztásához.

## Hibaelhárítás
- Ha 404-es hibákat kapsz, ellenőrizd, hogy a tábla létrejött-e
- Ha kapcsolódási hibákat kapsz, ellenőrizd az API kulcsot
- A böngésző konzolban láthatod a részletes hibaüzeneteket
