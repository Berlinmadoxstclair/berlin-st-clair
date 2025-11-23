import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project Dossier',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Real Title',
      type: 'string',
      description: 'e.g., Maison Madox',
    }),
    defineField({
      name: 'abstractTitle',
      title: 'Abstract Title (The Code)',
      type: 'string',
      description: 'e.g., The Holding Co.',
    }),
    // --- NEW FIELD START ---
    defineField({
      name: 'link',
      title: 'Repository Link',
      type: 'url',
      description: 'Link to GitHub or Live Site',
    }),
    // --- NEW FIELD END ---
    defineField({
      name: 'mainImage',
      title: 'The Artifact',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'specs',
      title: 'Technical Specs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Headless, GSAP, WebGL',
    }),
  ],
})