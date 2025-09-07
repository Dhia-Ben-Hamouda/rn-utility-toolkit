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
exports.default = Chip;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR = "#555";
const DEFAULT_CHIP_BACKGROUND_COLOR = "#fff";
const DEFAULT_ACTIVE_CHIP_TEXT_COLOR = "#fff";
const DEFAULT_CHIP_TEXT_COLOR = "#555";
function Chip({ value, activeValue, onChipPress, containerStyle, labelStyle, startPicture, activeChipBackgroundColor = DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR, chipBackgroundColor = DEFAULT_CHIP_BACKGROUND_COLOR, activeChipTextColor = DEFAULT_ACTIVE_CHIP_TEXT_COLOR, chipTextColor = DEFAULT_CHIP_TEXT_COLOR, }) {
    const isEqaul = (0, react_native_reanimated_1.useSharedValue)(value === activeValue);
    const derivedIsEqaul = (0, react_native_reanimated_1.useDerivedValue)(() => isEqaul.value ? (0, react_native_reanimated_1.withTiming)(1) : (0, react_native_reanimated_1.withTiming)(0));
    (0, react_1.useEffect)(() => {
        isEqaul.value = value === activeValue;
    }, [activeValue, isEqaul, value]);
    const animatedBackgroundColor = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const backgroundColor = (0, react_native_reanimated_1.interpolateColor)(derivedIsEqaul.value, [0, 1], [chipBackgroundColor, activeChipBackgroundColor]);
        return {
            backgroundColor,
        };
    });
    const animatedTextColor = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const color = (0, react_native_reanimated_1.interpolateColor)(derivedIsEqaul.value, [0, 1], [chipTextColor, activeChipTextColor]);
        return {
            color,
        };
    });
    return (<react_native_1.TouchableOpacity hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }} onPress={() => {
            onChipPress && onChipPress(value);
        }}>
      <react_native_reanimated_1.default.View style={[styles.chip, containerStyle, animatedBackgroundColor]}>
        {startPicture && (<react_native_1.Image resizeMode="contain" style={{ width: 16, height: 20 }} source={startPicture}/>)}
        <react_native_reanimated_1.default.Text style={[styles.text, labelStyle, animatedTextColor]}>
          {value}
        </react_native_reanimated_1.default.Text>
      </react_native_reanimated_1.default.View>
    </react_native_1.TouchableOpacity>);
}
const styles = react_native_1.StyleSheet.create({
    chip: Object.assign({ backgroundColor: "#fff", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 50, flexDirection: "row", alignItems: "center", gap: 8 }, react_native_1.Platform.select({
        ios: {
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 10,
        },
        android: {
            elevation: 2,
        },
    })),
    text: {},
});
