import NuxtEnvalid, { bool, num, str } from '../../../src/module';

export default {
  rootDir: __dirname,
  env: {
    TITLE: 'title',
    IS_PUBLIC: true,
  },
  buildModules: [
    [
      NuxtEnvalid,
      {
        specs: {
          TITLE: str(),
          SUBTITLE: str({ default: 'subtitle' }),
          IS_PUBLIC: bool({ default: false }),
        },
      },
    ],
  ],
  envalid: {
    specs: {
      TITLE: num(),
      SUBTITLE: str({ default: 'subtitle-overwritten' }),
      WILL_BE_OVERWRITTEN: bool(),
    },
  },
};
