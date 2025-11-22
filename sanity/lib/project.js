export default {
  name: 'project',
  title: 'Project Dossier',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Real Title',
      type: 'string',
      description: 'e.g., Maison Madox',
    },
    {
      name: 'abstractTitle',
      title: 'Abstract Title (The Code)',
      type: 'string',
      description: 'e.g., The Holding Co. ',
    },
    {
      name: 'mainImage',
      title: 'The Artifact',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'specs',
      title: 'Technical Specs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Headless, GSAP, WebGL',
    },
  ],
}