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
exports.default = Skeleton;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_SPEED = 2000;
const DEFAULT_BACKGROUND_COLOR = "#e4e4e4";
const DEFAULT_HIGHLIGHT_COLOR = "#bbbbbb";
const AnimatedGradient = react_native_reanimated_1.default.createAnimatedComponent(react_native_linear_gradient_1.default);
function Skeleton({ width, height, borderRadius = 8, backgroundColor = DEFAULT_BACKGROUND_COLOR, highlightColor = DEFAULT_HIGHLIGHT_COLOR, speed = DEFAULT_SPEED, shimmerWidth = 120, enabled = true, containerStyle, }) {
    const progress = (0, react_native_reanimated_1.useSharedValue)(0);
    const [containerWidth, setContainerWidth] = (0, react_1.useState)(typeof width === "number" ? width : 0);
    (0, react_1.useEffect)(() => {
        if (!enabled || containerWidth <= 0) {
            (0, react_native_reanimated_1.cancelAnimation)(progress);
            progress.value = 0;
            return;
        }
        progress.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(1, {
            duration: speed,
            easing: react_native_reanimated_1.Easing.linear,
        }), -1, false);
        return () => {
            (0, react_native_reanimated_1.cancelAnimation)(progress);
        };
    }, [containerWidth, enabled, progress, speed]);
    const onLayout = (event) => {
        if (typeof width !== "number") {
            setContainerWidth(event.nativeEvent.layout.width);
        }
    };
    const shimmerBandWidth = shimmerWidth * 2.4;
    const animatedShimmerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const translateX = (0, react_native_reanimated_1.interpolate)(progress.value, [0, 1], [-shimmerBandWidth, containerWidth]);
        return {
            transform: [{ translateX }, { skewX: "-18deg" }],
        };
    });
    return (<react_native_1.View onLayout={onLayout} style={[
            styles.container,
            {
                width,
                height,
                borderRadius,
                backgroundColor,
            },
            containerStyle,
        ]}>
      {enabled && containerWidth > 0 ? (<AnimatedGradient pointerEvents="none" colors={[
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0)",
                highlightColor,
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0)",
            ]} locations={[0, 0.3, 0.5, 0.7, 1]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[
                styles.shimmer,
                {
                    width: shimmerBandWidth,
                    height: height * 1.6,
                    top: -height * 0.3,
                },
                animatedShimmerStyle,
            ]}/>) : null}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        overflow: "hidden",
    },
    shimmer: {
        position: "absolute",
        opacity: 0.95,
    },
});
