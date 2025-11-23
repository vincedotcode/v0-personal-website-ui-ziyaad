#!/usr/bin/env node

/**
 * Strapi Seed Script
 * 
 * This script seeds your Strapi instance with complete test data
 * including tags and posts with all fields populated.
 * 
 * Usage:
 *   node scripts/seed.js
 * 
 * Make sure your Strapi server is running before executing this script!
 */

const axios = require('axios');
const seedData = require('./data.json');

// Configuration
const STRAPI_URL =  'https://wealthy-strength-4d130e83a1.strapiapp.com';
const STRAPI_API_TOKEN = '7869c304a9e01d89f1ed1c84944f4b61f9b37ac0a9f340bbad5111b45920d5626d56aeed6b3792c8dc403caa69afab131a1b9a54270b5b22ae42156b665be273ea70ff250fcded5093029b6e4fcb18a0311fbb4208321dd3ba28f5b54f470cc357988d0167f1e304c625d9942aa885bea9a42fcb237a22513f7cca15084a0664';

if (!STRAPI_API_TOKEN) {
  console.error('❌ Error: STRAPI_API_TOKEN environment variable is not set.');
  console.error('   Please set your API token before running this script.');
  process.exit(1);
}

// Create axios instance with Strapi configuration
const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  },
});

// Logging helpers
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warning: (msg) => console.log(`⚠️  ${msg}`),
  error: (msg) => console.log(`❌ ${msg}`),
  section: (msg) => console.log(`\n📌 ${msg}\n`),
};

/**
 * Create or get a tag by slug
 */
async function createOrGetTag(tagData) {
  try {
    // Check if tag exists
    const existingTags = await api.get('/api/tags', {
      params: {
        filters: { slug: { $eq: tagData.slug } },
        fields: ['id', 'slug', 'name'],
      },
    });

    if (existingTags.data.data && existingTags.data.data.length > 0) {
      log.warning(`Tag already exists: ${tagData.slug}`);
      return existingTags.data.data[0].id;
    }

    // Create new tag
    const response = await api.post('/api/tags', {
      data: {
        name: tagData.name,
        slug: tagData.slug,
        description: tagData.description || '',
        publishedAt: new Date().toISOString(),
      },
    });

    log.success(`Created tag: ${tagData.name} (${tagData.slug})`);
    return response.data.data.id;
  } catch (error) {
    log.error(`Failed to create/get tag "${tagData.slug}": ${error.message}`);
    throw error;
  }
}

/**
 * Create or get a post by slug
 */
async function createOrGetPost(postData, tagIdMap) {
  try {
    // Check if post exists
    const existingPosts = await api.get('/api/posts', {
      params: {
        filters: { slug: { $eq: postData.slug } },
        fields: ['id', 'slug', 'title'],
      },
    });

    if (existingPosts.data.data && existingPosts.data.data.length > 0) {
      log.warning(`Post already exists: ${postData.slug}`);
      return existingPosts.data.data[0].id;
    }

    // Map tag slugs to tag IDs
    const tagIds = postData.tags
      .map((tagSlug) => tagIdMap[tagSlug])
      .filter((id) => id !== undefined);

    if (tagIds.length === 0) {
      log.error(`Post "${postData.slug}" has no valid tags. Skipping...`);
      return null;
    }

    // Create new post
    const response = await api.post('/api/posts', {
      data: {
        title: postData.title,
        slug: postData.slug,
        format: postData.format || 'article',
        content: postData.content || '',
        excerpt: postData.excerpt || '',
        subtitle: postData.subtitle || '',
        readingTimeMinutes: postData.readingTimeMinutes || null,
        durationSeconds: postData.durationSeconds || null,
        youtubeUrl: postData.youtubeUrl || null,
        externalUrl: postData.externalUrl || null,
        isFeatured: postData.isFeatured || false,
        seoTitle: postData.seoTitle || '',
        seoDescription: postData.seoDescription || '',
        tags: tagIds,
        publishedAt: new Date().toISOString(),
      },
    });

    log.success(`Created post: ${postData.title}`);
    return response.data.data.id;
  } catch (error) {
    log.error(`Failed to create post "${postData.slug}": ${error.message}`);
    if (error.response?.data?.error?.details) {
      log.error(`Details: ${JSON.stringify(error.response.data.error.details)}`);
    }
    throw error;
  }
}

/**
 * Main seed function
 */
async function seed() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                  🌱 Strapi Database Seeding                    ║
╚════════════════════════════════════════════════════════════════╝
`);

  log.info(`Strapi URL: ${STRAPI_URL}`);
  log.info(`API Token: ${STRAPI_API_TOKEN.substring(0, 20)}...`);

  try {
    // Step 1: Test API connection
    log.section('Testing API Connection');
    const healthCheck = await api.get('/api/posts', { params: { limit: 1 } });

    console.log(healthCheck)
    log.success('Connected to Strapi successfully');

    // Step 2: Create tags
    log.section(`Creating Tags (${seedData.tags.length} tags)`);
    const tagIdMap = {};

    for (const tagData of seedData.tags) {
      const tagId = await createOrGetTag(tagData);
      tagIdMap[tagData.slug] = tagId;
    }

    // Step 3: Create posts
    log.section(`Creating Posts (${seedData.posts.length} posts)`);
    let createdCount = 0;
    let skippedCount = 0;

    for (const postData of seedData.posts) {
      const postId = await createOrGetPost(postData, tagIdMap);
      if (postId) {
        createdCount++;
      } else {
        skippedCount++;
      }
    }

    // Step 4: Summary
    log.section('Seeding Summary');
    log.success(`Tags created: ${Object.keys(tagIdMap).length}`);
    log.success(`Posts created: ${createdCount}`);
    if (skippedCount > 0) {
      log.warning(`Posts skipped: ${skippedCount}`);
    }

    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    ✅ Seeding Complete!                        ║
║                                                                ║
║ Your Strapi instance has been seeded with test data.          ║
║                                                                ║
║ Next steps:                                                    ║
║ 1. Visit http://localhost:1337/admin to verify data           ║
║ 2. Check your Next.js app at http://localhost:3000           ║
║ 3. Test all pages:                                            ║
║    - /product, /cook, /write, /books                          ║
║    - /dataprotection, /help, /articles                        ║
║    - /portfolio, /podcasts, /media                            ║
╚════════════════════════════════════════════════════════════════╝
`);

    process.exit(0);
  } catch (error) {
    log.section('❌ Seeding Failed');
    log.error(`Fatal error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the seed
seed();