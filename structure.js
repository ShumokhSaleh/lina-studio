// شكل القائمة الجانبية في لوحة التحكم
export const structure = (S) =>
  S.list()
    .title('المحتوى')
    .items([
      // "الواجهة الرئيسية" (أول قسم في الموقع) يفتح مستنداً واحداً مباشرة
      S.listItem()
        .title('الواجهة الرئيسية')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      S.documentTypeListItem('artwork').title('الأعمال الفنية'),
      S.documentTypeListItem('category').title('التصنيفات'),
      S.documentTypeListItem('exhibition').title('المعارض'),
    ])
