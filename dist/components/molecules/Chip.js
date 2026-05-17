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
const DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR = "#333";
const DEFAULT_CHIP_BACKGROUND_COLOR = "#fff";
const DEFAULT_ACTIVE_CHIP_TEXT_COLOR = "#fff";
const DEFAULT_CHIP_TEXT_COLOR = "#333";
const DEFAULT_ACTIVE_ICON_COLOR = "#fff";
const DEFAULT_ICON_COLOR = "#333";
function Chip({ value, activeValue = "", onChipPress, containerStyle, labelStyle, startIcon, endIcon, activeChipBackgroundColor = DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR, chipBackgroundColor = DEFAULT_CHIP_BACKGROUND_COLOR, activeChipTextColor = DEFAULT_ACTIVE_CHIP_TEXT_COLOR, chipTextColor = DEFAULT_CHIP_TEXT_COLOR, activeIconColor = DEFAULT_ACTIVE_ICON_COLOR, iconColor = DEFAULT_ICON_COLOR, isReadyOnly = false, customHitSlop = { bottom: 5, top: 5, left: 5, right: 5 }, }) {
    const isEqual = (0, react_native_reanimated_1.useSharedValue)(value === activeValue);
    const derivedIsEqual = (0, react_native_reanimated_1.useDerivedValue)(() => isEqual.value ? (0, react_native_reanimated_1.withTiming)(1) : (0, react_native_reanimated_1.withTiming)(0));
    const isActive = value === activeValue;
    (0, react_1.useEffect)(() => {
        isEqual.value = value === activeValue;
    }, [activeValue, isEqual, value]);
    const animatedBackgroundColor = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const backgroundColor = (0, react_native_reanimated_1.interpolateColor)(derivedIsEqual.value, [0, 1], [chipBackgroundColor, activeChipBackgroundColor]);
        return {
            backgroundColor,
        };
    });
    const animatedTextColor = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const color = (0, react_native_reanimated_1.interpolateColor)(derivedIsEqual.value, [0, 1], [chipTextColor, activeChipTextColor]);
        return {
            color,
        };
    });
    const resolvedIconColor = isActive ? activeIconColor : iconColor;
    const renderIcon = (icon) => {
        if (!react_1.default.isValidElement(icon)) {
            return icon;
        }
        return react_1.default.cloneElement(icon, {
            fill: resolvedIconColor,
            stroke: resolvedIconColor,
            color: resolvedIconColor,
        });
    };
    return (<react_native_1.TouchableOpacity disabled={isReadyOnly} hitSlop={customHitSlop} onPress={() => {
            onChipPress === null || onChipPress === void 0 ? void 0 : onChipPress(value);
        }}>
      <react_native_reanimated_1.default.View style={[styles.chip, containerStyle, animatedBackgroundColor]}>
        {renderIcon(startIcon)}
        <react_native_reanimated_1.default.Text style={[styles.text, labelStyle, animatedTextColor]}>
          {value}
        </react_native_reanimated_1.default.Text>
        {renderIcon(endIcon)}
      </react_native_reanimated_1.default.View>
    </react_native_1.TouchableOpacity>);
}
const styles = react_native_1.StyleSheet.create({
    chip: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 4,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.1)",
    },
    text: {},
});
