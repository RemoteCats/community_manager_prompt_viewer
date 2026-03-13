# Quick Start Guide - 3 Steps to Run

## Step 1: Install Dependencies
```bash
pnpm install
```

## Step 2: Start Development Server
```bash
pnpm run dev
```

## Step 3: Open in Browser
- **Local**: http://localhost:3000
- **Network**: Check terminal output for network URL

---

## Open in VSCode
```bash
code .
```

---

## Build for Production
```bash
pnpm run build
```

Output will be in the `dist/` folder.

---

## Common Issues

**Port 3000 already in use?**
```bash
pnpm run dev -- --port 3001
```

**Dependencies not installing?**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Project Features

✅ 10,000 AI prompts with advanced filtering
✅ 160+ blog articles with search
✅ White background with black text design
✅ Purple accent colors for interactive elements
✅ 2x larger logo for strong branding
✅ Fully responsive (mobile, tablet, desktop)
✅ Fast loading and optimized performance

---

## File Locations

- **Prompts data**: `client/public/prompts.json`
- **Blog data**: `client/public/blog_posts_1000.json`
- **Logo**: `client/public/spark-collective-logo.png`
- **Prompts page**: `client/src/pages/Home.tsx`
- **Blog page**: `client/src/pages/Blog.tsx`
- **Styles**: `client/src/index.css`

---

**Need help?** See `SETUP.md` for detailed documentation.
