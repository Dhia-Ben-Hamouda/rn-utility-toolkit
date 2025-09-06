"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.backgrounds = void 0;
const colors_1 = require("./colors");
exports.backgrounds = {};
(_a = Object.entries(colors_1.colors)) === null || _a === void 0 ? void 0 : _a.forEach(([key, value]) => {
    Object.assign(exports.backgrounds, {
        [`${key}`]: {
            backgroundColor: value,
        },
    });
});
