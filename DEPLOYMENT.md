# Deployment Guide

## Option 1: Manus Hosting (Recommended)

1. Build the project:
```bash
pnpm run build
```

2. Click "Publish" button in Manus UI
3. Custom domain support available
4. Automatic SSL & CDN included

---

## Option 2: Netlify

### Via CLI
```bash
npm install -g netlify-cli
pnpm run build
netlify deploy --prod --dir=dist
```

### Via GitHub
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `pnpm run build`
4. Set publish directory: `dist`

---

## Option 3: Vercel

### Via CLI
```bash
npm install -g vercel
pnpm run build
vercel --prod
```

### Via GitHub
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects settings
4. Deploy with one click

---

## Option 4: GitHub Pages

1. Create GitHub repository
2. Push code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/community_manager_prompt_viewer.git
git push -u origin main
```

3. Enable GitHub Pages in repository settings
4. Select `main` branch and `dist` folder as source
5. Site will be available at: `https://YOUR_USERNAME.github.io/community_manager_prompt_viewer`

---

## Option 5: Docker

### Create Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "preview"]
```

### Build and Run
```bash
docker build -t community-manager .
docker run -p 3000:3000 community-manager
```

---

## Option 6: Railway.app

1. Push code to GitHub
2. Go to https://railway.app
3. Connect GitHub account
4. Select repository
5. Add Node.js service
6. Set build command: `pnpm run build`
7. Set start command: `pnpm run preview`
8. Deploy

---

## Option 7: Render.com

1. Push code to GitHub
2. Go to https://render.com
3. Create new Static Site
4. Connect GitHub repository
5. Set build command: `pnpm run build`
6. Set publish directory: `dist`
7. Deploy

---

## Environment Variables

If you need environment variables, create `.env.production`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Community Manager OS
```

---

## Performance Optimization

Before deployment:

1. **Minify JSON files**:
```bash
npm install -g json-minify
json-minify client/public/prompts.json > client/public/prompts.min.json
```

2. **Check build size**:
```bash
pnpm run build --verbose
```

3. **Analyze bundle**:
```bash
npm install -g vite-plugin-visualizer
```

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify search functionality works
- [ ] Test filtering on Prompts page
- [ ] Check responsive design on mobile
- [ ] Verify copy-to-clipboard works
- [ ] Test heart/favorite functionality
- [ ] Check blog article navigation
- [ ] Verify logo links to home page
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check page load speed (target: < 3s)
- [ ] Verify SEO meta tags
- [ ] Test analytics tracking (if enabled)

---

## Monitoring

### Uptime Monitoring
- Use UptimeRobot (free tier available)
- Set up alerts for downtime

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Check Lighthouse scores

### Error Tracking
- Set up Sentry for error monitoring
- Enable browser console logging

---

## Rollback

If deployment fails:

1. **Netlify**: Automatic rollback to previous deploy
2. **Vercel**: Click "Rollback" on deployment history
3. **GitHub Pages**: Revert commit and push
4. **Manus**: Use checkpoint rollback feature

---

## Support

For deployment issues:
- Check build logs in deployment platform
- Verify all dependencies are installed
- Ensure `dist` folder is generated
- Check for TypeScript errors: `pnpm run typecheck`

---

**Last Updated**: March 13, 2026
