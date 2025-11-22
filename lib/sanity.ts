import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'vbnz9s1l', // Find this in your Sanity dashboard
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // "Bespoke Speed" requires the CDN [cite: 1959]
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}