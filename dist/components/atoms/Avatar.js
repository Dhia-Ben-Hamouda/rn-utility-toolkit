"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Avatar;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const DEFAULT_SIZE = 42;
const DEFAULT_BACKGROUND_COLOR = "#d9d9d9";
const DEFAULT_TEXT_COLOR = "#333";
const DEFAULT_GRADIENT_COLORS = ["#333", "#999"];
const getInitials = (name) => {
    var _a, _b;
    if (!(name === null || name === void 0 ? void 0 : name.trim()))
        return "?";
    const parts = (_b = (_a = name === null || name === void 0 ? void 0 : name.trim()) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b.filter(Boolean);
    if ((parts === null || parts === void 0 ? void 0 : parts.length) === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};
function Avatar({ picture, name = "", size = DEFAULT_SIZE, containerStyle, imageStyle, textStyle, backgroundColor = DEFAULT_BACKGROUND_COLOR, textColor = DEFAULT_TEXT_COLOR, borderRadius, onPress, useGradients = false, gradientColors = DEFAULT_GRADIENT_COLORS, gradientStart = { x: 0, y: 0 }, gradientEnd = { x: 1, y: 1 }, }) {
    const initials = (0, react_1.useMemo)(() => getInitials(name), [name]);
    const resolvedBorderRadius = borderRadius !== null && borderRadius !== void 0 ? borderRadius : size / 2;
    const computedFontSize = Math.max(14, size * 0.36);
    const wrapperStyle = [
        styles.container,
        {
            width: size,
            height: size,
            borderRadius: resolvedBorderRadius,
        },
        !useGradients && { backgroundColor },
        containerStyle,
    ];
    const content = picture ? (<react_native_1.Image source={picture} style={[
            styles.image,
            {
                width: size,
                height: size,
                borderRadius: resolvedBorderRadius,
            },
            imageStyle,
        ]} resizeMode="cover"/>) : (<react_native_1.Text style={[
            styles.text,
            {
                color: textColor,
                fontSize: computedFontSize,
            },
            textStyle,
        ]} numberOfLines={1}>
      {initials}
    </react_native_1.Text>);
    if (useGradients && !picture) {
        return (<react_native_1.Pressable onPress={onPress} disabled={!onPress} style={{ borderRadius: resolvedBorderRadius }}>
        <react_native_linear_gradient_1.default colors={gradientColors} start={gradientStart} end={gradientEnd} style={wrapperStyle}>
          {content}
        </react_native_linear_gradient_1.default>
      </react_native_1.Pressable>);
    }
    return (<react_native_1.Pressable onPress={onPress} disabled={!onPress} style={{ borderRadius: resolvedBorderRadius }}>
      <react_native_1.View style={wrapperStyle}>{content}</react_native_1.View>
    </react_native_1.Pressable>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        overflow: "hidden",
    },
    text: {
        fontWeight: "700",
    },
});
