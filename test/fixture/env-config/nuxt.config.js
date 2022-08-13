import { bool, str } from '../../../src/module'

export default {
  rootDir: __dirname,
  env: {
    TITLE: 'title',
    IS_PUBLIC: true
  },
  buildModules: [
    '../../../src/module.ts'
  ],
  envalid: {
    specs: {
      TITLE: str(),
      SUBTITLE: str({ default: 'subtitle' }),
      IS_PUBLIC: bool({ default: false })
    }
  }
}
