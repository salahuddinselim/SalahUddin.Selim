import { defineType, defineField } from "sanity"

export const visitorStats = defineType({
  name: "visitorStats",
  title: "Visitor Stats",
  type: "document",
  fields: [
    defineField({ name: "totalViews", title: "Total Views", type: "number", initialValue: 0 }),
    defineField({ name: "thisMonthViews", title: "This Month Views", type: "number", initialValue: 0 }),
    defineField({ name: "thisMonth", title: "Current Month (YYYY-MM)", type: "string" }),
    defineField({
      name: "countries",
      title: "Countries",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "code", type: "string", title: "Code" },
            { name: "flag", type: "string", title: "Flag" },
            { name: "count", type: "number", title: "Count" },
          ],
        },
      ],
    }),
    defineField({
      name: "devices",
      title: "Devices",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "count", type: "number", title: "Count" },
          ],
        },
      ],
    }),
    defineField({
      name: "monthlyHistory",
      title: "Monthly History",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "month", type: "string", title: "Month (YYYY-MM)" },
            { name: "views", type: "number", title: "Views" },
          ],
        },
      ],
    }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "datetime" }),
  ],
  preview: {
    select: { title: "totalViews", subtitle: "lastUpdated" },
    prepare({ title, subtitle }) {
      return { title: `Total Views: ${title ?? 0}`, subtitle: subtitle ?? "—" }
    },
  },
})
