# AI Community Manager OS - Setup Guide for VSCode

## Quick Start (5 minutes)

### 1. Prerequisites
- **Node.js 18+** - Download from https://nodejs.org
- **pnpm** - Install globally: `npm install -g pnpm`
- **VSCode** - Download from https://code.visualstudio.com

### 2. Installation

```bash
# Extract the project folder
cd community_manager_prompt_viewer

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### 3. Open in Browser
- Local: http://localhost:3000
- Network URL shown in terminal

### 4. Open in VSCode
```bash
code .
```

---

## Project Structure

```
community_manager_prompt_viewer/
├── client/
│   ├── public/
│   │   ├── prompts.json              # 10,000 AI prompts
│   │   ├── blog_posts_1000.json      # 160+ blog articles
│   │   └── spark-collective-logo.png # Brand logo
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Prompts page
│   │   │   └── Blog.tsx              # Blog page
│   │   ├── components/
│   │   │   └── BlogSidebar.tsx       # Blog navigation
│   │   ├── App.tsx                   # Router & layout
│   │   ├── main.tsx                  # React entry
│   │   └── index.css                 # Global styles
│   └── index.html                    # HTML template
├── package.json
├── vite.config.ts
└── README.md
```

---

## Available Commands

```bash
# Development server (with hot reload)
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run typecheck

# Linting
pnpm run lint
```

---

## Features

### Prompts Page
- 10,000 AI prompts across 10 platforms
- Advanced filtering by platform, category, tone, situation
- Real-time search
- Save favorites (heart icon)
- One-click copy to clipboard
- Responsive design

### Blog Page
- 160+ SEO-optimized articles
- Category navigation with purple badges
- Search functionality
- Clean white background with black text
- Consistent branding

### Design
- **White background** with black text
- **Purple accents** for interactive elements
- **2x larger logo** for strong branding
- **Responsive** on mobile, tablet, desktop
- **Fast loading** (~2s on 4G)

---

## Customization

### Update Logo
Replace `/client/public/spark-collective-logo.png` with your logo

### Update Branding
Edit in these files:
- `client/src/pages/Home.tsx` - Prompts title & description
- `client/src/pages/Blog.tsx` - Blog title & description
- `client/src/index.css` - Global colors

### Add More Prompts
Update `/client/public/prompts.json`:
```json
{
  "id": 10001,
  "platform": "WhatsApp",
  "category": "Engagement",
  "tone": "Professional",
  "situation": "New Member Welcome",
  "prompt": "Your prompt text here..."
}
```

### Add Blog Posts
Update `/client/public/blog_posts_1000.json`:
```json
{
  "id": "article-slug",
  "category": "Community Building",
  "title": "Article Title",
  "slug": "article-slug",
  "excerpt": "Short description...",
  "content": "Full article content...",
  "author": "Author Name",
  "publishedAt": "2026-03-13",
  "readTime": 5,
  "featured": true,
  "keywords": ["keyword1", "keyword2"]
}
```

---

## Deployment

### Option 1: Manus Hosting (Recommended)
- Built-in hosting with custom domain
- Click "Publish" button in Manus UI
- Automatic SSL & CDN

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Option 4: GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in settings
3. Select `dist` folder as source

---

## Troubleshooting

### Port Already in Use
```bash
pnpm run dev -- --port 3001
```

### Dependencies Issues
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors
```bash
pnpm run build --verbose
```

### Browser Cache Issues
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache in DevTools

---

## VSCode Extensions (Optional but Recommended)

1. **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
2. **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
3. **TypeScript Vue Plugin** - Vue.volar
4. **Prettier** - esbenp.prettier-vscode
5. **ESLint** - dbaeumer.vscode-eslint

---

## Performance Tips

- **Lazy load images** for faster initial load
- **Code split** large components with React.lazy()
- **Minify** JSON data files
- **Use CDN** for static assets in production

---

## Support & Resources

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev

---

## License

© 2026 Spark Collective. All rights reserved.

---

**Last Updated**: March 13, 2026
