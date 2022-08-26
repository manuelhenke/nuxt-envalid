![Logo of nuxt-envalid](/docs/assets/images/banner_1.png)

# nuxt-envalid

[![CI](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/ci.yml/badge.svg)](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/ci.yml)
[![CodeQL](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/codeql-analysis.yml)
[![License](https://img.shields.io/github/license/manuelhenke/nuxt-envalid)](./LICENSE)
[![NPM version](https://img.shields.io/npm/v/nuxt-envalid.svg?style=flat)](https://www.npmjs.com/package/nuxt-envalid)

> Dead simple [Envalid](https://github.com/af/envalid) integration for [Nuxt 2](https://nuxtjs.org).

- ✨ &nbsp;[Release Notes](CHANGELOG.md)
- 📖 &nbsp;[Documentation](https://nuxt-envalid.henkebyte.com)

## Features

- Define a required schema for your environment variables
- Validates variables in the `env` property of the `nuxt.config.js`
- Validates variables in `process.env`
- Validates variables present in the `.env` file, if loaded together with [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)
- Fails the build process if a variable is missing
- Loads them cleaned and enriched with default values into your application context (`process.env` and `context.env`)

## Getting Started

1. Add `nuxt-envalid` dependency to your project

```bash
yarn add --dev nuxt-envalid # or npm install --save-dev nuxt-envalid
```

2. Add `nuxt-envalid` to the `buildModules` section of `nuxt.config.js`

:warning: If you are using a Nuxt version previous than **v2.9** you have to install module as a `dependency` (No `--dev` or `--save-dev` flags) and also use `modules` section in `nuxt.config.js` instead of `buildModules`.

```js
// nuxt.config.js
export default {
  buildModules: ['nuxt-envalid'],
};
```

### Inline config

```js
// nuxt.config.js
export default {
  buildModules: [
    [
      'nuxt-envalid',
      {
        /* module config */
      },
    ],
  ],
};
```

### Top level config

```js
// nuxt.config.js
export default {
  buildModules: ['nuxt-envalid'],
  envalid: {
    /* module config */
  },
};
```

### Config function

If you need to use a function to provide the module config you are good to go:

```js
// nuxt.config.js
export default {
  buildModules: [
    [
      'nuxt-envalid',
      () => ({
        /* module config */
      }),
    ],
  ],
  /* or at top level */
  envalid: () => ({
    /* module config */
  }),
};
```

:warning: Defining module options inline will overwrite module options defined at top level.

## Configuration

### Overview

| Param              | Description                                                                   | Required | Default |
| ------------------ | ----------------------------------------------------------------------------- | -------- | ------- |
| `specs`            | An object that specifies the format of required vars.                         | No       |         |
| `options`          | An (optional) object, which supports the following key:                       | No       |         |
| `options.reporter` | Pass in a function to override the default error handling and console output. | No       |         |

### `specs`

For further information take a look at the [official documentation of envalid](https://github.com/af/envalid#validator-types).

```js
// nuxt.config.js
import { bool, str } from 'nuxt-envalid';
export default {
  buildModules: ['nuxt-envalid'],
  envalid: {
    specs: {
      TITLE: str(),
      SUBTITLE: str({ default: 'subtitle' }),
      IS_PUBLIC: bool({ default: false }),
    },
  },
};
```

### `options`

For further information take a look at the [official documentation of envalid](https://github.com/af/envalid#error-reporting).

```js
// nuxt.config.js
export default {
  buildModules: ['nuxt-envalid'],
  envalid: {
    options: {
      reporter: ({ errors, env }) => {
        console.log(errors, env);
      },
    },
  },
};
```

## Usage

### Usage with `env` property in Nuxt config

```js
// nuxt.config.js
import { bool, host } from 'nuxt-envalid';
export default {
  env: {
    BACKEND_HOST: 'backend.example.com',
  },
  buildModules: ['nuxt-envalid'],
  envalid: {
    specs: {
      BACKEND_HOST: host(),
      BACKEND_SECURE: bool({ default: true }),
    },
  },
};
```

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>{ { post.title } }</h1>
    <p>{ { post.description } }</p>
  </div>
</template>

<script>
export default {
  async asyncData({ env }) {
    const response = await fetch(
      `${env.BACKEND_SECURE ? 'https' : 'http'}://${env.BACKEND_HOST}/post/1`
    );
    const post = await response.json();
    return { post };
  },
};
</script>
```

### Using together with [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)

This module will validate the result of `@nuxtjs/dotenv`.

{: .warning }
Be sure to include this module **AFTER** `@nuxtjs/dotenv`.

```sh
# .env
CTF_CDA_ACCESS_TOKEN="super-secret-access-token"
```

```js
// nuxt.config.js
import { str } from 'nuxt-envalid';
export default {
  env: {
    CTF_SPACE_ID: 'my-space-id',
  },
  buildModules: ['@nuxtjs/dotenv', 'nuxt-envalid'],
  envalid: {
    specs: {
      CTF_SPACE_ID: str(),
      CTF_CDA_ACCESS_TOKEN: str(),
      CTF_ENVIRONMENT: str({ default: 'production' }),
    },
  },
};
```

```js
// plugins/contentful.js
import { createClient } from 'contentful';

export default createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  environment: process.env.CTF_ENVIRONMENT,
});
```

### Accessing the data

Since this module is only there to validate the presence of environment variables and to load them sanitized into the already existing `process.env` and `context.env`, the general access of the data doesn't change. Take a look on the official documentation to get a deeper insight [here](https://nuxtjs.org/docs/configuration-glossary/configuration-env/).

### Missing variables

Validation takes places during build time. So if any variable out of the specified configuration is missing in the `env` property of the Nuxt config or in the `.env` file, if `@nuxtjs/dotenv` is used, the build will fail.

## License

[MIT License](./LICENSE)
