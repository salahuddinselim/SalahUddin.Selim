import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'longDescription', title: 'Long Description', type: 'text', rows: 6 }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Full Stack', value: 'fullstack' },
        ],
      },
    }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (Rule) => Rule.min(2000).max(2030) }),
    defineField({ name: 'order', title: 'Order', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
  orderings: [
    { title: 'Year', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Featured First', name: 'featured', by: [{ field: 'featured', direction: 'desc' }] },
  ],
})
