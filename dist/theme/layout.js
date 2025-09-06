"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = void 0;
const utils_1 = require("../utils");
exports.layout = {
    // Flex direction
    row: { flexDirection: "row" },
    col: { flexDirection: "column" },
    // Justify content
    justifyStart: { justifyContent: "flex-start" },
    justifyCenter: { justifyContent: "center" },
    justifyEnd: { justifyContent: "flex-end" },
    justifyBetween: { justifyContent: "space-between" },
    justifyAround: { justifyContent: "space-around" },
    justifyEvenly: { justifyContent: "space-evenly" },
    // Align items
    itemsStart: { alignItems: "flex-start" },
    itemsCenter: { alignItems: "center" },
    itemsEnd: { alignItems: "flex-end" },
    itemsStretch: { alignItems: "stretch" },
    itemsBaseline: { alignItems: "baseline" },
    // Align self
    selfStart: { alignSelf: "flex-start" },
    selfCenter: { alignSelf: "center" },
    selfEnd: { alignSelf: "flex-end" },
    selfStretch: { alignSelf: "stretch" },
    // Flex wrap
    wrap: { flexWrap: "wrap" },
    noWrap: { flexWrap: "nowrap" },
    // Center both axes
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    // Position
    absolute: { position: "absolute" },
    relative: { position: "relative" },
    // zIndex helpers
    z0: { zIndex: 0 },
    z1: { zIndex: 1 },
    z10: { zIndex: 10 },
    z100: { zIndex: 100 },
    z1000: { zIndex: 1000 },
    generateIndex: (value) => ({
        zIndex: value,
    }),
    // Position offsets
    top0: { top: 0 },
    generateTop: (value) => ({
        top: value,
    }),
    right0: { right: 0 },
    generateRight: (value) => ({
        right: value,
    }),
    bottom0: { bottom: 0 },
    generateBottom: (value) => ({
        bottom: value,
    }),
    left0: { left: 0 },
    generateLeft: (value) => ({
        left: value,
    }),
    // Width percentages
    w10Percent: { width: "10%" },
    w20Percent: { width: "20%" },
    w30Percent: { width: "30%" },
    w40Percent: { width: "40%" },
    w50Percent: { width: "50%" },
    w60Percent: { width: "60%" },
    w70Percent: { width: "70%" },
    w80Percent: { width: "80%" },
    w90Percent: { width: "90%" },
    w100Percent: { width: "100%" },
    wScreen: { width: utils_1.SCREEN_WIDTH },
    generateHeight: (height) => ({
        height,
    }),
    generateMinHeight: (minHeight) => ({
        minHeight,
    }),
    generateMaxHeight: (maxHeight) => ({
        maxHeight,
    }),
    // Height percentages
    h10Percent: { height: "10%" },
    h20Percent: { height: "20%" },
    h30Percent: { height: "30%" },
    h40Percent: { height: "40%" },
    h50Percent: { height: "50%" },
    h60Percent: { height: "60%" },
    h70Percent: { height: "70%" },
    h80Percent: { height: "80%" },
    h90Percent: { height: "90%" },
    h100Percent: { height: "100%" },
    hScreen: { height: utils_1.SCREEN_HEIGHT },
    generateWidth: (width) => ({
        width,
    }),
    generateMinWidth: (minWidth) => ({
        minWidth,
    }),
    generateMaxWidth: (maxWidth) => ({
        maxWidth,
    }),
    // Overflow
    overflowHidden: { overflow: "hidden" },
    overflowVisible: { overflow: "visible" },
    // Flex
    flex_1: {
        flex: 1,
    },
    flexGrow: {
        flexGrow: 1,
    },
    halfFlex: {
        flex: 0.5,
    },
    generateFlex: (value) => ({
        flex: value,
    }),
    // Transforms
    generateTranslateX: (value) => ({
        transform: [{ translateX: value }],
    }),
    generateTranslateY: (value) => ({
        transform: [{ translateY: value }],
    }),
    generateScale: (value) => ({
        transform: [{ scale: value }],
    }),
    generateScaleX: (value) => ({
        transform: [{ scaleX: value }],
    }),
    generateScaleY: (value) => ({
        transform: [{ scaleY: value }],
    }),
    generateRotate: (angle) => ({
        transform: [{ rotate: `${angle}deg` }],
    }),
    generateRotateZ: (angle) => ({
        transform: [{ rotateZ: `${angle}deg` }],
    }),
    generateRotateY: (angle) => ({
        transform: [{ rotateY: `${angle}deg` }],
    }),
    generateSkewX: (angle) => ({
        transform: [{ skewX: `${angle}deg` }],
    }),
    generateSkewY: (angle) => ({
        transform: [{ skewY: `${angle}deg` }],
    }),
};
