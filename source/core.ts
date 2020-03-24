/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import type { Patch } from '../types/core/patch';
import type { Change } from '../types/core/change';

import { Action } from '../types/core/action';

/**
 * Differing.
 */
export class Core {
  /**
   * Get the comparison table based on the specified base and input array.
   * @param base Base array.
   * @param input Input array.
   * @param comparator Comparator callback.
   * @returns Returns the comparison table.
   */
  static getTable<T>(
    base: readonly T[],
    input: readonly T[],
    comparator: (base: T, input: T) => boolean
  ): Uint32Array[] {
    const table = [];
    let rows = new Uint32Array(input.length);
    for (let baseIndex = 0; baseIndex < base.length; baseIndex++) {
      let diagonal = 0;
      table[baseIndex] = rows = rows.slice();
      for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
        const latch = rows[inputIndex];
        if (comparator(base[baseIndex], input[inputIndex])) {
          rows[inputIndex] = diagonal + 1;
        } else {
          const previous = rows[inputIndex - 1] ?? 0;
          if (previous > rows[inputIndex]) {
            rows[inputIndex] = previous;
          }
        }
        diagonal = latch;
      }
    }
    return table;
  }

  /**
   * Get the comparison changes based on the specified base and input array.
   * @param base Base array.
   * @param input Input array.
   * @param comparator Comparator callback.
   * @param table Comparison table.
   * @returns Returns the comparison patches.
   */
  static getChanges<T>(
    base: readonly T[],
    input: readonly T[],
    comparator: (base: T, input: T) => boolean,
    table: Uint32Array[]
  ): Change<T>[] {
    const changes = [];
    const values = [];
    let previous, action, value;
    for (let baseIndex = base.length - 1, inputIndex = input.length - 1; baseIndex > -1 || inputIndex > -1; ) {
      if (baseIndex < 0) {
        action = Action.Insert;
        value = input[inputIndex--];
      } else if (inputIndex < 0) {
        action = Action.Remove;
        value = base[baseIndex--];
      } else if (comparator(base[baseIndex], input[inputIndex])) {
        action = Action.Keep;
        value = base[baseIndex--];
        inputIndex--;
      } else {
        const topResult = baseIndex > 0 ? table[baseIndex - 1][inputIndex] : -1;
        const leftResult = inputIndex > 0 ? table[baseIndex][inputIndex - 1] : -1;
        if (topResult < leftResult) {
          action = Action.Insert;
          value = input[inputIndex--];
        } else {
          action = Action.Remove;
          value = base[baseIndex--];
        }
      }
      if (previous === void 0) {
        changes.push((previous = <Change<T>>{ action: action }));
      } else if (previous.action !== action) {
        previous.values = values.splice(0, values.length).reverse();
        changes.push((previous = <Change<T>>{ action: action }));
      }
      values.push(value);
    }
    if (previous !== void 0) {
      previous.values = values.reverse();
    }
    return changes.reverse();
  }

  /**
   * Get the comparison patches based on the specified change lists.
   * @param changes Change list.
   * @returns Returns the comparison patches.
   */
  static getPatches<T>(changes: readonly Change<T>[]): Patch<T>[] {
    const patches = [];
    let previous;
    for (const change of changes) {
      switch (change.action) {
        case Action.Keep:
          if (previous === void 0 || previous.action !== Action.Keep) {
            patches.push((previous = <Patch<T>>{ action: change.action, selection: change.values.slice() }));
          } else {
            previous.selection.push(...change.values);
          }
          break;
        case Action.Insert:
          if (previous === void 0 || previous.action === Action.Keep) {
            patches.push((previous = <Patch<T>>{ action: change.action, selection: change.values.slice() }));
          } else if (previous.action === Action.Remove) {
            previous.replacement = change.values;
            previous.action = Action.Change;
          } else if (previous.action === Action.Change) {
            previous.replacement!.push(...change.values);
          } else {
            previous.selection.push(...change.values);
          }
          break;
        case Action.Remove:
          if (previous === void 0 || previous.action === Action.Keep) {
            patches.push((previous = <Patch<T>>{ action: change.action, selection: change.values.slice() }));
          } else if (previous.action === Action.Insert) {
            previous.replacement = previous.selection;
            previous.selection = change.values;
            previous.action = Action.Change;
          } else {
            previous.selection.push(...change.values);
          }
          break;
      }
    }
    return patches;
  }
}
