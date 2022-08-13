import { setupTest, getNuxt } from '@nuxt/test-utils'

describe('key as function', () => {
  setupTest({
    server: true,
    fixture: 'fixture/env-config'
  })

  test('test env option', () => {
    const { options: { env } } = getNuxt()
    expect(env.TITLE).toBe('title')
    expect(env.SUBTITLE).toBe('subtitle')
    expect(env.IS_PUBLIC).toBe(true)
  })
})
