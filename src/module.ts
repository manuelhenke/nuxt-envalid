import type { Module } from '@nuxt/types'
import { cleanEnv } from 'envalid'
import { name, version } from '../package.json'
import { Options } from './types'

export * from 'envalid/dist/validators'

export type ModuleOptions = Options | (() => Options)

const CONFIG_KEY = 'envalid'

async function getOptions (moduleOptions: ModuleOptions): Promise<ModuleOptions> {
  if (typeof moduleOptions === 'function') {
    moduleOptions = await moduleOptions.call(this)
  }

  let configOptions = this.options[CONFIG_KEY]

  if (typeof configOptions === 'function') {
    configOptions = await this.options[CONFIG_KEY].call(this)
  }

  return {
    specs: {},
    options: {},
    ...moduleOptions,
    ...configOptions
  }
}

const nuxtModule: Module<ModuleOptions> = async function (moduleOptions) {
  const options: Options = await getOptions.call(this, moduleOptions)

  const env = {
    ...process.env,
    ...this.options.env
  }

  const cleanEnvConfig = cleanEnv(env, options.specs, options.options)

  Object.keys(options.specs).forEach((key) => {
    this.options.env[key] = cleanEnvConfig[key]
    process.env[key] = cleanEnvConfig[key]
  })
}

;(nuxtModule as any).meta = { name, version }

declare module '@nuxt/types' {
  interface NuxtConfig { [CONFIG_KEY]?: ModuleOptions } // Nuxt 2.14+
  interface Configuration { [CONFIG_KEY]?: ModuleOptions } // Nuxt 2.9 - 2.13
}

export default nuxtModule
