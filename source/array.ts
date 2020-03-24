/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Objects from '@balmanth/objects';

import type { Patch } from '../types/core/patch';

import { Core } from './core';

/**
 * Differing Array.
 */
export class Array {
  /**
   * Get the comparison patches based on the specified base and input array.
   * @param base Base array.
   * @param input Input array.
   * @param comparator Optional comparator callback.
   * @returns Returns the comparison patches.
   */
  static from<T>(base: readonly T[], input: readonly T[], comparator?: (base: T, input: T) => boolean): Patch<T>[] {
    const table = Core.getTable(base, input, comparator ?? Objects.areEqual);
    const changes = Core.getChanges(base, input, comparator ?? Objects.areEqual, table);
    const patches = Core.getPatches(changes);
    return patches;
  }
}
