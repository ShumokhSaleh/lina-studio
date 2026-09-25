import {defineField, defineType} from 'sanity'

// العمل الفني: صورة + عنوان + وصف + تصنيف
export const artwork = defineType({
  name: 'artwork',
  title: 'الأعمال الفنية',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'الصورة',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      // وصف الصورة لضعاف البصر ومحركات البحث
      fields: [
        defineField({
          name: 'alt_ar',
          title: 'وصف الصورة (عربي)',
          description: 'جملة قصيرة تصف ما في الصورة',
          type: 'string',
        }),
        defineField({
          name: 'alt_en',
          title: 'Image description (English)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'title_ar',
      title: 'العنوان (عربي)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'description_ar',
      title: 'الوصف (عربي)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'التصنيف',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'year',
      title: 'سنة الإنجاز',
      type: 'number',
      validation: (rule) => rule.integer().min(1900).max(2100),
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
    {
      title: 'السنة (الأحدث أولاً)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title_ar', subtitle: 'category.title_ar', media: 'image'},
  },
})
