"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Differing.
 */
class Core {
    /**
     * Get the comparison table based on the specified base and input array.
     * @param base Base array.
     * @param input Input array.
     * @param comparator Comparator callback.
     * @returns Returns the comparison table.
     */
    static getTable(base, input, comparator) {
        var _a;
        const table = [];
        let rows = new Uint32Array(input.length);
        for (let baseIndex = 0; baseIndex < base.length; baseIndex++) {
            let diagonal = 0;
            table[baseIndex] = rows = rows.slice();
            for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
                const latch = rows[inputIndex];
                if (comparator(base[baseIndex], input[inputIndex])) {
                    rows[inputIndex] = diagonal + 1;
                }
                else {
                    const previous = (_a = rows[inputIndex - 1]) !== null && _a !== void 0 ? _a : 0;
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
    static getChanges(base, input, comparator, table) {
        const changes = [];
        const values = [];
        let previous, action, value;
        for (let baseIndex = base.length - 1, inputIndex = input.length - 1; baseIndex > -1 || inputIndex > -1;) {
            if (baseIndex < 0) {
                action = 1 /* Insert */;
                value = input[inputIndex--];
            }
            else if (inputIndex < 0) {
                action = 2 /* Remove */;
                value = base[baseIndex--];
            }
            else if (comparator(base[baseIndex], input[inputIndex])) {
                action = 0 /* Keep */;
                value = base[baseIndex--];
                inputIndex--;
            }
            else {
                const topResult = baseIndex > 0 ? table[baseIndex - 1][inputIndex] : -1;
                const leftResult = inputIndex > 0 ? table[baseIndex][inputIndex - 1] : -1;
                if (topResult < leftResult) {
                    action = 1 /* Insert */;
                    value = input[inputIndex--];
                }
                else {
                    action = 2 /* Remove */;
                    value = base[baseIndex--];
                }
            }
            if (previous === void 0) {
                changes.push((previous = { action: action }));
            }
            else if (previous.action !== action) {
                previous.values = values.splice(0, values.length).reverse();
                changes.push((previous = { action: action }));
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
    static getPatches(changes) {
        const patches = [];
        let previous;
        for (const change of changes) {
            switch (change.action) {
                case 0 /* Keep */:
                    if (previous === void 0 || previous.action !== 0 /* Keep */) {
                        patches.push((previous = { action: change.action, selection: change.values.slice() }));
                    }
                    else {
                        previous.selection.push(...change.values);
                    }
                    break;
                case 1 /* Insert */:
                    if (previous === void 0 || previous.action === 0 /* Keep */) {
                        patches.push((previous = { action: change.action, selection: change.values.slice() }));
                    }
                    else if (previous.action === 2 /* Remove */) {
                        previous.replacement = change.values;
                        previous.action = 3 /* Change */;
                    }
                    else if (previous.action === 3 /* Change */) {
                        previous.replacement.push(...change.values);
                    }
                    else {
                        previous.selection.push(...change.values);
                    }
                    break;
                case 2 /* Remove */:
                    if (previous === void 0 || previous.action === 0 /* Keep */) {
                        patches.push((previous = { action: change.action, selection: change.values.slice() }));
                    }
                    else if (previous.action === 1 /* Insert */) {
                        previous.replacement = previous.selection;
                        previous.selection = change.values;
                        previous.action = 3 /* Change */;
                    }
                    else {
                        previous.selection.push(...change.values);
                    }
                    break;
            }
        }
        return patches;
    }
}
exports.Core = Core;
//# sourceMappingURL=core.js.map