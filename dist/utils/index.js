"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isIos = exports.SCREEN_HEIGHT = exports.SCREEN_WIDTH = void 0;
exports.hexToRgba = hexToRgba;
exports.generateInsets = generateInsets;
exports.generateShadow = generateShadow;
exports.capitalize = capitalize;
exports.formatAmountByCurrency = formatAmountByCurrency;
const react_native_1 = require("react-native");
function hexToRgba(hex, opacity) {
    hex = hex === null || hex === void 0 ? void 0 : hex.replace(/^#/, "");
    if ((hex === null || hex === void 0 ? void 0 : hex.length) === 3) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
function generateInsets(value) {
    return {
        left: value,
        top: value,
        right: value,
        bottom: value,
    };
}
function generateShadow(shadowColor = "#000000", shadowOffset = { height: 0, width: 0 }, shadowOpacity = 0.15, shadowRadius = 5, elevation = 2) {
    return react_native_1.Platform.select({
        ios: {
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
        },
        android: {
            elevation,
        },
    });
}
function capitalize(value) {
    var _a, _b, _c;
    return (((_a = String(value[0])) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + ((_c = (_b = String(value)) === null || _b === void 0 ? void 0 : _b.slice(1)) === null || _c === void 0 ? void 0 : _c.toLowerCase()));
}
function formatAmountByCurrency(amount, currency) {
    var _a;
    const formattedAmount = new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 0,
    }).format(amount);
    return (_a = `${formattedAmount} ${currency}`) === null || _a === void 0 ? void 0 : _a.trim();
}
exports.SCREEN_WIDTH = react_native_1.Dimensions.get("screen").width;
exports.SCREEN_HEIGHT = react_native_1.Dimensions.get("screen").height;
exports.isIos = react_native_1.Platform.OS === "ios";
exports.isAndroid = react_native_1.Platform.OS === "android";
