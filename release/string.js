"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("./array");
/**
 * Get all characters from the specified input string.
 * @param input Input string.
 * @returns Returns an array containing all tokens.
 */
function getChars(input) {
    return input.split('');
}
/**
 * Get all words from the specified input string.
 * @param input Input string.
 * @returns Returns an array containing all tokens.
 */
function getWords(input) {
    return input.split(/([\b\s]+)/);
}
/**
 * Get all lines from the specified input string.
 * @param input Input string.
 * @returns Returns an array containing all tokens.
 */
function getLines(input) {
    return input.split(/^/m);
}
/**
 * Differing String.
 */
class String {
    /**
     * Get the comparison patches based on the specified base and input characters.
     * @param base Left-hand side string.
     * @param input Right-hand side string.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static fromChars(base, input, comparator) {
        return array_1.Array.from(getChars(base), getChars(input), comparator);
    }
    /**
     * Get the comparison patches based on the specified base and input words.
     * @param base Left-hand side string.
     * @param input Right-hand side string.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static fromWords(base, input, comparator) {
        return array_1.Array.from(getWords(base), getWords(input), comparator);
    }
    /**
     * Get the comparison patches based on the specified base and input lines.
     * @param base Left-hand side string.
     * @param input Right-hand side string.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static fromLines(base, input, comparator) {
        return array_1.Array.from(getLines(base), getLines(input), comparator);
    }
}
exports.String = String;
//# sourceMappingURL=string.js.map