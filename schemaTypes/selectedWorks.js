import {defineArrayMember, defineField, defineType} from 'sanity'

// أعمال مختارة: مستند واحد فقط (singleton)
// فيه العنوان والنص التعريفي للقسم، وتحته ثلاث صور بالكثير
// ملاحظة: كلمة "أعمال مختارة" الصغيرة فوق العنوان مكتوبة في كود الموقع، مو هنا
export const selectedWorks = defineType({
  name: 'selectedWorks',
  title: 'أعمال مختارة',
  type: 'document',
  fields: [
    defineField({
      name: 'heading_ar',
      title: 'العنوان (عربي)',
      description: 'مثال: حوار بين الذاكرة والمكان',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading_en',
      title: 'Heading (English)',
      description: 'e.g. A dialogue between memory and place',
      type: 'string',
    }),
    defineField({
      name: 'intro_ar',
      title: 'النص التعريفي (عربي)',
      description: 'السطر اللي بجانب العنوان',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'intro_en',
      title: 'Intro text (English)',
      description: 'The line next to the heading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'works',
      title: 'الأعمال',
      description: 'ثلاث أعمال بالكثير، بنفس الترتيب اللي تظهر فيه بالموقع (الرقم يطلع تلقائيًا)',
      type: 'array',
      validation: (rule) => rule.max(3).error('الحد الأقصى ثلاث أعمال'),
      // منع إضافة عمل من قائمة (...) في كل عنصر
      options: {disableActions: ['duplicate', 'addBefore', 'addAfter']},
      components: {
        // إخفاء زر "Add item" لما يصير عدد الأعمال ثلاثة
        input: (props) =>
          props.renderDefault({
            ...props,
            arrayFunctions: (props.value?.length ?? 0) >= 3 ? () => null : props.arrayFunctions,
          }),
      },
      of: [
        defineArrayMember({
          name: 'work',
          title: 'عمل',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'الصورة',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
              // وصف قصير للصورة يقرأه قارئ الشاشة لمن لا يرى الصورة
              fields: [
                defineField({
                  name: 'alt_ar',
                  title: 'وصف الصورة (عربي)',
                  description: 'جملة قصيرة تصف اللي في الصورة، مثال: لوحة فيها نخلة وبحر بألوان زرقاء',
                  type: 'string',
                }),
                defineField({
                  name: 'alt_en',
                  title: 'Image description (English)',
                  description: 'A short sentence describing the image',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'title_ar',
              title: 'اسم العمل (عربي)',
              description: 'مثال: وتر الذاكرة',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title_en',
              title: 'Title (English)',
              type: 'string',
            }),
            defineField({
              name: 'detail_ar',
              title: 'معلومة إضافية (عربي)',
              description: 'تظهر صغيرة بجانب الاسم، مثال: 2026 أو البحر والذاكرة',
              type: 'string',
            }),
            defineField({
              name: 'detail_en',
              title: 'Extra detail (English)',
              description: 'e.g. 2026 or The sea and memory',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title_ar', subtitle: 'detail_ar', media: 'image'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'أعمال مختارة'}
    },
  },
})
