/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import type { Patch } from '../types/core/patch';

import { Array } from './array';

/**
 * Get all characters from the specified input string.
 * @param input Input string.
 * @returns Returns an array containing all tokens.
 */
function getChars(input: string): string[] {
  return input.split('');
}

/**
 * Get all words from the specified input string.
 * @param input Input string.
 * @returns Returns an array containing all tokens.
 */
function getWords(input: string): string[] {
  return input.split(/([\b\s]+)/);
}

/**
 * Get all lines from the specified input string.
 * @param input Input string.
 * @returns Returns an array containing all tokens.
 */
function getLines(input: string): string[] {
  return input.split(/^/m);
}

/**
 * Differing String.
 */
export class String {
  /**
   * Get the comparison patches based on the specified base and input characters.
   * @param base Left-hand side string.
   * @param input Right-hand side string.
   * @param comparator Optional comparator callback.
   * @returns Returns the comparison patches.
   */
  static fromChars(base: string, input: string, comparator?: (base: string, input: string) => boolean): Patch<string>[] {
    return Array.from(getChars(base), getChars(input), comparator);
  }

  /**
   * Get the comparison patches based on the specified base and input words.
   * @param base Left-hand side string.
   * @param input Right-hand side string.
   * @param comparator Optional comparator callback.
   * @returns Returns the comparison patches.
   */
  static fromWords(base: string, input: string, comparator?: (base: string, input: string) => boolean): Patch<string>[] {
    return Array.from(getWords(base), getWords(input), comparator);
  }

  /**
   * Get the comparison patches based on the specified base and input lines.
   * @param base Left-hand side string.
   * @param input Right-hand side string.
   * @param comparator Optional comparator callback.
   * @returns Returns the comparison patches.
   */
  static fromLines(base: string, input: string, comparator?: (base: string, input: string) => boolean): Patch<string>[] {
    return Array.from(getLines(base), getLines(input), comparator);
  }
}
