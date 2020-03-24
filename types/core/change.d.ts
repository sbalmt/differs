/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import type { Action } from './action';

/**
 * Change type.
 */
export interface Change<T> {
  /**
   * Change action.
   */
  action: Action;
  /**
   * Change values.
   */
  values: T[];
}
