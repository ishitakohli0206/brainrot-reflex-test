# 🧠 Brainrot Reflex Test

A fast, polished, and lightweight 30-second online reaction game built with **React 19**, **TypeScript**, **Vite 8**, and **Vanilla CSS**. Features synthesized **Web Audio API** sound effects, dynamic difficulty progression, combo streaks, funny internet ranks, and pre-rendered static HTML routes designed for technical SEO.

---

## ⚡ Quick Start

### 1. Requirements
- Node.js `v18+` or higher (tested on Node v24)
- npm `v9+` or higher

### 2. Local Installation & Development

```bash
# Navigate to the project directory
cd brainrot-reflex-test

# Install dependencies (only lightweight React and Vite)
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser to play immediately.

### 3. Production Build & Preview

```bash
# Typecheck and build optimized static assets
npm run build

# Preview the production build locally
npm run preview
```

The output is bundled into the `dist/` directory as self-contained static HTML, CSS, and JS files.

---

## 🎮 Game Concept & Architecture

### Gameplay Flow
1. **HOME SCREEN**: Visual preview of targets, player's personal best record, and "START CHAOS" button.
2. **3-SECOND COUNTDOWN**: 3... 2... 1... GO! with synchronized audio beeps and scaling animations.
3. **30-SECOND GAMEPLAY**:
   - Instruction Banner prompts (e.g. *"TAP THE GREEN GREMLIN 👽"*, *"FIND THE SUS FACE 👀"*, *"WHERE IS THE BRAIN? 🧠"*).
   - Dynamic non-overlapping emoji target layout with touch-friendly 76px tap targets.
   - **Correct Target**: +100 base pts, +(Combo × 15) multiplier, +25 rapid reflex bonus (<600ms), ascending musical pitch chime.
   - **Decoy Target**: -50 points, combo streak reset, red screen shake, comical buzzer sound.
   - **Dynamic Difficulty**: As remaining time ticks down (30s &rarr; 22s &rarr; 14s &rarr; 7s), decoy count rises from 4 to 9 targets with subtle jitter and scale shifts.
   - **Bonus Targets**: Rare golden stars spawn (+250 points).
4. **GAME OVER MODAL**:
   - Final score, Accuracy percentage, Highest combo, and All-time best record.
   - Funny rank badge and quote.
   - **"PLAY AGAIN"** button (instant restart).
   - **"SHARE RESULT"** button (Web Share API with automatic clipboard fallback).
   - **"HOME"** button.

### Funny Rank Thresholds (`src/game/config.ts`)
| Score Range | Rank Title | Badge | Description |
| :--- | :--- | :---: | :--- |
| **0 – 99** | Certified NPC | 🤖 | Bruh, are your fingers lagging? Standard factory settings detected. |
| **100 – 249** | Brainrot Apprentice | 👶 | Beginning to tap the chaos. Skibidi reflex instincts warming up. |
| **250 – 449** | Reflex Goblin | 👺 | Fast fingers and mischievous energy. You react faster than standard internet speed. |
| **450 – 699** | Sigma Reflex | 🗿 | Built different. High-velocity visual processing and pure clutch reflexes. |
| **700+** | Chronically Online | ⚡ | Zero ping detected. Transcended reality into pure reflex godhood. |

All thresholds, scoring multipliers, target rosters, and gameplay timings can be adjusted inside a single configuration file: `src/game/config.ts`.

---

## 📁 Project Structure

```
brainrot-reflex-test/
├── public/
│   ├── favicon.svg             # Glowing neon vector favicon
│   ├── og-image.svg            # Social media Open Graph preview card
│   ├── robots.txt              # Search engine crawler instructions
│   └── sitemap.xml             # XML sitemap of all public URLs
├── src/
│   ├── components/
│   │   ├── CountdownOverlay.tsx # 3-2-1 animated countdown overlay
│   │   ├── Footer.tsx          # Accessible footer with crawlable links & disclaimer
│   │   ├── GameBoard.tsx       # Interactive arena, target buttons, and floating feedback
│   │   ├── GameHUD.tsx         # Score, Combo, Time bar, and Best display
│   │   ├── GameOverModal.tsx   # Results modal, accuracy, rank, and Share actions
│   │   ├── Header.tsx          # Sticky navigation, logo, SFX toggle, and Best badge
│   │   └── SEOContent.tsx      # Rich homepage content, rules, scoring table, and FAQ schema
│   ├── game/
│   │   ├── config.ts           # Central gameplay rules, ranks, targets, and domain settings
│   │   ├── types.ts            # Strong TypeScript definitions for targets, rounds, and stats
│   │   └── useBrainrotGame.ts  # Master React game loop hook with audio & accuracy tracking
│   ├── pages/
│   │   ├── AboutPage.tsx       # /about/ background story, tech stack, and mission
│   │   ├── HomePage.tsx        # / main game arena + SEO content
│   │   ├── HowToPlayPage.tsx   # /how-to-play/ complete guide + interactive warm-up drill
│   │   ├── NotFoundPage.tsx    # /404 meme error page
│   │   ├── PrivacyPage.tsx     # /privacy/ localStorage transparency & data policy
│   │   └── ReactionTimePage.tsx# /reaction-time-game/ reflex science & medical disclaimer
│   ├── utils/
│   │   ├── confetti.ts         # Zero-dependency canvas particle celebration engine
│   │   ├── sound.ts            # Procedural Web Audio API sound synthesizer
│   │   └── storage.ts          # Safe localStorage wrapper with error boundaries
│   ├── App.tsx                 # Client router supporting history navigation
│   ├── index.css               # Vanilla CSS arcade design system and mobile styling
│   └── main.tsx                # React DOM root entry point
├── how-to-play/index.html      # Static pre-rendered HTML template for /how-to-play/
├── reaction-time-game/index.html # Static pre-rendered HTML template for /reaction-time-game/
├── about/index.html            # Static pre-rendered HTML template for /about/
├── privacy/index.html          # Static pre-rendered HTML template for /privacy/
├── 404.html                    # Static 404 error page template
├── index.html                  # Root HTML template with pre-rendered SEO content
├── netlify.toml                # Configuration for Netlify deployment
├── package.json
├── tsconfig.json
├── vercel.json                 # Configuration for Vercel deployment
└── vite.config.ts              # Multi-page Vite rollup configuration
```

---

## 🚀 Free Deployment Guide

This project contains zero backend dependencies, zero databases, and zero API keys. It builds into 100% static files and is ready for **free hosting** on Vercel, Netlify, or Cloudflare Pages.

### Option A: Deploying on Vercel (Recommended)
1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Brainrot Reflex Test"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/brainrot-reflex-test.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New Project"** &rarr; Select your `brainrot-reflex-test` repository.
4. Keep the default build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**. Your site is live in under 45 seconds!

### Option B: Deploying on Netlify
1. Go to [netlify.com](https://netlify.com/) and sign in.
2. Click **"Add new site"** &rarr; **"Import an existing project"** &rarr; Select GitHub.
3. Netlify will automatically detect `netlify.toml` with:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **"Deploy site"**.

### Option C: Deploying on Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com/) &rarr; **Workers & Pages** &rarr; **Create application** &rarr; **Pages**.
2. Connect your GitHub repository.
3. Build preset: `Vite`.
4. Build command: `npm run build`.
5. Output folder: `dist`.
6. Click **"Save and Deploy"**.

---

## 🔍 SEO Setup & Google Search Console Guide

### 1. Update the Production Domain Placeholder
Before deploying, replace `https://YOUR-DOMAIN.com` with your live domain:
1. Open `src/game/config.ts` and set:
   ```ts
   PRODUCTION_DOMAIN: 'https://your-custom-domain.com',
   ```
