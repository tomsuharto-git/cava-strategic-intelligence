# Quick Start Guide

Get the CAVA Strategic Intelligence website running in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Setup Steps

### 1. Install Dependencies

```bash
cd cava-strategic-site
npm install
```

This installs all required packages (Next.js, React, Tailwind CSS, etc.)

### 2. Process Content

```bash
npm run ingest
```

This converts the markdown reports into JSON data files that the website uses.

You should see output like:
```
✓ Copied Master-Brief.md
✓ Copied 01-Company.md
✓ Generated company.json
...
✅ Content ingestion complete!
```

### 3. Start Development Server

```bash
npm run dev
```

The site will start at `http://localhost:3000`

Open your browser and navigate to that URL.

## What You Should See

- **Homepage** (`/`): Executive summary with 6Cs navigation grid
- **Company** (`/company`): Company analysis page
- **Consumer** (`/consumer`): Flavor Seekers insights
- **Communications** (`/communications`): Communications strategy
- **Category** (`/category`): Category dynamics
- **Competition** (`/competition`): Competitive analysis
- **Culture** (`/culture`): Cultural trends
- **Master Brief** (`/master-brief`): Complete strategic synthesis

## Making Changes

### Update Content

1. Edit markdown files in `content/` folder (or parent directory)
2. Run `npm run ingest` to regenerate JSON
3. Refresh browser to see changes

### Update Styling

Edit files in:
- `app/globals.css` - Global styles
- `tailwind.config.js` - Brand colors and theme
- Component files - Individual component styles

Changes auto-reload in development mode.

## Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server on port 3000.

## Common Issues

### Port 3000 already in use

Kill the process using port 3000 or use a different port:

```bash
npm run dev -- -p 3001
```

### Module not found errors

Delete node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Content not updating

Make sure you ran the ingest script after changing markdown files:

```bash
npm run ingest
```

## Next Steps

- Review [README.md](./README.md) for full documentation
- Check [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for deployment options
- Explore component files to customize the design

---

**Need help?** Contact the development team.
