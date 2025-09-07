import React, { useImperativeHandle } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_PIN_LENGTH = 6;
const DEFAULT_BLINKING_SPEED = 500;
const DEFAULT_CURSOR_COLOR = "#555";
const DEFAULT_FOCUSED_PIN_BORDER_COLOR = "#555";

interface IPinInput {
  pinLength?: number;
  value: string;
  onChange?: (newValue: string) => void;
  blinkingSpeed?: number;
  cursorColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  pinContainerStyle?: StyleProp<ViewStyle>;
  activePinContainerStyle?: ViewStyle;
  cursorStyle?: StyleProp<ViewStyle>;
  pinTextStyle?: StyleProp<TextStyle>;
  secureDotStyle?: StyleProp<ViewStyle>;
  showCursor?: boolean;
  secureTextEntry?: boolean;
  shouldOnlyAcceptNumbers?: boolean;
}

interface IPinInputRef {
  focus: () => void;
  blur: () => void;
}

export default React.forwardRef<IPinInputRef, IPinInput>(
  (
    {
      pinLength = DEFAULT_PIN_LENGTH,
      blinkingSpeed = DEFAULT_BLINKING_SPEED,
      onChange,
      value,
      cursorColor,
      activePinContainerStyle,
      pinContainerStyle,
      cursorStyle,
      pinTextStyle,
      secureDotStyle,
      containerStyle,
      secureTextEntry = false,
      shouldOnlyAcceptNumbers = true,
      showCursor = true,
    },
    ref
  ) => {
    const textInputRef = useRef<TextInput>(null);
    const isCursorBlinking = useSharedValue(0);
    const [isFocused, setIsFocused] = useState(false);

    useImperativeHandle(ref, () => ({
      blur: () => {
        textInputRef?.current?.blur();
      },
      focus: () => {
        textInputRef?.current?.focus();
      },
    }));

    useEffect(() => {
      const interval = setInterval(() => {
        isCursorBlinking.value = withTiming(isCursorBlinking.value ? 0 : 1);
      }, blinkingSpeed);

      return () => {
        clearInterval(interval);
      };
    }, [isCursorBlinking, blinkingSpeed]);

    const animatedCursorStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        isCursorBlinking.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      );

      return {
        height: 16,
        width: 2,
        backgroundColor: cursorColor ?? DEFAULT_CURSOR_COLOR,
        opacity,
      };
    });

    return (
      <Pressable
        onPress={() => {
          textInputRef.current?.focus();
        }}
      >
        <TextInput
          autoFocus={false}
          keyboardType="number-pad"
          maxLength={pinLength}
          value={value}
          style={[styles.input]}
          ref={textInputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(newValue) => {
            if (newValue?.length > pinLength) {
              return;
            }

            if (shouldOnlyAcceptNumbers && !/^[0-9]{0,}$/.test(newValue)) {
              return;
            }
            onChange && onChange(newValue);
          }}
        />
        <View style={[styles.container, containerStyle]}>
          {Array.from({ length: pinLength })?.map((_, index) => {
            const isActivePin = index === value?.length;

            return (
              <View
                key={index}
                style={[
                  styles.pinItem,
                  pinContainerStyle,
                  isActivePin &&
                    isFocused && {
                      borderColor: DEFAULT_FOCUSED_PIN_BORDER_COLOR,
                      borderWidth: 2,
                      ...activePinContainerStyle,
                    },
                ]}
              >
                {value[index] ? (
                  secureTextEntry ? (
                    <View style={[styles.dot, secureDotStyle]} />
                  ) : (
                    <Text style={[styles.pinText, pinTextStyle]}>
                      {value[index]}
                    </Text>
                  )
                ) : isActivePin && showCursor && isFocused ? (
                  <Animated.View style={[animatedCursorStyle, cursorStyle]} />
                ) : null}
              </View>
            );
          })}
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
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
