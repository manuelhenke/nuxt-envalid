import { setupTest, getNuxt } from '@nuxt/test-utils'

describe('key as function', () => {
  setupTest({
    fixture: 'fixture/env-config-top-object'
  })

  test('test env option', () => {
    const { options: { env } } = getNuxt()
    expect(env.TITLE).toBe('title')
    expect(env.SUBTITLE).toBe('subtitle')
    expect(env.IS_PUBLIC).toBe(true)
  })
})
