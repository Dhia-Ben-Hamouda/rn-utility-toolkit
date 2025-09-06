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
exports.default = RadioButton;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
function RadioButton({ label, onChange, value, activeValue, labelStyle, color = "#555", containerStyle, radioContainerStyle, customDotSize = 10, }) {
    const isRadioChecked = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        isRadioChecked.value = (0, react_native_reanimated_1.withTiming)(activeValue === value ? 1 : 0, {
            duration: 300,
        });
    }, [activeValue, isRadioChecked, value]);
    const animatedRadioDotStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const dimension = (0, react_native_reanimated_1.interpolate)(isRadioChecked.value, [0, 1], [0, customDotSize]);
        return {
            width: dimension,
            height: dimension,
            backgroundColor: color,
            borderRadius: 50,
        };
    });
    const handlePress = () => {
        onChange && onChange(value);
    };
    return (<react_native_1.Pressable hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }} style={styles.pressable} onPress={handlePress}>
      <react_native_1.View style={[styles.container, containerStyle]}>
        <react_native_1.View style={[
            styles.radioContainer,
            radioContainerStyle,
            color && { borderColor: color },
        ]}>
          <react_native_reanimated_1.default.View style={[animatedRadioDotStyle]}/>
        </react_native_1.View>
        <react_native_1.Text style={[styles.label, labelStyle]}>{label}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.Pressable>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    label: {
        fontSize: 16,
        color: "#555",
    },
    radioContainer: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pressable: {
        alignSelf: "flex-start",
    },
});
