import { defineType, defineField } from "sanity"

export const credential = defineType({
  name: "credential",
  title: "Credential",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "date", title: "Date", type: "string", description: 'e.g. "Spring 2025" or "2020"' }),
    defineField({ name: "year", title: "Year", type: "number", validation: (Rule) => Rule.min(2000).max(2030) }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Competition", value: "Competition" },
          { title: "Academic", value: "Academic" },
          { title: "Certification", value: "Certification" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number", hidden: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "issuer" },
  },
  orderings: [
    { title: "Year", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
})
