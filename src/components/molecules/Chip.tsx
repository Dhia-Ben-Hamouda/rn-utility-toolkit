import React, { SetStateAction, useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  Insets,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR = "#333";
const DEFAULT_CHIP_BACKGROUND_COLOR = "#fff";
const DEFAULT_ACTIVE_CHIP_TEXT_COLOR = "#fff";
const DEFAULT_CHIP_TEXT_COLOR = "#333";
const DEFAULT_CHIP_HIT_SLOP = 5;

interface IChip {
  value: string;
  activeValue?: string;
  onChipPress?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  activeChipBackgroundColor?: string;
  chipBackgroundColor?: string;
  activeChipTextColor?: string;
  chipTextColor?: string;
  isReadyOnly?: boolean;
  customHitSlop?: number | Insets | null | undefined;
}

export default function Chip({
  value,
  activeValue = "",
  onChipPress,
  containerStyle,
  labelStyle,
  startIcon,
  endIcon,
  activeChipBackgroundColor = DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR,
  chipBackgroundColor = DEFAULT_CHIP_BACKGROUND_COLOR,
  activeChipTextColor = DEFAULT_ACTIVE_CHIP_TEXT_COLOR,
  chipTextColor = DEFAULT_CHIP_TEXT_COLOR,
  isReadyOnly = false,
  customHitSlop = DEFAULT_CHIP_HIT_SLOP,
}: IChip) {
  const isEqaul = useSharedValue(value === activeValue);
  const derivedIsEqaul = useDerivedValue(() =>
    isEqaul.value ? withTiming(1) : withTiming(0)
  );

  useEffect(() => {
    isEqaul.value = value === activeValue;
  }, [activeValue, isEqaul, value]);

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      derivedIsEqaul.value,
      [0, 1],
      [chipBackgroundColor, activeChipBackgroundColor]
    );

    return {
      backgroundColor,
    };
  });

  const animatedTextColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      derivedIsEqaul.value,
      [0, 1],
      [chipTextColor, activeChipTextColor]
    );

    return {
      color,
    };
  });

  return (
    <TouchableOpacity
      disabled={isReadyOnly}
      hitSlop={customHitSlop}
      onPress={() => {
        onChipPress && onChipPress(value);
      }}
    >
      <Animated.View
        style={[styles.chip, containerStyle, animatedBackgroundColor]}
      >
        {startIcon}
        <Animated.Text style={[styles.text, labelStyle, animatedTextColor]}>
          {value}
        </Animated.Text>
        {endIcon}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    ...Platform.select({
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
    }),
  },
  text: {},
});
