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
exports.default = FlipCard;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
function PlaceholderCard({ label }) {
    return (<react_native_1.View style={styles.placeholderContainer}>
      <react_native_1.Text style={styles.placeholderText}>{label}</react_native_1.Text>
    </react_native_1.View>);
}
function FlipCard({ backCard = <PlaceholderCard label="Back Card"/>, frontCard = <PlaceholderCard label="Front Card"/>, containerStyle, }) {
    const isRotated = (0, react_native_reanimated_1.useSharedValue)(0);
    const animatedFrontCardStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const rotation = (0, react_native_reanimated_1.interpolate)(isRotated.value, [0, 1], [0, 180], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [
                {
                    perspective: 1000,
                },
                {
                    rotateY: `${rotation}deg`,
                },
            ],
        };
    });
    const animatedBackCardStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const rotation = (0, react_native_reanimated_1.interpolate)(isRotated.value, [0, 1], [180, 360], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [
                {
                    perspective: 1000,
                },
                {
                    rotateY: `${rotation}deg`,
                },
            ],
        };
    });
    const toggleRotation = () => {
        isRotated.value = (0, react_native_reanimated_1.withTiming)(isRotated.value ? 0 : 1, {
            duration: 500,
            easing: react_native_reanimated_1.Easing.linear,
        });
    };
    return (<react_native_1.Pressable onPress={toggleRotation} style={[styles.container, containerStyle]}>
      <react_native_reanimated_1.default.View style={[styles.card, animatedFrontCardStyle]}>
        {frontCard}
      </react_native_reanimated_1.default.View>
      <react_native_reanimated_1.default.View style={[styles.card, animatedBackCardStyle]}>
        {backCard}
      </react_native_reanimated_1.default.View>
    </react_native_1.Pressable>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        width: "100%",
        height: 230,
    },
    card: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
    },
    placeholderContainer: {
        backgroundColor: "#333",
        height: "100%",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
    },
});
