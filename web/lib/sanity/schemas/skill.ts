import { defineType, defineField } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'Icon identifier (e.g. "react", "typescript")' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Tools', value: 'tools' },
          { title: 'Design', value: 'design' },
        ],
      },
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', hidden: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
  orderings: [
    { title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
