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
      // "المعارض" قائمة، لينا تقدر تضيف فيها أكثر من معرض
      // الترتيب: الأحدث ثم الأقدم، والمعارض بدون تاريخ آخر شي
      S.listItem()
        .title('المعارض')
        .id('exhibition')
        .child(
          S.documentTypeList('exhibition')
            .title('المعارض')
            .defaultOrdering([{field: 'startDate', direction: 'desc', nulls: 'last'}]),
        ),
      // "أعمال مختارة" مستند واحد فيه العنوان والنص وست صور بالكثير
      S.listItem()
        .title('أعمال مختارة')
        .id('selectedWorks')
        .child(S.document().schemaType('selectedWorks').documentId('selectedWorks')),
      // "عن الفنانة" مستند واحد فيه الاقتباس والنبذة والتكريم
      S.listItem()
        .title('عن الفنانة')
        .id('aboutArtist')
        .child(S.document().schemaType('aboutArtist').documentId('aboutArtist')),
      // "محطات مختارة" مستند واحد فيه العنوان وعشرين محطة بالكثير
      S.listItem()
        .title('محطات مختارة')
        .id('milestones')
        .child(S.document().schemaType('milestones').documentId('milestones')),
      // "تواصل" مستند واحد فيه رابط الإنستغرام والبريد الإلكتروني
      S.listItem()
        .title('تواصل')
        .id('contact')
        .child(S.document().schemaType('contact').documentId('contact')),
    ])
