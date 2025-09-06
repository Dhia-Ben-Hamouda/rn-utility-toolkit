"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gutters = void 0;
const sizes_1 = require("./sizes");
exports.gutters = sizes_1.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
        [`margin${size}`]: {
            margin: size,
        },
        [`marginTop${size}`]: {
            marginTop: size,
        },
        [`marginRight${size}`]: {
            marginRight: size,
        },
        [`marginBottom${size}`]: {
            marginBottom: size,
        },
        [`marginLeft${size}`]: {
            marginLeft: size,
        },
        [`marginHorizontal${size}`]: {
            marginHorizontal: size,
        },
        [`marginVertical${size}`]: {
            marginVertical: size,
        },
        [`marginStart${size}`]: {
            marginStart: size,
        },
        [`marginEnd${size}`]: {
            marginEnd: size,
        },
        [`padding${size}`]: {
            padding: size,
        },
        [`paddingTop${size}`]: {
            paddingTop: size,
        },
        [`paddingRight${size}`]: {
            paddingRight: size,
        },
        [`paddingBottom${size}`]: {
            paddingBottom: size,
        },
        [`paddingLeft${size}`]: {
            paddingLeft: size,
        },
        [`paddingHorizontal${size}`]: {
            paddingHorizontal: size,
        },
        [`paddingVertical${size}`]: {
            paddingVertical: size,
        },
        [`paddingStart${size}`]: {
            paddingStart: size,
        },
        [`paddingEnd${size}`]: {
            paddingEnd: size,
        },
    });
}, {});
