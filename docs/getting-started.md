---
layout: default
title: Getting Started
nav_order: 2
---

# Getting Started
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Install

Add `nuxt-envalid` as dev-dependency to your project via `yarn` or `npm`:

{% tabs install %}
  {% tab install yarn %}
  ```sh
  yarn add --dev nuxt-envalid
  ```
  {% endtab %}

  {% tab install npm %}
  ```sh
  npm install --save-dev nuxt-envalid
  ```
  {% endtab %}
{% endtabs %}

## Nuxt config

Add `nuxt-envalid` to the `buildModules` section of `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  buildModules: ['nuxt-envalid'],
};
```

{: .warning }
If you are using a Nuxt version previous than **v2.9** you have to install the module as a `dependency` (No `--dev` or `--save-dev` flags) and also use `modules` section in `nuxt.config.js` instead of `buildModules`.

There a pretty much four different ways to provide a [configuration]({{ site.baseurl }}{% link configuration.md %}) for this module. You are free the choose which fits you the most.

### Inline config

```js
// nuxt.config.js
export default {
  buildModules: [
    ['nuxt-envalid', { /* module config */ }],
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
    ['nuxt-envalid', () => ({ /* module config */ })],
  ],
  /* or at top level */
  envalid: () => ({
    /* module config */
  }),
};
```

{: .danger }
Defining a module configuration inline will overwrite a module configuration defined at top level.
