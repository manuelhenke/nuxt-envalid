import NuxtEnvalid, { bool, num, str } from '../../../src/module';

export default {
  rootDir: __dirname,
  env: {},
  buildModules: [NuxtEnvalid],
  envalid: {
    specs: {
      TITLE: num(),
      SUBTITLE: str({ default: 'subtitle-overwritten' }),
      WILL_BE_OVERWRITTEN: bool(),
    },
  },
};
