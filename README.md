[![CI](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/ci.yml/badge.svg)](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/ci.yml)
[![CodeQL](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/manuelhenke/nuxt-envalid/actions/workflows/codeql-analysis.yml)
[![License](https://img.shields.io/github/license/manuelhenke/nuxt-envalid)](./LICENSE)
[![NPM version](https://img.shields.io/npm/v/nuxt-envalid.svg?style=flat)](https://www.npmjs.com/package/nuxt-envalid)

# nuxt-envalid

A Nuxt.js module thats validates your env variables and loads them cleaned into your application context. Uses [envalid](https://github.com/af/envalid) under the hood.

## Setup

1. Add `nuxt-envalid` dependency to your project

```bash
yarn add --dev nuxt-envalid # or npm install --save-dev nuxt-envalid
```

2. Add `nuxt-envalid` to the `buildModules` section of `nuxt.config.js`

:warning: If you are using a Nuxt version previous than **v2.9** you have to install module as a `dependency` (No `--dev` or `--save-dev` flags) and also use `modules` section in `nuxt.config.js` instead of `buildModules`.

```js
export default {
  buildModules: ['nuxt-envalid']
}
```

### Using inline options
```js
export default {
  buildModules: [
    ['nuxt-envalid', { /* module options */ }]
  ]
}
```

### Using top level options

```js
export default {
  buildModules: [
    'nuxt-envalid'
  ],
  envalid: {
    /* module options */
  }
}
```

### Using a function to provide options

```js
export default {
  buildModules: [
    [
    'nuxt-envalid',
      () => (
        {
          /* module options */
        }
      )
    ]
  ],
  /* or at top level */ 
  envalid: () => ({
    /* module options */
  })
}
```

### Hierarchy
Defining module options inline will overwrite module options defined at top level.

## Options

### `specs`

- Type: `{ [key: string]: ValidatorSpec }`
- Default: `{}`

For further information take a look at the [official documentation of envalid](https://github.com/af/envalid#validator-types).

```js
import { bool, str } from 'nuxt-envalid'
export default {
  env: {
    TITLE: 'title',
    IS_PUBLIC: true
  },
  buildModules: [
    'nuxt-envalid'
  ],
  envalid: {
    specs: {
      TITLE: str(),
      SUBTITLE: str({ default: 'subtitle' }),
      IS_PUBLIC: bool({ default: false })
    }
  }
}
```

### `options`

- Type: `CleanOptions`
- Default: `{}`

For further information take a look at the [official documentation of envalid](https://github.com/af/envalid#error-reporting).

```js
export default {
  buildModules: [
    'nuxt-envalid'
  ],
  envalid: {
    specs: {
      TITLE: str(),
    },
    options: {
      reporter: ({ errors, env }) => {
        console.log(errors, env)
      }
    }
  }
}
```

## Usage

After creating your .env file in the project root, simply run your usual `yarn dev` or `npm run dev`.
The variable inside the .env file will be added to the context (`context.env`) and process (`process.env`).

## Using together with [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)

This module will validate the result of `@nuxtjs/dotenv` as well and then overwrite the values of the variables defined in the `specs`. Be sure to include this module **AFTER** `@nuxtjs/dotenv`.

```sh
# .env file
TITLE='title'
IS_PUBLIC=true
```
```js
export default {
  buildModules: [
    '@nuxtjs/dotenv',
    'nuxt-envalid'
  ],
  envalid: {
    specs: {
      TITLE: str(),
      SUBTITLE: str({ default: 'subtitle' }),
      IS_PUBLIC: bool({ default: false })
    }
  }
}
```

## License

[MIT License](./LICENSE)
