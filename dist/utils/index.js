"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isIos = exports.SCREEN_HEIGHT = exports.SCREEN_WIDTH = void 0;
exports.hexToRgba = hexToRgba;
exports.generateInsets = generateInsets;
exports.generateShadow = generateShadow;
exports.capitalize = capitalize;
exports.formatAmountByCurrency = formatAmountByCurrency;
exports.getDistanceInKm = getDistanceInKm;
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
function capitalize(value = "") {
    var _a, _b;
    if (!value)
        return "";
    return ((_a = value.charAt(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + ((_b = value.slice(1)) === null || _b === void 0 ? void 0 : _b.toLowerCase());
}
function formatAmountByCurrency(amount, currency, isCurrencyLeftPositioned) {
    var _a, _b;
    const formattedAmount = new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 0,
    }).format(amount);
    return isCurrencyLeftPositioned
        ? (_a = `${currency} ${formattedAmount}`) === null || _a === void 0 ? void 0 : _a.trim()
        : (_b = `${formattedAmount} ${currency}`) === null || _b === void 0 ? void 0 : _b.trim();
}
function degreestoRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
function getDistanceInKm(start, end) {
    const EARTH_RADIUS_KM = 6371;
    // Convert latitude and longitude differences to radians
    const deltaLatitude = degreestoRadians(end.latitude - start.latitude);
    const deltaLongitude = degreestoRadians(end.longitude - start.longitude);
    const startLatitudeRad = degreestoRadians(start.latitude);
    const endLatitudeRad = degreestoRadians(end.latitude);
    // Apply Haversine formula
    const latitudeSin = Math.sin(deltaLatitude / 2);
    const longitudeSin = Math.sin(deltaLongitude / 2);
    const haversineFormula = latitudeSin * latitudeSin +
        Math.cos(startLatitudeRad) * Math.cos(endLatitudeRad) * longitudeSin * longitudeSin;
    const centralAngle = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));
    const distanceInKm = EARTH_RADIUS_KM * centralAngle;
    return distanceInKm;
}
exports.SCREEN_WIDTH = react_native_1.Dimensions.get("screen").width;
exports.SCREEN_HEIGHT = react_native_1.Dimensions.get("screen").height;
exports.isIos = react_native_1.Platform.OS === "ios";
exports.isAndroid = react_native_1.Platform.OS === "android";
