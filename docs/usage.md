---
layout: default
title: Usage
nav_order: 4
---

# Usage
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Usage with `env` property in Nuxt config

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

## Using together with [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)

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

## Accessing the data

Since this module is only there to validate the presence of environment variables and to load them sanitized into the already existing `process.env` and `context.env`, the general access of the data doesn't change. Take a look on the official documentation to get a deeper insight [here](https://nuxtjs.org/docs/configuration-glossary/configuration-env/).

## Missing variables

Validation takes places during build time. So if any variable out of the specified configuration is missing in the `env` property of the Nuxt config or in the `.env` file, if `@nuxtjs/dotenv` is used, the build will fail.
