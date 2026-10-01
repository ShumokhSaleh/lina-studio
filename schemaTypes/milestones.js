import {defineArrayMember, defineField, defineType} from 'sanity'

// محطات مختارة: مستند واحد فقط (singleton)
// فيه العنوان الكبير، وتحته قائمة محطات (20 بالكثير)، كل محطة: سنة + عنوان + نبذة
// ملاحظة: كلمة "محطات مختارة" الصغيرة فوق العنوان مكتوبة في كود الموقع، مو هنا
// الموقع يرتب المحطات تلقائيًا من الأحدث للأقدم حسب السنة، فترتيب الإضافة هنا ما يفرق
export const milestones = defineType({
  name: 'milestones',
  title: 'محطات مختارة',
  type: 'document',
  fields: [
    defineField({
      name: 'heading_ar',
      title: 'العنوان (عربي)',
      description: 'مثال: من الدوحة إلى العالم',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading_en',
      title: 'Heading (English)',
      description: 'e.g. From Doha to the world',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'المحطات',
      description: 'عشرين محطة بالكثير. الموقع يرتبها تلقائيًا من الأحدث للأقدم حسب السنة',
      type: 'array',
      validation: (rule) => rule.max(20).error('الحد الأقصى عشرين محطة'),
      // منع إضافة محطة من قائمة (...) في كل عنصر
      options: {disableActions: ['duplicate', 'addBefore', 'addAfter']},
      components: {
        // إخفاء زر "Add item" لما يصير عدد المحطات عشرين
        input: (props) =>
          props.renderDefault({
            ...props,
            arrayFunctions: (props.value?.length ?? 0) >= 20 ? () => null : props.arrayFunctions,
          }),
      },
      of: [
        defineArrayMember({
          name: 'milestone',
          title: 'محطة',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'السنة',
              description: 'مثال: 2026',
              type: 'number',
              validation: (rule) => rule.required().integer().min(1900).max(2100),
            }),
            defineField({
              name: 'title_ar',
              title: 'العنوان (عربي)',
              description: 'مثال: متحف الفن الإسلامي، الدوحة',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title_en',
              title: 'Title (English)',
              description: 'e.g. Museum of Islamic Art, Doha',
              type: 'string',
            }),
            defineField({
              name: 'description_ar',
              title: 'النبذة (عربي)',
              description: 'سطر قصير تحت العنوان، مثال: معرض «اكتشف أوزبكستان»',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'description_en',
              title: 'Description (English)',
              description: 'A short line under the title',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {year: 'year', title: 'title_ar'},
            prepare({year, title}) {
              return {title: title, subtitle: year ? String(year) : ''}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'محطات مختارة'}
    },
  },
})
