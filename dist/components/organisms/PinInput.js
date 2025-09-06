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
exports.default = PinInput;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_PIN_LENGTH = 6;
const DEFAULT_BLINKING_SPEED = 500;
const DEFAULT_CURSOR_COLOR = "#555";
const DEFAULT_FOCUSED_PIN_BORDER_COLOR = "#555";
function PinInput({ pinLength = DEFAULT_PIN_LENGTH, blinkingSpeed = DEFAULT_BLINKING_SPEED, onChange, value, cursorColor, activePinStyle, pinStyle, containerStyle, secureTextEntry = false, shouldOnlyAcceptNumbers = true, }) {
    var _a;
    const textInputRef = (0, react_1.useRef)(null);
    const isCursorBlinking = (0, react_native_reanimated_1.useSharedValue)(0);
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            isCursorBlinking.value = (0, react_native_reanimated_1.withTiming)(isCursorBlinking.value ? 0 : 1);
        }, blinkingSpeed);
        return () => {
            clearInterval(interval);
        };
    }, [isCursorBlinking, blinkingSpeed]);
    const animatedCursorStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(isCursorBlinking.value, [0, 1], [0, 1], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            height: 16,
            width: 2,
            backgroundColor: cursorColor !== null && cursorColor !== void 0 ? cursorColor : DEFAULT_CURSOR_COLOR,
            opacity,
        };
    });
    return (<react_native_1.Pressable onPress={() => {
            var _a;
            (_a = textInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }}>
      <react_native_1.TextInput autoFocus={false} keyboardType="number-pad" maxLength={pinLength} value={value} style={[styles.input]} ref={textInputRef} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChangeText={(newValue) => {
            if ((newValue === null || newValue === void 0 ? void 0 : newValue.length) > pinLength) {
                return;
            }
            if (shouldOnlyAcceptNumbers && !/^[0-9]{0,}$/.test(newValue)) {
                return;
            }
            onChange && onChange(newValue);
        }}/>
      <react_native_1.View style={[styles.container, containerStyle]}>
        {(_a = Array.from({ length: pinLength })) === null || _a === void 0 ? void 0 : _a.map((_, index) => {
            const isActivePin = index === (value === null || value === void 0 ? void 0 : value.length);
            return (<react_native_1.View key={index} style={[
                    styles.pinItem,
                    pinStyle,
                    isActivePin &&
                        isFocused && Object.assign({ borderColor: DEFAULT_FOCUSED_PIN_BORDER_COLOR, borderWidth: 1 }, activePinStyle),
                ]}>
              {value[index] ? (secureTextEntry ? (<react_native_1.View style={[styles.dot]}/>) : (<react_native_1.Text style={[styles.pinText]}>{value[index]}</react_native_1.Text>)) : isActivePin && isFocused ? (<react_native_reanimated_1.default.View style={[animatedCursorStyle]}/>) : null}
            </react_native_1.View>);
        })}
      </react_native_1.View>
    </react_native_1.Pressable>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    input: {
        position: "absolute",
        opacity: 0,
    },
    pinItem: {
        width: 52,
        height: 52,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    pinText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#555",
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: "#555",
        borderRadius: 50,
    },
});
