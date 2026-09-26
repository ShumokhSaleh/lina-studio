import {defineArrayMember, defineField, defineType} from 'sanity'

// عن الفنانة: مستند واحد فقط (singleton)
export const about = defineType({
  name: 'about',
  title: 'عن الفنانة',
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
      name: 'bio_ar',
      title: 'النبذة (عربي)',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'bio_en',
      title: 'Bio (English)',
      type: 'text',
      rows: 6,
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
    defineField({
      name: 'email',
      title: 'البريد الإلكتروني',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'other_links',
      title: 'روابط أخرى',
      description: 'أي حسابات تواصل إضافية',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          fields: [
            defineField({
              name: 'label',
              title: 'اسم الرابط',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'الرابط',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name_ar', subtitle: 'name_en', media: 'portrait'},
    prepare({title, subtitle, media}) {
      return {title: title || 'عن الفنانة', subtitle, media}
    },
  },
})
