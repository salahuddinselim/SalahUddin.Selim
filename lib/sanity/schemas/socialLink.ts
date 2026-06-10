import { defineType, defineField } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier (e.g. "github", "linkedin", "twitter")',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'url' },
  },
})
