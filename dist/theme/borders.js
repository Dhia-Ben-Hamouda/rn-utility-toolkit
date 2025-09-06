"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borders = void 0;
const colors_1 = require("./colors");
const sizes_1 = require("./sizes");
exports.borders = {};
Object.entries(colors_1.colors).forEach(([key, value]) => {
    Object.assign(exports.borders, {
        [`${key}`]: {
            borderColor: value,
        },
    });
});
sizes_1.sizes.forEach((size) => {
    Object.assign(exports.borders, {
        [`width${size}`]: {
            borderWidth: size,
        },
        [`rounded${size}`]: {
            borderRadius: size,
        },
        [`roundedTopRight${size}`]: {
            borderTopRightRadius: size,
        },
        [`roundedBottomRight${size}`]: {
            borderBottomRightRadius: size,
        },
        [`roundedBottomLeft${size}`]: {
            borderBottomLeftRadius: size,
        },
        [`roundedTopLeft${size}`]: {
            borderTopLeftRadius: size,
        },
    });
});
