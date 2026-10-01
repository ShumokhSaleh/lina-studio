import {defineField, defineType} from 'sanity'

// تواصل: مستند واحد فقط (singleton)
// فيه رابط الإنستغرام (إجباري) والبريد الإلكتروني (اختياري)
// ملاحظة: كلمة "للتعاون" والعنوان "لنصنع أثرًا يبقى." والسطر اللي تحته مكتوبين في كود الموقع، مو هنا
export const contact = defineType({
  name: 'contact',
  title: 'تواصل',
  type: 'document',
  fields: [
    defineField({
      name: 'instagram',
      title: 'رابط إنستغرام',
      description: 'مثال: https://www.instagram.com/linaalaali',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((value) => {
            if (!value) return true
            // نقبل الحروف الكبيرة والصغيرة، ولازم يكون فيه اسم مستخدم بعد instagram.com/
            return /^https:\/\/(www\.)?instagram\.com\/[^/?#]+/i.test(value)
              ? true
              : 'لازم يكون رابط إنستغرام فيه اسم المستخدم، مثال: https://www.instagram.com/linaalaali'
          }),
    }),
    defineField({
      name: 'email',
      title: 'البريد الإلكتروني (اختياري)',
      description: 'مثال: lina@example.com — اتركيه فاضيًا إذا ما تبين تعرضينه',
      type: 'email',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'تواصل'}
    },
  },
})
