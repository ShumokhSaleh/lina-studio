import {defineArrayMember, defineField, defineType} from 'sanity'

// روابط مهمة: مستند واحد فقط (singleton)، يظهر في الفوتر
// فيه خمس روابط بالكثير (مثل: لقاء مع جريدة)، كل رابط: عنوان + الرابط نفسه
// ملاحظة: عنوان "روابط مهمة" والحقوق (© السنة والاسم) مكتوبين في كود الموقع، مو هنا
export const importantLinks = defineType({
  name: 'importantLinks',
  title: 'روابط مهمة',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'الروابط',
      description: 'خمس روابط بالكثير، بنفس الترتيب اللي تظهر فيه بالموقع (اسحبي الرابط لتغيير ترتيبه)',
      type: 'array',
      validation: (rule) => rule.max(5).error('الحد الأقصى خمس روابط'),
      // منع إضافة رابط من قائمة (...) في كل عنصر
      options: {disableActions: ['duplicate', 'addBefore', 'addAfter']},
      components: {
        // إخفاء زر "Add item" لما يصير عدد الروابط خمسة
        input: (props) =>
          props.renderDefault({
            ...props,
            arrayFunctions: (props.value?.length ?? 0) >= 5 ? () => null : props.arrayFunctions,
          }),
      },
      of: [
        defineArrayMember({
          name: 'link',
          title: 'رابط',
          type: 'object',
          fields: [
            defineField({
              name: 'title_ar',
              title: 'عنوان الرابط (عربي)',
              description: 'مثال: لقائي مع جريدة الشرق',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title_en',
              title: 'Link title (English)',
              description: 'e.g. Interview with Al Sharq',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'الرابط',
              description: 'انسخي الرابط من المتصفح، مثال: https://al-sharq.com/...',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {
            select: {title: 'title_ar', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'روابط مهمة'}
    },
  },
})
