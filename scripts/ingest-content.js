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

// Helper function to extract section content
function extractSection(content, sectionTitle) {
  const regex = new RegExp(`##\\s+${sectionTitle}[\\s\\S]*?(?=##|$)`, 'i');
  const match = content.match(regex);
  return match ? match[0].replace(new RegExp(`##\\s+${sectionTitle}`, 'i'), '').trim() : '';
}

// Helper function to parse TL;DR section
function parseTLDR(content) {
  if (!content) return { summary: '', priority: null };

  const lines = content.split('\n').filter(line => line.trim() && !line.match(/^---+$/));
  let summary = '';
  let priority = null;

  lines.forEach(line => {
    // Check for priority indicators
    if (line.includes('🔴') && line.includes('**')) {
      // Match: 🔴 **Critical Priority**: Text
      const match = line.match(/🔴\s*\*\*([^:]+?):\*\*:?\s*(.+)/);
      if (match) {
        priority = {
          level: 'critical',
          title: match[1].trim(),
          text: match[2].trim(),
        };
      }
    } else if (line.includes('🟡') && line.includes('**')) {
      const match = line.match(/🟡\s*\*\*([^:]+?):\*\*:?\s*(.+)/);
      if (match) {
        priority = {
          level: 'important',
          title: match[1].trim(),
          text: match[2].trim(),
        };
      }
    } else if (!line.includes('🔴') && !line.includes('🟡') && !line.includes('🟢')) {
      // Regular content (not a priority marker)
      summary += line.trim() + ' ';
    }
  });

  return {
    summary: summary.trim(),
    priority,
  };
}

// Helper function to parse Strategic Imperative Story
function parseStrategicStory(content) {
  if (!content) return null;

  const story = {
    challenge: '',
    insight: '',
    imperative: '',
  };

  // Split content by ### headers
  const challengeMatch = content.match(/###\s*(?:The\s+)?Challenge.*?\n([\s\S]*?)(?=###|$)/i);
  const insightMatch = content.match(/###\s*(?:The\s+)?Insight.*?\n([\s\S]*?)(?=###|$)/i);
  const imperativeMatch = content.match(/###\s*(?:The\s+)?(?:Strategic\s+)?Imperative.*?\n([\s\S]*?)(?=###|$)/i);

  if (challengeMatch) story.challenge = challengeMatch[1].trim();
  if (insightMatch) story.insight = insightMatch[1].trim();
  if (imperativeMatch) story.imperative = imperativeMatch[1].trim();

  return story;
}

// Helper function to parse findings sections
function parseFindings(content) {
  if (!content) return [];

  const findings = [];
  // Match ### headers and their content
  const sectionRegex = /###\s+([^\n]+)\n([\s\S]*?)(?=###|$)/g;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const sectionContent = match[2].trim();

    // Determine priority based on indicators
    let priority = 'supporting';
    if (sectionContent.includes('🔴') || sectionContent.toLowerCase().includes('critical')) {
      priority = 'critical';
    } else if (sectionContent.includes('🟡') || sectionContent.toLowerCase().includes('important')) {
      priority = 'important';
    }

    // Parse opportunities and risks within sections
    const opportunities = [];
    const risks = [];

    // Extract opportunity items (🟢 markers or under Opportunities heading)
    const oppRegex = /🟢\s*\*\*([^:]+):\*\*\s*([\s\S]*?)(?=🟢|🔴|###|$)/g;
    let oppMatch;
    while ((oppMatch = oppRegex.exec(sectionContent)) !== null) {
      opportunities.push({
        title: oppMatch[1].trim(),
        description: oppMatch[2].trim(),
        priority: oppMatch[2].includes('[Priority: 🔴 Critical]') ? 'critical' :
                   oppMatch[2].includes('[Priority: 🟡 Important]') ? 'important' : 'supporting',
      });
    }

    // Extract risk items (🔴 markers within risk sections)
    const riskRegex = /🔴\s*\*\*([^:]+):\*\*\s*([\s\S]*?)(?=🟢|🔴|###|$)/g;
    let riskMatch;
    while ((riskMatch = riskRegex.exec(sectionContent)) !== null) {
      risks.push({
        title: riskMatch[1].trim(),
        description: riskMatch[2].trim(),
        priority: riskMatch[2].includes('[Priority: 🔴 Critical]') ? 'critical' :
                  riskMatch[2].includes('[Priority: 🟡 Important]') ? 'important' : 'supporting',
      });
    }

    findings.push({
      title,
      content: sectionContent,
      priority,
      opportunities,
      risks,
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
  const tldrSection = extractSection(content, '🎯 TL;DR') || extractSection(content, 'TL;DR');
  const snapshotSection = extractSection(content, '📊 Situation Snapshot') || extractSection(content, 'Situation Snapshot');
  const storySection = extractSection(content, '🎭 Strategic Imperative Story') ||
                       extractSection(content, 'Strategic Imperative Story') ||
                       extractSection(content, 'Meta Strategic Imperative Story');
  const findingsSection = extractSection(content, '📈 Full Findings') ||
                         extractSection(content, 'Full Findings') ||
                         extractSection(content, 'Cross-Dimensional Strategic Synthesis');

  // Parse sections
  const tldr = parseTLDR(tldrSection);
  const story = parseStrategicStory(storySection);
  const findings = parseFindings(findingsSection);

  // Extract metadata from beginning of file
  const metaLines = content.split('\n').slice(0, 10);
  const meta = {};
  metaLines.forEach(line => {
    const match = line.match(/\*\*([^:]+):\*\*\s*(.+)/);
    if (match) {
      const key = match[1].toLowerCase().replace(/\s+/g, '_');
      meta[key] = match[2];
    }
  });

  return {
    meta: {
      category,
      title: category.charAt(0).toUpperCase() + category.slice(1),
      ...meta,
      updatedAt: new Date().toISOString(),
    },
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
  const sourceDir = path.join(__dirname, '..', '..');

  // Create directories if they don't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Copy markdown files from parent directory to content directory
  console.log('\n📁 Copying markdown files...');
  Object.keys(categoryMap).forEach(fileName => {
    const sourcePath = path.join(sourceDir, fileName);
    const destPath = path.join(contentDir, fileName);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ Copied ${fileName}`);
    } else {
      console.log(`⚠ Warning: ${fileName} not found at ${sourcePath}`);
    }
  });

  // Process each markdown file
  console.log('\n📝 Processing markdown files...');
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

  files.forEach(file => {
    const category = categoryMap[file];
    if (!category) {
      console.log(`Skipping ${file} - no category mapping`);
      return;
    }

    try {
      const filePath = path.join(contentDir, file);
      const data = parseMarkdownFile(filePath, category);

      // Write JSON output
      const outputPath = path.join(dataDir, `${category}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log(`✓ Generated ${category}.json`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  });

  console.log('\n✅ Content ingestion complete!');
  console.log(`📊 Generated ${files.length} JSON files in ${dataDir}`);
}

// Run the script
try {
  ingestContent();
} catch (error) {
  console.error('❌ Fatal error:', error);
  process.exit(1);
}
