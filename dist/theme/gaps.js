"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaps = void 0;
const sizes_1 = require("./sizes");
exports.gaps = {};
sizes_1.sizes.map((size) => {
    Object.assign(exports.gaps, {
        [`gap${size}`]: {
            gap: size,
        },
        [`columnGap${size}`]: {
            columnGap: size,
        },
        [`rowGap${size}`]: {
            rowGap: size,
        },
    });
});
