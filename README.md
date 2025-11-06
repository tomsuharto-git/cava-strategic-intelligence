# CAVA USA Strategic Intelligence Website

A professional Next.js website presenting comprehensive strategic analysis of CAVA Group's position in the US fast-casual Mediterranean market, specifically targeting the Flavor Seekers consumer segment.

## 📋 Overview

This interactive website transforms 7 detailed strategic reports (12,000+ words) into an engaging, navigable experience with:

- **Executive Summary** - High-level strategic overview and key findings
- **6Cs Analysis** - Deep-dive reports on Company, Consumer, Communications, Category, Competition, and Culture
- **Master Brief** - Comprehensive strategic synthesis with investment priorities
- **Interactive Features** - Expandable sections, priority indicators, and smooth navigation

## 🎨 Design Features

- **CAVA Brand Colors**: Mediterranean-inspired warm tones (olive green, terracotta, warm whites)
- **Priority System**: Visual indicators for Critical 🔴, Important 🟡, and Supporting 🟢 priorities
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Print-Friendly**: Clean printing with proper page breaks
- **Smooth Interactions**: Expandable sections, hover effects, and seamless navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Ingest content from markdown files
npm run ingest

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the site.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
cava-strategic-site/
├── app/                      # Next.js 14 app directory
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Homepage with executive summary
│   ├── company/             # Company analysis page
│   ├── consumer/            # Consumer insights page
│   ├── communications/      # Communications strategy page
│   ├── category/            # Category dynamics page
│   ├── competition/         # Competitive analysis page
│   ├── culture/             # Cultural trends page
│   └── master-brief/        # Master strategic brief page
├── components/              # Reusable React components
│   ├── CNavigation.tsx     # Main navigation component
│   ├── CPageTemplate.tsx   # Consistent page layout
│   ├── SectionHeader.tsx   # Section headers
│   ├── PriorityBadge.tsx   # Priority indicators
│   ├── ExpandableSection.tsx # Collapsible content
│   └── StrategicStory.tsx  # Strategic framework display
├── content/                 # Original markdown files
├── data/                    # Processed JSON data
├── scripts/
│   └── ingest-content.js   # Content processing script
└── public/                  # Static assets
```

## 🔧 Content Updates

To update content:

1. Edit markdown files in the parent directory or `content/` folder
2. Run the ingestion script:
   ```bash
   npm run ingest
   ```
3. Restart the dev server to see changes

## 🎯 Key Features

### Navigation
- Sticky header with all 6Cs sections
- Mobile-responsive navigation
- Prominent Master Brief access
- Active page highlighting

### Content Presentation
- **TL;DR Sections**: 100-word executive summaries with critical priorities
- **Situation Snapshots**: 250-word context-setting overviews
- **Strategic Stories**: Challenge → Insight → Imperative framework
- **Full Findings**: Detailed analysis with expandable sections
- **Priority Indicators**: Visual badges for priority levels

### Interactive Elements
- Expandable/collapsible sections for better scanning
- Smooth scrolling navigation
- Hover effects on cards and links
- Print-optimized layouts

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js` to adjust CAVA brand colors:

```javascript
colors: {
  cava: {
    olive: { /* shades */ },
    terracotta: { /* shades */ },
    warm: { /* shades */ },
  }
}
```

### Component Styling

Components use Tailwind CSS utility classes. Edit component files directly to adjust styling.

## 📊 Data Structure

Content is stored as JSON with this structure:

```json
{
  "meta": {
    "category": "company",
    "title": "Company Analysis",
    "analysis_date": "November 2025",
    "focus": "Business Performance, Growth Trajectory"
  },
  "tldr": {
    "summary": "...",
    "priority": {
      "level": "critical",
      "title": "...",
      "text": "..."
    }
  },
  "situationSnapshot": "...",
  "story": {
    "challenge": "...",
    "insight": "...",
    "imperative": "..."
  },
  "findings": [
    {
      "title": "...",
      "content": "...",
      "priority": "critical",
      "opportunities": [],
      "risks": []
    }
  ]
}
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted with Node.js

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Content**: Markdown → JSON processing
- **Animations**: Framer Motion

## 📝 License

This project is proprietary strategic intelligence for CAVA Group.

## 🤝 Support

For questions or issues, contact the strategic intelligence team.

---

**Built with** ❤️ **for CAVA's strategic success**
