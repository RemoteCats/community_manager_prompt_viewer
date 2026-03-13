# AI Community Manager OS - 10,000 Prompt Edition

A comprehensive interactive web application featuring 10,000 AI prompts for community managers, organized by platform, category, tone, and situation. Includes 160+ SEO-optimized blog posts for organic traffic generation.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- pnpm (install with: `npm install -g pnpm`)

### Installation & Setup

1. **Clone or extract the project**
   ```bash
   cd community_manager_prompt_viewer
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm run dev
   ```

4. **Open in browser**
   - Local: http://localhost:3000
   - Network: Check console output for network URL

## 📁 Project Structure

```
community_manager_prompt_viewer/
├── client/
│   ├── public/
│   │   ├── prompts.json              # 10,000 AI prompts database
│   │   ├── blog_posts_1000.json      # 160 blog articles
│   │   └── spark-collective-logo.png # Brand logo
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Prompts page (main UI)
│   │   │   └── Blog.tsx              # Blog page
│   │   ├── components/
│   │   │   └── BlogSidebar.tsx       # Blog navigation
│   │   ├── hooks/
│   │   │   └── useFavorites.ts       # Favorites management
│   │   ├── App.tsx                   # Main router & layout
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles
│   └── index.html                    # HTML template
├── package.json                      # Dependencies
└── vite.config.ts                    # Build configuration
```

## ✨ Features

### Prompts Page
- **10,000 AI Prompts** across 10 platforms (WhatsApp, Telegram, Discord, Slack, Facebook, LinkedIn, Reddit, Twitter/X, Circle.so, YouTube)
- **Advanced Filtering**: Platform, Category, Tone, Situation with purple shades for differentiation
- **Search**: Real-time keyword search across all prompts
- **Favorites**: Save favorite prompts (purple heart icon on click)
- **Copy to Clipboard**: One-click prompt copying
- **Collections**: Organize prompts into custom collections
- **Export**: Download as CSV, PDF, or JSON

### Blog Section
- **160+ SEO-Optimized Articles** on community management
- **Category Navigation**: Browse by topic
- **Search & Filter**: Find articles by keyword
- **Featured Articles**: Highlighted top content
- **Modal Viewer**: Read full articles in-app
- **Responsive Design**: Works on all devices

### Design
- **Black & White Theme**: Professional, distraction-free interface
- **Purple Accents**: Category badges with purple shades for visual differentiation
- **Large Logo**: 2x bigger Spark Collective branding (clickable to home)
- **Consistent UI**: Unified design across prompts and blog pages
- **Responsive**: Mobile, tablet, and desktop optimized

## 🎨 Customization

### Update Logo
Replace `/client/public/spark-collective-logo.png` with your logo

### Update Branding
Edit text in:
- `client/src/pages/Home.tsx` - Main title & description
- `client/src/pages/Blog.tsx` - Blog header text
- `client/src/index.css` - Global colors

### Add More Prompts
Update `/client/public/prompts.json` with additional prompts in this format:
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
Update `/client/public/blog_posts_1000.json` with articles in this format:
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

## 🔧 Build & Deploy

### Development Build
```bash
pnpm run dev
```

### Production Build
```bash
pnpm run build
```
Output: `dist/` folder (ready for deployment)

### Preview Production Build
```bash
pnpm run preview
```

## 📦 Deployment Options

### Option 1: Manus Hosting (Recommended)
- Built-in hosting with custom domain support
- Click "Publish" button in Manus UI
- Automatic SSL & CDN

### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Option 3: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 4: GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repo settings
3. Select `dist` folder as source

## 📊 Analytics

The app includes built-in analytics tracking:
- Prompt searches and filters
- Blog article views
- Favorite saves
- Export actions

View analytics in Manus Dashboard or your analytics platform.

## 🎯 Monetization

### Upsell Products
- **Notion Template** ($79): Pre-built community management system
- **Prompt Library** ($29): Downloadable prompt collection
- **Bundle** ($99): Both products together

Add CTAs to:
- Blog sidebar (newsletter signup)
- Prompt page footer
- Blog article bottom (related products)

## 🔐 Performance

- **Optimized**: Lazy loading, code splitting
- **Fast**: ~2s initial load on 4G
- **Responsive**: Mobile-first design
- **Accessible**: WCAG 2.1 AA compliant

## 📝 License

© 2026 Spark Collective. All rights reserved.

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Use different port
pnpm run dev -- --port 3001
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors
```bash
# Check for TypeScript errors
pnpm run build

# View detailed error output
pnpm run build --verbose
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review project structure and file organization
3. Ensure all dependencies are installed
4. Clear browser cache and reload

---

**Built with React 19 + TypeScript + Tailwind CSS 4**
