import {defineField, defineType} from 'sanity'

// المعرض: خط زمني للمسيرة الفنية والمعارض
export const exhibition = defineType({
  name: 'exhibition',
  title: 'المعارض',
  type: 'document',
  fields: [
    defineField({
      name: 'title_ar',
      title: 'اسم المعرض (عربي)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Exhibition name (English)',
      type: 'string',
    }),
    defineField({
      name: 'venue_ar',
      title: 'المكان (عربي)',
      type: 'string',
    }),
    defineField({
      name: 'venue_en',
      title: 'Venue (English)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'السنة',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'description_ar',
      title: 'وصف قصير (عربي)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_en',
      title: 'Short description (English)',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'السنة (الأحدث أولاً)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title_ar', year: 'year', venue: 'venue_ar'},
    prepare({title, year, venue}) {
      return {title, subtitle: [year, venue].filter(Boolean).join(' — ')}
    },
  },
})
