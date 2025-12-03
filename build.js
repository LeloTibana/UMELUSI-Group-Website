// build.js - Static site generator for Decap CMS
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const marked = require('marked');

// Configure marked for safe rendering
marked.setOptions({
  headerIds: false,
  mangle: false
});

async function buildSite() {
  console.log('🚀 Building Umelusi Group website...');
  
  // Create _site directory
  await fs.ensureDir('_site');
  
  // Copy all static files except excluded directories
  await fs.copy('.', '_site', {
    filter: (src) => {
      const exclude = ['_data', '_site', 'node_modules', '.git', '.github'];
      const shouldCopy = !exclude.some(dir => src.includes(dir));
      return shouldCopy;
    }
  });
  
  // Create data directory in _site
  await fs.ensureDir('_site/_data');
  
  // Process each collection
  await Promise.all([
    processCollection('press', 'Press Articles'),
    processCollection('careers', 'Career Opportunities'),
    processCollection('resources', 'Resources'),
    processCollection('team', 'Team Members')
  ]);
  
  console.log('✅ Build complete! Site ready in _site/');
  console.log('📁 Structure:');
  console.log('   _site/index.html');
  console.log('   _site/_data/press.json');
  console.log('   _site/_data/careers.json');
  console.log('   _site/_data/resources.json');
  console.log('   _site/_data/team.json');
}

async function processCollection(collectionName, label) {
  console.log(`📂 Processing ${label}...`);
  
  const sourceDir = `_data/${collectionName}`;
  const targetFile = `_site/_data/${collectionName}.json`;
  
  if (!await fs.pathExists(sourceDir)) {
    console.log(`   ⚠️  No ${collectionName} directory found, creating empty array`);
    await fs.writeJSON(targetFile, []);
    return;
  }
  
  const files = await fs.readdir(sourceDir);
  const items = [];
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      try {
        const content = await fs.readFile(path.join(sourceDir, file), 'utf8');
        
        // Parse frontmatter and content
        const parts = content.split('---');
        if (parts.length < 3) {
          console.log(`   ⚠️  Skipping ${file}: invalid frontmatter format`);
          continue;
        }
        
        const frontmatter = yaml.load(parts[1]);
        const body = parts.slice(2).join('---').trim();
        
        // Convert markdown to HTML
        const htmlBody = marked.parse(body);
        
        // Create item with metadata
        const item = {
          ...frontmatter,
          slug: file.replace('.md', ''),
          body: htmlBody,
          // Add SEO-friendly date formats
          date_formatted: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : null,
          timestamp: frontmatter.date ? new Date(frontmatter.date).getTime() : null
        };
        
        items.push(item);
      } catch (error) {
        console.log(`   ❌ Error processing ${file}:`, error.message);
      }
    }
  }
  
  // Sort items based on collection type
  switch(collectionName) {
    case 'press':
      items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      break;
    case 'careers':
      items.sort((a, b) => {
        // Sort by active first, then deadline
        if (a.active !== b.active) return a.active ? -1 : 1;
        if (a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline);
        return 0;
      });
      break;
    case 'team':
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      break;
    default:
      items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }
  
  await fs.writeJSON(targetFile, items, { spaces: 2 });
  console.log(`   ✅ Processed ${items.length} ${collectionName}`);
}

// Run build
buildSite().catch(console.error);