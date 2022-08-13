import NuxtEnvalid, { bool, str } from '../../../src/module'

export default {
  rootDir: __dirname,
  env: {
    TITLE: 'title',
    IS_PUBLIC: true
  },
  buildModules: [
    [
      NuxtEnvalid,
      {
        specs: {
          TITLE: str(),
          SUBTITLE: str({ default: 'subtitle' }),
          IS_PUBLIC: bool({ default: false })
        }
      }
    ]
  ]
}
