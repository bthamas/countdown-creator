# Countdown Creator

A gyönyörű, testreszabható visszaszámláló alkalmazás különleges eseményekhez. Készíts egyedi countdown timereket egyedi témákkal, gradient hátterekkel és saját képekkel.

## 🚀 Funkciók

- **Egyedi témák**: Válassz előre elkészített témák közül (esküvő, születésnap, nyugdíjba vonulás, stb.)
- **Egyedi gradient hátterek**: Állítsd be a kezdő és vég színeket, valamint az irányt
- **Saját háttérképek**: Tölts fel saját képeket háttérként
- **Intelligens dátum bevitel**: Automatikus tab funkció év-hónap-nap mezők között
- **Megosztás**: Supabase integráció a countdown-ok tárolásához és megosztásához
- **Reszponzív design**: Modern UI komponensek Tailwind CSS-sel
- **Link másolás**: Intelligens clipboard támogatás minden böngészőben

## 🛠️ Technológiai stack

- **Frontend**: React 18 + TypeScript
- **Build tool**: Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage)
- **Icons**: Lucide React
- **Date handling**: date-fns

## 📦 Telepítés és futtatás

### Előfeltételek

- Node.js 18+ 
- npm vagy yarn

### Lépések

```bash
# 1. Klónozd le a repository-t
git clone https://github.com/bthamas/countdown-creator.git

# 2. Navigálj a projekt mappájába
cd countdown-creator

# 3. Telepítsd a függőségeket
npm install

# 4. Indítsd el a fejlesztői szervert
npm run dev
```

Az alkalmazás elérhető lesz a `http://localhost:8080` címen.

## 🗄️ Supabase beállítás

A teljes funkcionalitáshoz (countdown megosztás) be kell állítani a Supabase adatbázist:

1. **Supabase projekt létrehozása**: Menj a [Supabase Dashboard](https://supabase.com/dashboard)-ra
2. **API kulcs beszerzése**: Settings > API > másold ki az anon public kulcsot
3. **Konfiguráció frissítése**: Cseréld le a `src/integrations/supabase/client.ts` fájlban a `SUPABASE_PUBLISHABLE_KEY` értékét
4. **Adatbázis tábla létrehozása**: Futtasd le a `supabase_setup.sql` scriptet a Supabase SQL Editor-ben

Részletes útmutató: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🎨 Használat

1. **Esemény létrehozása**: Add meg az esemény nevét és dátumát
2. **Téma választása**: Válassz egy előre elkészített témát vagy hozz létre egyedit
3. **Testreszabás**: Állítsd be a színeket, gradient irányt vagy tölts fel saját képet
4. **Megosztás**: Kattints a megosztás gombra a link másolásához

## 📁 Projekt struktúra

```
src/
├── components/          # React komponensek
│   ├── ui/             # shadcn/ui komponensek
│   ├── CountdownDisplay.tsx
│   ├── CreateCountdownForm.tsx
│   └── SchemeCard.tsx
├── pages/              # Oldal komponensek
├── hooks/              # Custom React hook-ok
├── data/               # Statikus adatok
├── integrations/       # Külső szolgáltatások
│   └── supabase/       # Supabase konfiguráció
├── types/              # TypeScript típusok
└── lib/                # Segédfüggvények
```

## 🚀 Deployment

### Vercel (ajánlott)

```bash
# Vercel CLI telepítése
npm i -g vercel

# Deployment
vercel
```

### Netlify

```bash
# Build
npm run build

# Netlify CLI telepítése
npm i -g netlify-cli

# Deployment
netlify deploy --prod --dir=dist
```

## 🤝 Közreműködés

1. Fork-old a repository-t
2. Hozz létre egy feature branch-et (`git checkout -b feature/amazing-feature`)
3. Commit-old a változtatásaidat (`git commit -m 'Add amazing feature'`)
4. Push-old a branch-et (`git push origin feature/amazing-feature`)
5. Nyiss egy Pull Request-et

## 📄 Licenc

Ez a projekt MIT licenc alatt áll. Lásd a [LICENSE](LICENSE) fájlt részletekért.

## 🔗 Linkek

- **GitHub Repository**: https://github.com/bthamas/countdown-creator
- **Supabase**: https://supabase.com
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com

## 📞 Kapcsolat

Ha kérdésed van vagy visszajelzést szeretnél adni, nyiss egy [Issue](https://github.com/bthamas/countdown-creator/issues)-t a GitHub-on.

---

**Készítette**: [bthamas](https://github.com/bthamas) ❤️