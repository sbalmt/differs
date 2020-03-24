/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import type { Patch } from '../types/core/patch';
import type { Change } from '../types/core/change';
/**
 * Differing.
 */
export declare class Core {
    /**
     * Get the comparison table based on the specified base and input array.
     * @param base Base array.
     * @param input Input array.
     * @param comparator Comparator callback.
     * @returns Returns the comparison table.
     */
    static getTable<T>(base: readonly T[], input: readonly T[], comparator: (base: T, input: T) => boolean): Uint32Array[];
    /**
     * Get the comparison changes based on the specified base and input array.
     * @param base Base array.
     * @param input Input array.
     * @param comparator Comparator callback.
     * @param table Comparison table.
     * @returns Returns the comparison patches.
     */
    static getChanges<T>(base: readonly T[], input: readonly T[], comparator: (base: T, input: T) => boolean, table: Uint32Array[]): Change<T>[];
    /**
     * Get the comparison patches based on the specified change lists.
     * @param changes Change list.
     * @returns Returns the comparison patches.
     */
    static getPatches<T>(changes: readonly Change<T>[]): Patch<T>[];
}
