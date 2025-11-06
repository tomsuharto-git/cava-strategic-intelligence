# Deployment Guide

This guide covers multiple deployment options for the CAVA Strategic Intelligence website.

## 🚀 Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd cava-strategic-site
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? `cava-strategic-site`
- In which directory is your code located? `./`

Your site will be deployed and you'll get a URL like: `https://cava-strategic-site.vercel.app`

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js - just click "Deploy"

### Environment Variables

No environment variables are required for basic deployment.

## 🌐 Netlify

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the site
npm run build

# Deploy
netlify deploy --prod
```

### Via Netlify Dashboard

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

## ☁️ AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. "New app" → "Host web app"
4. Connect your GitHub repository
5. Build settings (auto-detected):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
6. Click "Save and deploy"

## 🐳 Docker Deployment

### Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t cava-strategic-site .

# Run container
docker run -p 3000:3000 cava-strategic-site
```

## 🖥️ Self-Hosted (VPS/Dedicated Server)

### Prerequisites

- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+ installed
- Nginx installed (for reverse proxy)

### Setup Steps

1. **Clone and build**:
```bash
git clone <your-repo>
cd cava-strategic-site
npm install
npm run build
```

2. **Install PM2** (process manager):
```bash
npm install -g pm2
pm2 start npm --name "cava-site" -- start
pm2 save
pm2 startup
```

3. **Configure Nginx**:

Create `/etc/nginx/sites-available/cava-site`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/cava-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. **SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔒 Security Considerations

### Password Protection

To add basic authentication:

1. **Vercel**: Use Vercel's built-in password protection in project settings

2. **Nginx**: Add basic auth
```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd username
```

Update nginx config:
```nginx
location / {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://localhost:3000;
}
```

### Environment-Based Access

For staging vs production environments, use environment variables:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    // Add authentication check
  }
  return NextResponse.next();
}
```

## 📊 Performance Optimization

### Enable Caching

Add cache headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### CDN Integration

Both Vercel and Netlify provide built-in CDN. For self-hosted:

- Use CloudFlare (free tier available)
- Configure CloudFlare to proxy your domain
- Enable "Cache Everything" page rule

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run ingest
      # Add your deployment step here
```

## 📱 Mobile Preview

Test mobile responsiveness:
- Chrome DevTools device mode
- [BrowserStack](https://www.browserstack.com)
- Physical devices (iOS Safari, Android Chrome)

## 🐛 Troubleshooting

### Build fails

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### 404 on page refresh

Ensure your platform supports Next.js app router:
- Vercel: Auto-configured
- Netlify: Add `_redirects` file:
  ```
  /*    /index.html   200
  ```

### Slow load times

- Enable static export if possible
- Use `next/image` for optimized images
- Implement proper caching strategies

## 📚 Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**Need help?** Contact the development team or open an issue in the repository.
