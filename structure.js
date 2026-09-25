// شكل القائمة الجانبية في لوحة التحكم
export const structure = (S) =>
  S.list()
    .title('المحتوى')
    .items([
      // "عن الفنانة" يفتح مستنداً واحداً مباشرة
      S.listItem()
        .title('عن الفنانة')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      S.documentTypeListItem('artwork').title('الأعمال الفنية'),
      S.documentTypeListItem('category').title('التصنيفات'),
      S.documentTypeListItem('exhibition').title('المعارض'),
    ])
