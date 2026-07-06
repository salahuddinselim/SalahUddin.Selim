import { defineType, defineField } from "sanity"

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'Untagged items only appear under "All" on the gallery filter bar.',
      options: {
        list: [
          { title: "Academics", value: "Academics" },
          { title: "Creations", value: "Creations" },
          { title: "Moments", value: "Moments" },
        ],
      },
    }),
    defineField({
      name: "span",
      title: "Grid Span",
      type: "string",
      description:
        'Leave unset -- square/vertical/horizontal are detected automatically from the photo\'s orientation. Only pick "Large" to feature a photo at 2x2 regardless of its orientation.',
      options: {
        list: [{ title: "Large (2x2, featured)", value: "large" }],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number", hidden: true }),
  ],
  preview: {
    select: { title: "caption", subtitle: "location", media: "image" },
  },
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
})
