import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inquiry',
  title: 'Inquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Identity (Name)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Signal (Email)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
        ],
      },
      initialValue: 'new',
    }),
  ],
})