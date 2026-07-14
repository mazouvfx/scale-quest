# 🎹 Scale Quest — Neon Piano Trainer

> Memorize scales, licks & jazz/funk patterns — gamified, with Synthesia-style piano roll + MIDI support.

## Stack
- **Next.js 14** (App Router)
- **Supabase** (auth + progress persistence)
- **Web MIDI API** (Roland Juno D7 + any class-compliant MIDI device)
- **Tone.js** (audio synthesis)
- **Framer Motion** (animations)
- **Tailwind CSS v4**

## Features
- 🎮 **Game mode** — XP, combos, levels, badges
- 🎹 **MIDI input** — play your Juno D7 and the app detects correct notes
- 🎵 **Piano roll** — Synthesia-style falling notes
- 📚 **Scale library** — pentatonic, diminished, jazz modes, funk
- 🎸 **Lick trainer** — Oscar Peterson-style, bebop, funk cells
- 📱 **Works everywhere** — phone, tablet, desktop (no piano needed)
- ☁️ **Cloud progress** — Supabase syncs XP + badges across devices

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mazouvfx/scale-quest)

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel env vars.

## MIDI setup (Roland Juno D7 + iPad)
1. Connect Juno D7 via USB to iPad (or via USB-C hub)
2. Open Scale Quest in **Web MIDI Browser** app (iOS) or Safari/Chrome (desktop)
3. Allow MIDI access when prompted
4. The app auto-detects your keyboard — start playing!

## Supabase schema
Run `supabase/schema.sql` in your Supabase SQL editor.
