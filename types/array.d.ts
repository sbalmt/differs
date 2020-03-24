import type { Patch } from '../types/core/patch';
/**
 * Differing Array.
 */
export declare class Array {
    /**
     * Get the comparison patches based on the specified base and input array.
     * @param base Base array.
     * @param input Input array.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static from<T>(base: readonly T[], input: readonly T[], comparator?: (base: T, input: T) => boolean): Patch<T>[];
}
