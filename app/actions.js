'use server';

import { createClient } from 'next-sanity';

// Create a client specifically for WRITING (uses the token)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // The private key
  apiVersion: '2023-05-03',
  useCdn: false, // We need fresh data
});

export async function submitInquiry(formData) {
  // Get data directly from the form
  const name = formData.get('name');
  const email = formData.get('email');

  if (!name || !email) {
    console.error('Missing fields');
    return;
  }

  try {
    // Send data to Sanity
    await writeClient.create({
      _type: 'inquiry',
      name: name,
      email: email,
      status: 'new',
    });
    
    console.log("Inquiry Securely Archived");
    
  } catch (error) {
    console.error("Transmission Failed:", error);
    throw new Error('Failed to transmit signal.');
  }
}