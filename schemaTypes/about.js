import {defineArrayMember, defineField, defineType} from 'sanity'

// الواجهة الرئيسية (أول قسم في الموقع): مستند واحد فقط (singleton)
// فيه فقط الحقول اللي تظهر في الهيرو
export const about = defineType({
  name: 'about',
  title: 'الواجهة الرئيسية',
  type: 'document',
  fields: [
    defineField({
      name: 'name_ar',
      title: 'الاسم (عربي)',
      type: 'string',
    }),
    defineField({
      name: 'name_en',
      title: 'Name (English)',
      type: 'string',
    }),
    defineField({
      name: 'tagline_ar',
      title: 'السطر تحت الاسم (عربي)',
      description: 'مثال: فنانة تشكيلية قطرية',
      type: 'string',
    }),
    defineField({
      name: 'tagline_en',
      title: 'Tagline under the name (English)',
      description: 'e.g. Qatari visual artist',
      type: 'string',
    }),
    defineField({
      name: 'tags_ar',
      title: 'الوسوم فوق الاسم (عربي)',
      description: 'مثال: فن معاصر، ذاكرة، هوية',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'tags_en',
      title: 'Tags above the name (English)',
      description: 'e.g. Contemporary art, Memory, Identity',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'portrait',
      title: 'الصورة الشخصية',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'instagram',
      title: 'رابط إنستغرام',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'name_ar', subtitle: 'name_en', media: 'portrait'},
    prepare({title, subtitle, media}) {
      return {title: title || 'الواجهة الرئيسية', subtitle, media}
    },
  },
})
