import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8t1sl8zv',
    dataset: 'production'
  },
  deployment: {
    // رقم تعريف الاستوديو المرفوع، عشان "npm run deploy" يرفع على نفس الرابط بدون ما يسأل عن الاسم
    appId: 'odn3ikl0dyd8l418rxndjany',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
