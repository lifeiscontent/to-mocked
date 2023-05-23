"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMocked = void 0;
function toMocked(value) {
    return new Proxy(value, {
        get(target, property, receiver) {
            if (!Reflect.has(target, property)) {
                throw new Error(`Property ${String(property)} does not exist on ${JSON.stringify(target)}`);
            }
            const value = Reflect.get(target, property, receiver);
            return typeof value === "object" ? toMocked(value) : value;
        },
    });
}
exports.toMocked = toMocked;
