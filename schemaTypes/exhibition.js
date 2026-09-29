import {defineField, defineType} from 'sanity'

// حالة المعرض تُحسب تلقائيًا من التاريخ (لينا ما تكتبها بنفسها)
// نفس القاعدة لازم تُستخدم في الموقع
export function exhibitionStatus(startDate, endDate) {
  if (!startDate) return null
  const today = new Date().toISOString().slice(0, 10) // مثال: 2026-09-29
  const end = endDate || startDate // لو ما فيه تاريخ نهاية نعتبره يوم واحد
  if (today < startDate) return 'قريبًا'
  if (today > end) return 'عُرض سابقًا'
  return 'معروض حاليًا'
}

// المعارض: كل معرض مستند مستقل، ولينا تقدر تضيف أكثر من معرض
export const exhibition = defineType({
  name: 'exhibition',
  title: 'معرض',
  type: 'document',
  fields: [
    defineField({
      name: 'title_ar',
      title: 'عنوان المعرض (عربي)',
      description: 'مثال: وتر الذاكرة',
      type: 'string',
      validation: (rule) => rule.required().error('عنوان المعرض مطلوب'),
    }),
    defineField({
      name: 'title_en',
      title: 'Exhibition title (English)',
      type: 'string',
    }),
    defineField({
      name: 'description_ar',
      title: 'وصف المعرض (عربي)',
      description: 'مثال: ضمن معرض «اكتشف أوزبكستان» في متحف الفن الإسلامي بالدوحة…',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'startDate',
      title: 'تاريخ البداية (من)',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
    }),
    defineField({
      name: 'endDate',
      title: 'تاريخ النهاية (إلى)',
      description: 'كلمة "معروض حاليًا" أو "عُرض سابقًا" تظهر تلقائيًا حسب التاريخ',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      validation: (rule) =>
        rule.custom((endDate, {document}) => {
          if (endDate && document?.startDate && endDate < document.startDate) {
            return 'تاريخ النهاية لازم يكون بعد تاريخ البداية'
          }
          return true
        }),
    }),
    defineField({
      name: 'venue_ar',
      title: 'مكان المعرض (عربي)',
      description: 'مثال: متحف الفن الإسلامي',
      type: 'string',
    }),
    defineField({
      name: 'venue_en',
      title: 'Venue (English)',
      description: 'e.g. Museum of Islamic Art',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'رابط المعرض',
      description: 'مثال: https://mia.org.qa/...',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'الأحدث أولًا',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title_ar', startDate: 'startDate', endDate: 'endDate'},
    prepare({title, startDate, endDate}) {
      const status = exhibitionStatus(startDate, endDate)
      const dates = [startDate, endDate].filter(Boolean).join(' — ')
      return {title, subtitle: [status, dates].filter(Boolean).join(' · ')}
    },
  },
})
