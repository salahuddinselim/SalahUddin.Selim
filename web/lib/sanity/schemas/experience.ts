import { defineType, defineField } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'period', title: 'Period', type: 'string', description: 'e.g. "Jan 2024 — Present"' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'role', subtitle: 'company' },
  },
  orderings: [
    { title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
