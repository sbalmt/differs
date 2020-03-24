/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import type { Patch } from '../types/core/patch';
/**
 * Differing String.
 */
export declare class String {
    /**
     * Get the comparison patches based on the specified base and input characters.
     * @param base Left-hand side string.
     * @param input Right-hand side string.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static fromChars(base: string, input: string, comparator?: (base: string, input: string) => boolean): Patch<string>[];
    /**
     * Get the comparison patches based on the specified base and input words.
     * @param base Left-hand side string.
     * @param input Right-hand side string.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static fromWords(base: string, input: string, comparator?: (base: string, input: string) => boolean): Patch<string>[];
    /**
     * Get the comparison patches based on the specified base and input lines.
     * @param base Left-hand side string.
     * @param input Right-hand side string.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static fromLines(base: string, input: string, comparator?: (base: string, input: string) => boolean): Patch<string>[];
}
