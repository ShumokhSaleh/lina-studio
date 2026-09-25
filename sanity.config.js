import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

// الأنواع التي لها مستند واحد فقط (مثل صفحة "عن الفنانة")
const singletonTypes = new Set(['about'])

export default defineConfig({
  name: 'default',
  title: 'lina-portfolio',

  projectId: '8t1sl8zv',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // إخفاء "عن الفنانة" من زر "إنشاء جديد" حتى لا يتكرر
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // منع النسخ والحذف لمستند "عن الفنانة"
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
