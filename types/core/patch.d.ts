/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import { Action } from './action';

/**
 * Patch type.
 */
export interface Patch<T> {
  /**
   * Patch action.
   */
  action: Action;
  /**
   * Change selection.
   */
  selection: T[];
  /**
   * Change replacement.
   */
  replacement?: T[];
}