2. Replace `https://YOUR-DOMAIN.com` in:
   - `public/robots.txt`
   - `public/sitemap.xml`
   - `index.html` (canonical link & open graph tags)
   - `how-to-play/index.html`
   - `reaction-time-game/index.html`
   - `about/index.html`
   - `privacy/index.html`

Run `npm run build` to update your static distribution files.

### 2. Connect Google Search Console
1. Visit [Google Search Console](https://search.google.com/search-console).
2. Click **"Add Property"**.
3. Choose your verification method:
   - **URL Prefix**: Enter `https://your-custom-domain.com/`.
   - **HTML Tag verification**: Copy the `<meta name="google-site-verification" content="..." />` tag and paste it inside the `<head>` of `index.html`.
4. Deploy the change and click **"Verify"** in Search Console.

### 3. Submit Your Sitemap
1. In Search Console, select your property from the left sidebar.
2. Click on **"Sitemaps"** under the *Indexing* menu.
3. In the "Add a new sitemap" input, enter `sitemap.xml` (or `https://your-custom-domain.com/sitemap.xml`).
4. Click **"Submit"**.
5. Verify that the status turns to **"Success"**.

### 4. Request URL Indexing
1. Use the top search bar in Search Console: **"Inspect any URL in..."**.
2. Enter your homepage: `https://your-custom-domain.com/`.
3. Click **"Request Indexing"**.
4. Repeat for your high-intent guide pages (`/how-to-play/` and `/reaction-time-game/`).

### 5. Monitor Impressions, Clicks, and Ranking Status
1. Navigate to **"Performance" &rarr; "Search results"** in Google Search Console.
2. Track:
   - **Total Clicks**: Number of users entering from Google search.
   - **Total Impressions**: How many times your game was displayed in search results.
   - **Average CTR (Click-Through Rate)**.
   - **Average Position**: Monitor organic rank progress over 2–6 weeks as Google indexes your pages.
3. Check the **"Pages"** tab to verify that none of your URLs have indexing errors or duplicate canonical tags.

---

## 📱 Accessibility & Performance

- **Zero External Audio Files**: Uses the Web Audio API for 100% offline-compatible, 0ms latency procedural sounds.
- **Zero Third-Party Trackers**: 100% client-side score storage via `localStorage`.
- **Keyboard Friendly**: Full tab index and Enter/Space support for target interaction.
- **Mobile Touch Optimized**: `touch-action: manipulation` eliminates double-tap zoom delays on iOS Safari and Android Chrome.
- **Reduced Motion Support**: Respects `@media (prefers-reduced-motion: reduce)`.
