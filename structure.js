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
      // "الإحصائيات" مستند واحد فيه ثلاثة أرقام
      S.listItem()
        .title('الإحصائيات')
        .id('stats')
        .child(S.document().schemaType('stats').documentId('stats')),
    ])
