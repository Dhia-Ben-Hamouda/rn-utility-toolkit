import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { formatAmountByCurrency, isIos } from "../../utils";

const DEFAULT_UNIT = "TND";
const DEFAULT_COLOR = "#333";

interface ISliderBase {
  thumbStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  progressStyle?: StyleProp<ViewStyle>;
  color?: string;
  sliderWidth?: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

interface ISingleSlider extends ISliderBase {
  isRange?: false;
  value: number;
  onChange: (newValue: number) => void;
}

interface IRangeSlider extends ISliderBase {
  isRange: true;
  value: number[];
  onChange: (newValue: number[]) => void;
}

type ISlider = ISingleSlider | IRangeSlider;

export default function Slider({
  value: propValue,
  onChange,
  thumbStyle,
  progressStyle,
  color = DEFAULT_COLOR,
  trackStyle,
  unit = DEFAULT_UNIT,
  max = 50000,
  min = 0,
  sliderWidth = 300,
  step = 1,
  isRange = false,
}: ISlider) {
  const normalizedValue = Array.isArray(propValue)
    ? propValue
    : [propValue, max];
  const value = normalizedValue;
  const thumbPosition = useSharedValue(0);
  const thumbPosition2 = useSharedValue(0);
  const animatedValue = useSharedValue(value[0]);
  const animatedValue2 = useSharedValue(value[1]);
  const ctx = useSharedValue({ startX: 0, startY: 0 });
  const ctx2 = useSharedValue({ startX: 0, startY: 0 });
  const isLabelVisible = useSharedValue(0);
  const isLabelVisible2 = useSharedValue(0);
  const [popupValue, setPopupValue] = useState(value[0]);
  const [popupValue2, setPopupValue2] = useState(value[1]);

  const isDraggingRef = useRef(false);
  const setDragging = (v: boolean) => {
    isDraggingRef.current = v;
  };

  const stepWidth = (step / (max - min)) * sliderWidth;

  useEffect(() => {
    const currentValue = Array.isArray(propValue) ? propValue[0] : propValue;
    const snapped = Math.round(currentValue / step) * step;
    const ratio = (snapped - min) / (max - min || 1);
    const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));

    animatedValue.value = snapped;
    ctx.value = { startX: pos, startY: 0 };
    thumbPosition.value = pos;
    setPopupValue(snapped);
  }, []);

  useEffect(() => {
    if (isDraggingRef.current) return;

    const currentValue = Array.isArray(propValue) ? propValue[0] : propValue;
    const snapped = Math.round(currentValue / step) * step;
    if (snapped === animatedValue.value) return;

    const ratio = (snapped - min) / (max - min || 1);
    const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));

    animatedValue.value = snapped;
    ctx.value = { startX: pos, startY: 0 };
    thumbPosition.value = withTiming(pos, { duration: 160 });
    setPopupValue(snapped);
  }, [propValue, min, max, sliderWidth, step]);

  const handleChange = (val1: number, val2: number) => {
    if (isRange) {
      (onChange as (newValue: number[]) => void)([val1, val2]);
    } else {
      (onChange as (newValue: number) => void)(val1);
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(setDragging)(true);
      ctx.value = { startX: thumbPosition.value, startY: 0 };
      isLabelVisible.value = withTiming(1);
    })
    .onUpdate((event) => {
      let newPosition = event.translationX + ctx.value.startX;
      if (newPosition < 0) newPosition = 0;
      if (newPosition > sliderWidth) newPosition = sliderWidth;

      if (isRange) {
        const maxAllowed = thumbPosition2.value - stepWidth * 2;
        newPosition = Math.min(maxAllowed, newPosition);
      }

      const rawValue = (newPosition / (sliderWidth || 1)) * (max - min) + min;
      const snappedValue = Math.round(rawValue / step) * step;

      const ratio = (snappedValue - min) / (max - min || 1);
      const snappedPosition = Math.min(
        sliderWidth,
        Math.max(0, ratio * sliderWidth)
      );

      thumbPosition.value = snappedPosition;
      animatedValue.value = snappedValue;

      runOnJS(setPopupValue)(snappedValue);
    })
    .onEnd(() => {
      ctx.value = { startX: thumbPosition.value, startY: 0 };
      isLabelVisible.value = withTiming(0);

      runOnJS(setDragging)(false);
      runOnJS(handleChange)(animatedValue.value, animatedValue2.value);
    });

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbPosition.value }],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => {
    const opacity = interpolate(isLabelVisible.value, [0, 1], [0, 1]);
    return { opacity };
  });

  useEffect(() => {
    if (!isRange) return;

    const currentValue = Array.isArray(propValue) ? propValue[1] : max;
    const snapped = Math.round(currentValue / step) * step;
    const ratio = (snapped - min) / (max - min || 1);
    const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));

    animatedValue2.value = snapped;
    ctx2.value = { startX: pos, startY: 0 };
    thumbPosition2.value = pos;
    setPopupValue2(snapped);
  }, []);

  useEffect(() => {
    if (!isRange || isDraggingRef.current) return;

    const currentValue = Array.isArray(propValue) ? propValue[1] : max;
    const snapped = Math.round(currentValue / step) * step;
    if (snapped === animatedValue2.value) return;

    const ratio = (snapped - min) / (max - min || 1);
    const pos = Math.min(sliderWidth, Math.max(0, ratio * sliderWidth));

    animatedValue2.value = snapped;
    ctx2.value = { startX: pos, startY: 0 };
    thumbPosition2.value = withTiming(pos, { duration: 160 });
    setPopupValue2(snapped);
  }, [propValue, min, max, sliderWidth, step, isRange]);

  const panGesture2 = Gesture.Pan()
    .onStart(() => {
      runOnJS(setDragging)(true);
      ctx2.value = { startX: thumbPosition2.value, startY: 0 };
      isLabelVisible2.value = withTiming(1);
    })
    .onUpdate((event) => {
      let newPosition = event.translationX + ctx2.value.startX;
      if (newPosition < 0) newPosition = 0;
      if (newPosition > sliderWidth) newPosition = sliderWidth;

      const minAllowed = thumbPosition.value + stepWidth * 2;
      newPosition = Math.max(minAllowed, newPosition);

      const rawValue = (newPosition / (sliderWidth || 1)) * (max - min) + min;
      const snappedValue = Math.round(rawValue / step) * step;

      const ratio = (snappedValue - min) / (max - min || 1);
      const snappedPosition = Math.min(
        sliderWidth,
        Math.max(0, ratio * sliderWidth)
      );

      thumbPosition2.value = snappedPosition;
      animatedValue2.value = snappedValue;

      runOnJS(setPopupValue2)(snappedValue);
    })
    .onEnd(() => {
      ctx2.value = { startX: thumbPosition2.value, startY: 0 };
      isLabelVisible2.value = withTiming(0);

      runOnJS(setDragging)(false);
      runOnJS(handleChange)(animatedValue.value, animatedValue2.value);
    });

  const thumbAnimatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbPosition2.value }],
  }));

  const animatedLabelStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(isLabelVisible2.value, [0, 1], [0, 1]);
    return { opacity };
  });

  const animatedFrontSliderStyle = useAnimatedStyle(() => {
    const left = isRange
      ? Math.min(thumbPosition.value, thumbPosition2.value)
      : 0;
    const width = isRange
      ? Math.abs(thumbPosition2.value - thumbPosition.value)
      : thumbPosition.value;
    return { left, width };
  });

  return (
    <View style={[styles.sliderContainer, { width: sliderWidth }]}>
      <View style={[styles.sliderBack, trackStyle, { width: sliderWidth }]} />
      <Animated.View
        style={[
          styles.sliderFront,
          progressStyle,
          { backgroundColor: color },
          animatedFrontSliderStyle,
        ]}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          hitSlop={{ left: 25, top: 25, bottom: 25, right: isRange ? 15 : 25 }}
          style={[
            styles.thumb,
            thumbStyle,
            { borderColor: color },
            thumbAnimatedStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.labelContainer,
              { backgroundColor: color },
              animatedLabelStyle,
            ]}
          >
            <Text style={styles.label}>{`${formatAmountByCurrency(
              popupValue
            )} ${unit}`}</Text>
            <Animated.View
              style={[
                styles.effect,
                { backgroundColor: color },
                animatedLabelStyle,
              ]}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
      {isRange && (
        <GestureDetector gesture={panGesture2}>
          <Animated.View
            hitSlop={{ left: 15, top: 25, bottom: 25, right: 25 }}
            style={[
              styles.thumb,
              thumbStyle,
              { borderColor: color },
              thumbAnimatedStyle2,
            ]}
          >
            <Animated.View
              style={[
                styles.labelContainer,
                { backgroundColor: color },
                animatedLabelStyle2,
              ]}
            >
              <Text style={styles.label}>{`${formatAmountByCurrency(
                popupValue2
              )} ${unit}`}</Text>
              <Animated.View
                style={[
                  styles.effect,
                  { backgroundColor: color },
                  animatedLabelStyle2,
                ]}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderWidth: 0,
    borderColor: "#333",
    borderRadius: 50,
    backgroundColor: "#fff",
    top: -6,
    left: -15,
    ...Platform.select({
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
    }),
  },
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
    bottom: isIos ? 4 : 5,
    transform: [{ translateX: "-50%" }, { rotate: "45deg" }],
  },
});
