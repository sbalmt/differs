"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
const Objects = require("@balmanth/objects");
const core_1 = require("./core");
/**
 * Differing Array.
 */
class Array {
    /**
     * Get the comparison patches based on the specified base and input array.
     * @param base Base array.
     * @param input Input array.
     * @param comparator Optional comparator callback.
     * @returns Returns the comparison patches.
     */
    static from(base, input, comparator) {
        const table = core_1.Core.getTable(base, input, comparator !== null && comparator !== void 0 ? comparator : Objects.areEqual);
        const changes = core_1.Core.getChanges(base, input, comparator !== null && comparator !== void 0 ? comparator : Objects.areEqual, table);
        const patches = core_1.Core.getPatches(changes);
        return patches;
    }
}
exports.Array = Array;
//# sourceMappingURL=array.js.map