// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN, // need a write token to create
});

async function runTests() {
  try {
    console.log("1. Verifying credentials...");
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) throw new Error("Missing Project ID");
    
    console.log("2. Creating temporary TEST project...");
    const doc = await client.create({
      _type: 'project',
      title: 'TEST PORTFOLIO PROJECT',
      brand: 'Test Brand',
      category: 'lifestyle',
      featured: true,
      order: 99
    });
    console.log("Created:", doc._id);

    console.log("3. Fetching projects...");
    const projects = await client.fetch('*[_type == "project"]');
    console.log(`Found ${projects.length} projects.`);

    console.log("4. Updating project order...");
    await client.patch(doc._id).set({ order: 1 }).commit();
    console.log("Updated order for:", doc._id);

    console.log("5. Cleaning up TEST project...");
    await client.delete(doc._id);
    console.log("Deleted:", doc._id);
    
    console.log("✅ CMS Workflow Test Complete!");
  } catch (err) {
    console.error("❌ CMS Test Failed:", err.message);
    process.exit(1);
  }
}

runTests();
