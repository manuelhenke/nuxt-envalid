import { setupTest } from '@nuxt/test-utils';

describe('key as function', () => {
  test('test env option', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(number => {
      throw new Error('process.exit: ' + number);
    });
    expect(() => {
      setupTest({
        fixture: 'fixture/env-config-top-object',
      });
    }).toThrow();
    mockExit.mockRestore();
  });
});
