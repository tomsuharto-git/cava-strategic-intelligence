const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Mapping of file names to categories
const categoryMap = {
  'Master-Brief.md': 'master',
  '01-Company.md': 'company',
  '02-Consumer.md': 'consumer',
  '03-Communications.md': 'communications',
  '04-Category.md': 'category',
  '05-Competition.md': 'competition',
  '06-Culture.md': 'culture',
};

// Helper function to extract section content by heading
function extractSection(content, ...headings) {
  for (const heading of headings) {
    const regex = new RegExp(`##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=##|$)`, 'i');
    const match = content.match(regex);
    if (match) {
      return match[0].replace(new RegExp(`##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'), '').trim();
    }
  }
  return '';
}

// Helper function to parse TL;DR section into array format matching Indeed
function parseTLDR(content) {
  if (!content) return [];

  const tldrItems = [];
  const lines = content.split('\n').filter(line => line.trim());

  // Find the main summary paragraph (first non-emoji, non-header line)
  let mainSummary = '';
  let criticalPriority = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip section markers
    if (trimmed.match(/^---+$/)) continue;

    // Check for critical priority
    if (trimmed.includes('🔴') && trimmed.includes('**')) {
      const match = trimmed.match(/🔴\s*\*\*([^:]+?):\*\*:?\s*(.+)/);
      if (match) {
        criticalPriority = {
          title: match[1].trim(),
          implication: match[2].trim(),
          priority: 'critical'
        };
      }
      continue;
    }

    // Check for important priority
    if (trimmed.includes('🟡') && trimmed.includes('**')) {
      const match = trimmed.match(/🟡\s*\*\*([^:]+?):\*\*:?\s*(.+)/);
      if (match) {
        tldrItems.push({
          title: match[1].trim(),
          implication: match[2].trim(),
          priority: 'important'
        });
      }
      continue;
    }

    // Check for supporting priority
    if (trimmed.includes('🟢') && trimmed.includes('**')) {
      const match = trimmed.match(/🟢\s*\*\*([^:]+?):\*\*:?\s*(.+)/);
      if (match) {
        tldrItems.push({
          title: match[1].trim(),
          implication: match[2].trim(),
          priority: 'supporting'
        });
      }
      continue;
    }

    // If it's a regular paragraph without emojis, it's the main summary
    if (!trimmed.includes('🔴') && !trimmed.includes('🟡') && !trimmed.includes('🟢') && !mainSummary) {
      mainSummary = trimmed;
    }
  }

  // Create main TLDR item from summary
  if (mainSummary) {
    // Extract key statistics for title
    const stats = [];
    const statPatterns = [
      /\$[\d.]+[MBK]/g,  // Money: $2.8M, $954M
      /[\d.]+%/g,        // Percentages: 35.1%, 12.9%
      /[\d,]+\s+units?/gi, // Units: 352 units
    ];

    statPatterns.forEach(pattern => {
      const matches = mainSummary.match(pattern);
      if (matches) stats.push(...matches.slice(0, 3));
    });

    const title = stats.length > 0
      ? stats.slice(0, 3).join(', ')
      : mainSummary.substring(0, 60) + '...';

    tldrItems.unshift({
      title,
      implication: mainSummary,
      priority: 'critical'
    });
  }

  // Add critical priority if found
  if (criticalPriority) {
    tldrItems.push(criticalPriority);
  }

  return tldrItems;
}

// Helper function to parse Strategic Imperative Story - matching Indeed format
function parseStrategicStory(content) {
  if (!content) return null;

  const story = {
    challenge: { title: '', content: '' },
    insight: { title: '', content: '' },
    imperative: { title: '', content: '' },
  };

  // Split content by ### headers
  const challengeMatch = content.match(/###\s*(?:The\s+)?Challenge[^\n]*\n([\s\S]*?)(?=###|$)/i);
  const insightMatch = content.match(/###\s*(?:The\s+)?Insight[^\n]*\n([\s\S]*?)(?=###|$)/i);
  const imperativeMatch = content.match(/###\s*(?:The\s+)?(?:Strategic\s+)?Imperative[^\n]*\n([\s\S]*?)(?=###|$)/i);

  if (challengeMatch) {
    const text = challengeMatch[1].trim();
    story.challenge = {
      title: text,
      content: ''
    };
  }

  if (insightMatch) {
    const text = insightMatch[1].trim();
    story.insight = {
      title: text,
      content: ''
    };
  }

  if (imperativeMatch) {
    const text = imperativeMatch[1].trim();
    story.imperative = {
      title: text,
      content: ''
    };
  }

  return story;
}

// Helper function to parse Full Findings - matching Indeed's card structure
function parseFindings(content) {
  if (!content) return [];

  const findings = [];

  // Match ### headers and their content
  const sectionRegex = /###\s+([^\n]+)\n([\s\S]*?)(?=###|$)/g;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const sectionTitle = match[1].trim();
    const sectionContent = match[2].trim();

    // Determine priority
    let priority = 'supporting';
    if (sectionContent.includes('🔴') || sectionTitle.toLowerCase().includes('critical')) {
      priority = 'critical';
    } else if (sectionContent.includes('🟡') || sectionTitle.toLowerCase().includes('important')) {
      priority = 'important';
    }

    // Parse subsections with ** headers as cards
    const cards = [];
    const cardRegex = /\*\*([^\n*]+)\*\*\n([\s\S]*?)(?=\*\*[^\n*]+\*\*|$)/g;
    let cardMatch;

    while ((cardMatch = cardRegex.exec(sectionContent)) !== null) {
      const cardTitle = cardMatch[1].trim();
      const cardContent = cardMatch[2].trim();

      // Determine card priority
      let cardPriority = 'supporting';
      if (cardContent.includes('🔴') || cardContent.toLowerCase().includes('[priority: 🔴 critical]')) {
        cardPriority = 'critical';
      } else if (cardContent.includes('🟡') || cardContent.toLowerCase().includes('[priority: 🟡 important]')) {
        cardPriority = 'important';
      }

      cards.push({
        title: cardTitle,
        content: cardContent,
        priority: cardPriority
      });
    }

    // If no cards found, create one card with all content
    if (cards.length === 0) {
      cards.push({
        title: sectionTitle,
        content: sectionContent,
        priority
      });
    }

    findings.push({
      sectionTitle,
      cards,
      isExpandable: false
    });
  }

  return findings;
}

// Main parsing function
function parseMarkdownFile(filePath, category) {
  console.log(`Processing: ${filePath}`);

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  // Extract main sections
  const tldrSection = extractSection(content, '🎯 TL;DR', 'TL;DR');
  const snapshotSection = extractSection(content, '📊 Situation Snapshot', 'Situation Snapshot', 'Executive Summary');
  const storySection = extractSection(content,
    '🎭 Strategic Imperative Story',
    'Strategic Imperative Story',
    'Meta Strategic Imperative Story'
  );
  const findingsSection = extractSection(content,
    '📈 Full Findings',
    'Full Findings',
    'Cross-Dimensional Strategic Synthesis',
    'Strategic Priorities'
  );

  // Parse sections
  const tldr = parseTLDR(tldrSection);
  const story = parseStrategicStory(storySection);
  const findings = parseFindings(findingsSection);

  return {
    meta: {
      category,
      title: category.charAt(0).toUpperCase() + category.slice(1),
      icon: frontmatter.icon || '',
      updatedAt: new Date().toISOString(),
    },
    intro: content.split('##')[0].trim(),
    tldr,
    situationSnapshot: snapshotSection,
    story,
    findings,
  };
}

// Main execution
function ingestContent() {
  const contentDir = path.join(__dirname, '..', 'content');
  const dataDir = path.join(__dirname, '..', 'data');

  // Create directories if they don't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  console.log('\n📝 Processing markdown files...');

  // Process each markdown file
  Object.keys(categoryMap).forEach(fileName => {
    const category = categoryMap[fileName];
    const filePath = path.join(contentDir, fileName);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠ Warning: ${fileName} not found`);
      return;
    }

    try {
      const data = parseMarkdownFile(filePath, category);

      // Write JSON output
      const outputPath = path.join(dataDir, `${category}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log(`✓ Generated ${category}.json`);
    } catch (error) {
      console.error(`✗ Error processing ${fileName}:`, error.message);
      console.error(error.stack);
    }
  });

  console.log('\n✅ Content ingestion complete!');
  console.log(`📊 Check ${dataDir} for generated JSON files`);
}

// Run the script
try {
  ingestContent();
} catch (error) {
  console.error('❌ Fatal error:', error);
  process.exit(1);
}
