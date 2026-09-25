import {defineField, defineType} from 'sanity'

// التصنيف: يجمع الأعمال الفنية في مجموعات
export const category = defineType({
  name: 'category',
  title: 'التصنيفات',
  type: 'document',
  fields: [
    defineField({
      name: 'title_ar',
      title: 'اسم التصنيف (عربي)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Category title (English)',
      type: 'string',
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
    defineField({
      name: 'order',
      title: 'ترتيب العرض',
      description: 'الرقم الأصغر يظهر أولاً',
      type: 'number',
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'ترتيب العرض',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title_ar', subtitle: 'title_en'},
  },
})
