import {defineArrayMember, defineField, defineType} from 'sanity'

// الإحصائيات: مستند واحد فقط (singleton) فيه ثلاثة أرقام مع نص تحت كل رقم
export const stats = defineType({
  name: 'stats',
  title: 'الإحصائيات',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'الإحصائيات',
      description: 'ثلاث إحصائيات بالضبط، بنفس الترتيب اللي تظهر فيه بالموقع',
      type: 'array',
      validation: (rule) => rule.length(3).error('لازم تكون ثلاث إحصائيات بالضبط'),
      of: [
        defineArrayMember({
          name: 'stat',
          title: 'إحصائية',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'الرقم',
              description: 'مثال: 20',
              type: 'number',
              validation: (rule) => rule.required().min(0).integer(),
            }),
            defineField({
              name: 'plus',
              title: 'إظهار علامة + بجانب الرقم',
              description: 'مثال: +20',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'label_ar',
              title: 'النص (عربي)',
              description: 'مثال: عامًا في الفنون والتعليم',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label_en',
              title: 'Text (English)',
              description: 'e.g. Years in art and education',
              type: 'string',
            }),
          ],
          preview: {
            select: {number: 'number', plus: 'plus', label: 'label_ar'},
            prepare({number, plus, label}) {
              return {title: `${plus ? '+' : ''}${number ?? ''}`, subtitle: label}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'الإحصائيات'}
    },
  },
})
