import { CleanOptions, ValidatorSpec } from 'envalid';

export interface Options<T = any> {
  /**
   * An object that specifies the format of required vars.
   * @default {}
   */
  specs: { [K in keyof T]: ValidatorSpec<T[K]> };
  /**
   * An object that specifies options for cleanEnv.
   * @default {}
   */
  options: CleanOptions<T>;
}
