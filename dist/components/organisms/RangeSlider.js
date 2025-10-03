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
exports.default = Slider;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_worklets_1 = require("react-native-worklets");
const utils_1 = require("../../utils");
const DEFAULT_UNIT = "TND";
const DEFAULT_COLOR = "#333";
function Slider({ value: propValue, onChange, thumbStyle, progressStyle, color = DEFAULT_COLOR, trackStyle, unit = DEFAULT_UNIT, max = 50000, min = 0, sliderWidth = 300, step = 1, isRange = false, }) {
    const normalizedValue = Array.isArray(propValue)
        ? propValue
        : [propValue, max];
    const value = normalizedValue;
    const thumbPosition = (0, react_native_reanimated_1.useSharedValue)(0);
    const thumbPosition2 = (0, react_native_reanimated_1.useSharedValue)(0);
    const animatedValue = (0, react_native_reanimated_1.useSharedValue)(value[0]);
    const animatedValue2 = (0, react_native_reanimated_1.useSharedValue)(value[1]);
    const ctx = (0, react_native_reanimated_1.useSharedValue)({ startX: 0, startY: 0 });
    const ctx2 = (0, react_native_reanimated_1.useSharedValue)({ startX: 0, startY: 0 });
    const isLabelVisible = (0, react_native_reanimated_1.useSharedValue)(0);
    const isLabelVisible2 = (0, react_native_reanimated_1.useSharedValue)(0);
    const [popupValue, setPopupValue] = (0, react_1.useState)(value[0]);
    const [popupValue2, setPopupValue2] = (0, react_1.useState)(value[1]);
    const isDraggingRef = (0, react_1.useRef)(false);
    const setDragging = (v) => {
        isDraggingRef.current = v;
    };
    const stepWidth = (step / (max - min)) * sliderWidth;
    (0, react_1.useEffect)(() => {
        const currentValue = Array.isArray(propValue) ? propValue[0] : propValue;
        const snapped = Math.round(currentValue / step) * step;
        const ratio = (snapped - min) / (max - min || 1);
        const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));
        animatedValue.value = snapped;
        ctx.value = { startX: pos, startY: 0 };
        thumbPosition.value = pos;
        setPopupValue(snapped);
    }, []);
    (0, react_1.useEffect)(() => {
        if (isDraggingRef.current)
            return;
        const currentValue = Array.isArray(propValue) ? propValue[0] : propValue;
        const snapped = Math.round(currentValue / step) * step;
        if (snapped === animatedValue.value)
            return;
        const ratio = (snapped - min) / (max - min || 1);
        const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));
        animatedValue.value = snapped;
        ctx.value = { startX: pos, startY: 0 };
        thumbPosition.value = (0, react_native_reanimated_1.withTiming)(pos, { duration: 160 });
        setPopupValue(snapped);
    }, [propValue, min, max, sliderWidth, step]);
    const handleChange = (val1, val2) => {
        if (isRange) {
            onChange([val1, val2]);
        }
        else {
            onChange(val1);
        }
    };
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .onStart(() => {
        (0, react_native_worklets_1.runOnJS)(setDragging)(true);
        ctx.value = { startX: thumbPosition.value, startY: 0 };
        isLabelVisible.value = (0, react_native_reanimated_1.withTiming)(1);
    })
        .onUpdate((event) => {
        let newPosition = event.translationX + ctx.value.startX;
        if (newPosition < 0)
            newPosition = 0;
        if (newPosition > sliderWidth)
            newPosition = sliderWidth;
        if (isRange) {
            const maxAllowed = thumbPosition2.value - stepWidth * 2;
            newPosition = Math.min(maxAllowed, newPosition);
        }
        const rawValue = (newPosition / (sliderWidth || 1)) * (max - min) + min;
        const snappedValue = Math.round(rawValue / step) * step;
        const ratio = (snappedValue - min) / (max - min || 1);
        const snappedPosition = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));
        thumbPosition.value = snappedPosition;
        animatedValue.value = snappedValue;
        (0, react_native_worklets_1.runOnJS)(setPopupValue)(snappedValue);
    })
        .onEnd(() => {
        ctx.value = { startX: thumbPosition.value, startY: 0 };
        isLabelVisible.value = (0, react_native_reanimated_1.withTiming)(0);
        (0, react_native_worklets_1.runOnJS)(setDragging)(false);
        (0, react_native_worklets_1.runOnJS)(handleChange)(animatedValue.value, animatedValue2.value);
    });
    const thumbAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateX: thumbPosition.value }],
    }));
    const animatedLabelStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(isLabelVisible.value, [0, 1], [0, 1]);
        return { opacity };
    });
    (0, react_1.useEffect)(() => {
        if (!isRange)
            return;
        const currentValue = Array.isArray(propValue) ? propValue[1] : max;
        const snapped = Math.round(currentValue / step) * step;
        const ratio = (snapped - min) / (max - min || 1);
        const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));
        animatedValue2.value = snapped;
        ctx2.value = { startX: pos, startY: 0 };
        thumbPosition2.value = pos;
        setPopupValue2(snapped);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isRange || isDraggingRef.current)
            return;
        const currentValue = Array.isArray(propValue) ? propValue[1] : max;
        const snapped = Math.round(currentValue / step) * step;
        if (snapped === animatedValue2.value)
            return;
        const ratio = (snapped - min) / (max - min || 1);
        const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));
        animatedValue2.value = snapped;
        ctx2.value = { startX: pos, startY: 0 };
        thumbPosition2.value = (0, react_native_reanimated_1.withTiming)(pos, { duration: 160 });
        setPopupValue2(snapped);
    }, [propValue, min, max, sliderWidth, step, isRange]);
    const panGesture2 = react_native_gesture_handler_1.Gesture.Pan()
        .onStart(() => {
        (0, react_native_worklets_1.runOnJS)(setDragging)(true);
        ctx2.value = { startX: thumbPosition2.value, startY: 0 };
        isLabelVisible2.value = (0, react_native_reanimated_1.withTiming)(1);
    })
        .onUpdate((event) => {
        let newPosition = event.translationX + ctx2.value.startX;
        if (newPosition < 0)
            newPosition = 0;
        if (newPosition > sliderWidth)
            newPosition = sliderWidth;
        const minAllowed = thumbPosition.value + stepWidth * 2;
        newPosition = Math.max(minAllowed, newPosition);
        const rawValue = (newPosition / (sliderWidth || 1)) * (max - min) + min;
        const snappedValue = Math.round(rawValue / step) * step;
        const ratio = (snappedValue - min) / (max - min || 1);
        const snappedPosition = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));
        thumbPosition2.value = snappedPosition;
        animatedValue2.value = snappedValue;
        (0, react_native_worklets_1.runOnJS)(setPopupValue2)(snappedValue);
    })
        .onEnd(() => {
        ctx2.value = { startX: thumbPosition2.value, startY: 0 };
        isLabelVisible2.value = (0, react_native_reanimated_1.withTiming)(0);
        (0, react_native_worklets_1.runOnJS)(setDragging)(false);
        (0, react_native_worklets_1.runOnJS)(handleChange)(animatedValue.value, animatedValue2.value);
    });
    const thumbAnimatedStyle2 = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateX: thumbPosition2.value }],
    }));
    const animatedLabelStyle2 = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(isLabelVisible2.value, [0, 1], [0, 1]);
        return { opacity };
    });
    const animatedFrontSliderStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const left = isRange
            ? Math.min(thumbPosition.value, thumbPosition2.value)
            : 0;
        const width = isRange
            ? Math.abs(thumbPosition2.value - thumbPosition.value)
            : thumbPosition.value;
        return { left, width };
    });
    return (<react_native_1.View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <react_native_1.View style={[styles.sliderBack, trackStyle, { width: sliderWidth }]}/>
      <react_native_reanimated_1.default.View style={[
            styles.sliderFront,
            progressStyle,
            { backgroundColor: color },
            animatedFrontSliderStyle,
        ]}/>
      <react_native_gesture_handler_1.GestureDetector gesture={panGesture}>
        <react_native_reanimated_1.default.View hitSlop={{ left: 25, top: 25, bottom: 25, right: isRange ? 15 : 25 }} style={[
            styles.thumb,
            thumbStyle,
            { borderColor: color },
            thumbAnimatedStyle,
        ]}>
          <react_native_reanimated_1.default.View style={[
            styles.labelContainer,
            { backgroundColor: color },
            animatedLabelStyle,
        ]}>
            <react_native_1.Text style={styles.label}>{`${(0, utils_1.formatAmountByCurrency)(popupValue)} ${unit}`}</react_native_1.Text>
            <react_native_reanimated_1.default.View style={[
            styles.effect,
            { backgroundColor: color },
            animatedLabelStyle,
        ]}/>
          </react_native_reanimated_1.default.View>
        </react_native_reanimated_1.default.View>
      </react_native_gesture_handler_1.GestureDetector>
      {isRange && (<react_native_gesture_handler_1.GestureDetector gesture={panGesture2}>
          <react_native_reanimated_1.default.View hitSlop={{ left: 15, top: 25, bottom: 25, right: 25 }} style={[
                styles.thumb,
                thumbStyle,
                { borderColor: color },
                thumbAnimatedStyle2,
            ]}>
            <react_native_reanimated_1.default.View style={[
                styles.labelContainer,
                { backgroundColor: color },
                animatedLabelStyle2,
            ]}>
              <react_native_1.Text style={styles.label}>{`${(0, utils_1.formatAmountByCurrency)(popupValue2)} ${unit}`}</react_native_1.Text>
              <react_native_reanimated_1.default.View style={[
                styles.effect,
                { backgroundColor: color },
                animatedLabelStyle2,
            ]}/>
            </react_native_reanimated_1.default.View>
          </react_native_reanimated_1.default.View>
        </react_native_gesture_handler_1.GestureDetector>)}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    sliderContainer: {
        position: "relative",
        alignSelf: "center",
    },
    sliderFront: {
        borderRadius: 50,
        height: 8,
        position: "absolute",
    },
    sliderBack: {
        backgroundColor: "#ccc",
        borderRadius: 50,
        height: 8,
        position: "absolute",
    },
    thumb: Object.assign({ position: "absolute", width: 20, height: 20, borderWidth: 0, borderColor: "#333", borderRadius: 50, backgroundColor: "#fff", top: -6, left: -15 }, react_native_1.Platform.select({
        ios: {
            shadowOpacity: 0.2,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowColor: "#000",
            shadowRadius: 2,
        },
        android: {
            elevation: 3,
        },
    })),
    labelContainer: {
        position: "absolute",
        maxHeight: 30,
        top: -45,
        bottom: 25,
        alignSelf: "center",
        borderRadius: 5,
    },
    label: {
        width: "100%",
        color: "#fff",
        padding: 5,
        fontWeight: "500",
    },
    effect: {
        width: 10,
        height: 10,
        left: "50%",
        bottom: utils_1.isIos ? 4 : 5,
        transform: [{ translateX: "-50%" }, { rotate: "45deg" }],
    },
});
