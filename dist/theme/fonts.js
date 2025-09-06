"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fonts = void 0;
const colors_1 = require("./colors");
const sizes_1 = require("./sizes");
exports.fonts = {
    latoThin: {
        fontFamily: "Lato_Thin",
    },
    latoRegular: {
        fontFamily: "Lato_Regular",
    },
    latoLight: {
        fontFamily: "Lato_Light",
    },
    latoBold: {
        fontFamily: "Lato_Bold",
    },
    latoBlack: {
        fontFamily: "Lato_Black",
    },
    center: {
        textAlign: "center",
    },
    left: {
        textAlign: "left",
    },
    right: {
        textAlign: "right",
    },
    justify: {
        textAlign: "justify",
    },
    underline: {
        textDecorationLine: "underline",
    },
};
(_a = Object.entries(colors_1.colors)) === null || _a === void 0 ? void 0 : _a.forEach(([key, value]) => {
    Object.assign(exports.fonts, {
        [`${key}`]: {
            color: value,
        },
    });
});
sizes_1.sizes.forEach((size) => {
    Object.assign(exports.fonts, {
        [`size${size}`]: {
            fontSize: size,
        },
        [`line${size}`]: {
            lineHeight: size,
        },
    });
});
