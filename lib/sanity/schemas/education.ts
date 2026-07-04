import { defineType, defineField } from "sanity"

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "field", title: "Field of Study", type: "string" }),
    defineField({ name: "startYear", title: "Start Year", type: "number" }),
    defineField({
      name: "endYear",
      title: "End Year",
      type: "string",
      description: 'e.g. "2026" or "Present"',
    }),
    defineField({ name: "gpa", title: "GPA", type: "string", description: 'e.g. "3.74"' }),
    defineField({
      name: "gpaScale",
      title: "GPA Scale",
      type: "string",
      description: 'e.g. "4.0"',
    }),
    defineField({ name: "completedCredits", title: "Completed Credits", type: "number" }),
    defineField({ name: "totalCredits", title: "Total Credits", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
        ],
      },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "abbreviation",
      title: "Abbreviation",
      type: "string",
      description: 'Short logo text, e.g. "UIU"',
    }),
    defineField({ name: "order", title: "Order", type: "number", hidden: true }),
  ],
  preview: {
    select: { title: "institution", subtitle: "degree" },
  },
})
