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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Switch;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_ACTIVE_COLOR = "#555";
const DEFAULT_INACTIVE_COLOR = "#ccc";
function Switch({ onChange, value, containerStyle, thumbStyle, customThumbTranslation, activeSwitchColor = DEFAULT_ACTIVE_COLOR, inactiveSwitchColor = DEFAULT_INACTIVE_COLOR, }) {
    const isToggled = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        isToggled.value = (0, react_native_reanimated_1.withTiming)(value ? 1 : 0);
    }, [value, isToggled]);
    const handleThumbPress = () => {
        onChange && onChange(!value);
    };
    const animatedThumbStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const translationX = (0, react_native_reanimated_1.interpolate)(isToggled.value, [0, 1], [0, customThumbTranslation !== null && customThumbTranslation !== void 0 ? customThumbTranslation : 22]);
        return {
            transform: [
                {
                    translateX: translationX,
                },
            ],
        };
    });
    const animatedContainerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const backgroundColor = (0, react_native_reanimated_1.interpolateColor)(isToggled.value, [0, 1], [inactiveSwitchColor, activeSwitchColor]);
        return {
            backgroundColor,
        };
    });
    return (<react_native_1.Pressable style={{ alignSelf: "flex-start" }} onPress={handleThumbPress}>
      <react_native_reanimated_1.default.View hitSlop={25} style={[styles.container, containerStyle, animatedContainerStyle]}>
        <react_native_reanimated_1.default.View style={[styles.thumb, thumbStyle, animatedThumbStyle]}/>
      </react_native_reanimated_1.default.View>
    </react_native_1.Pressable>);
}
const styles = react_native_1.StyleSheet.create({
    container: Object.assign({ backgroundColor: "#555", padding: 4, borderRadius: 50, width: 46 }, react_native_1.Platform.select({
        ios: {
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowColor: "#000",
            shadowOpacity: 0.15,
        },
        android: {
            elevation: 2,
        },
    })),
    thumb: {
        width: 16,
        height: 16,
        backgroundColor: "#fff",
        borderRadius: 50,
    },
});
