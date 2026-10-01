import {defineField, defineType} from 'sanity'

// عن الفنانة: مستند واحد فقط (singleton)
// فيه الاقتباس الكبير، والنبذة، وتكريم واحد اختياري (مثل: 2024 سفيرة التواصل الاجتماعي في الفن)
// ملاحظة: كلمة "عن الفنانة" الصغيرة فوق الاقتباس مكتوبة في كود الموقع، مو هنا
export const aboutArtist = defineType({
  name: 'aboutArtist',
  title: 'عن الفنانة',
  type: 'document',
  fields: [
    defineField({
      name: 'quote_ar',
      title: 'الاقتباس (عربي)',
      description: 'الجملة الكبيرة، مثال: التراث لا يُستنسخ، بل يُعاد اكتشافه.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote_en',
      title: 'Quote (English)',
      description: 'e.g. Heritage is not copied, it is rediscovered.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'bio_ar',
      title: 'النبذة (عربي)',
      description: 'لعمل فقرة جديدة اتركي سطرًا فاضيًا بين الفقرتين',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio_en',
      title: 'Bio (English)',
      description: 'Leave an empty line between paragraphs',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'award',
      title: 'التكريم (اختياري)',
      description: 'يظهر تحت النبذة. اتركيه فاضيًا إذا ما تبين تعرضينه',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      // إذا بدأت تعبئته: السنة واسم التكريم بالعربي لازم يكونون موجودين
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || (!value.year && !value.title_ar && !value.title_en)) return true
          if (!value.year || !value.title_ar) {
            return 'اكتبي السنة واسم التكريم (عربي)، أو امسحي كل حقول التكريم'
          }
          return true
        }),
      fields: [
        defineField({
          name: 'year',
          title: 'السنة',
          description: 'مثال: 2024',
          type: 'number',
          validation: (rule) => rule.integer().min(1900).max(2100),
        }),
        defineField({
          name: 'title_ar',
          title: 'اسم التكريم (عربي)',
          description: 'مثال: سفيرة التواصل الاجتماعي في الفن',
          type: 'string',
        }),
        defineField({
          name: 'title_en',
          title: 'Title (English)',
          description: 'e.g. Social Media Ambassador for Art',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'عن الفنانة'}
    },
  },
})
