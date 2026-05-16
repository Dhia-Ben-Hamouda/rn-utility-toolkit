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
exports.default = Expandable;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
function Expandable({ isOpen, children, contentContainerStyle, }) {
    const contentRef = (0, react_native_reanimated_1.useAnimatedRef)();
    const animatedContainerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        var _a, _b;
        const measuredContentHeight = (_b = (_a = (0, react_native_reanimated_1.measure)(contentRef)) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : 0;
        const height = (0, react_native_reanimated_1.interpolate)(isOpen.value, [0, 1], [0, measuredContentHeight]);
        return {
            height,
            overflow: "hidden",
        };
    });
    return (<react_native_reanimated_1.default.View style={[animatedContainerStyle]}>
      <react_native_reanimated_1.default.View style={[styles.contentContainer, contentContainerStyle]} ref={contentRef}>
        {children}
      </react_native_reanimated_1.default.View>
    </react_native_reanimated_1.default.View>);
}
const styles = react_native_1.StyleSheet.create({
    contentContainer: {
        position: "absolute",
        top: 0,
    },
});
