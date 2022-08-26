---
layout: default
title: Configuration
nav_order: 3
---

# Configuration
{: .no_toc }


## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

| Param              | Description                                                                   | Required | Default |
| ------------------ | ----------------------------------------------------------------------------- | -------- | ------- |
| `specs`            | An object that specifies the format of required vars.                         | No       |         |
| `options`          | An (optional) object, which supports the following key:                       | No       |         |
| `options.reporter` | Pass in a function to override the default error handling and console output. | No       |         |


## `specs`

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

## `options`

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
