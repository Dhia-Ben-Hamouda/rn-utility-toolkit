import React, { useEffect } from "react";
import {
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
const DEFAULT_ACTIVE_ICON_COLOR = "#fff";
const DEFAULT_ICON_COLOR = "#333";

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
  activeIconColor?: string;
  iconColor?: string;
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
  activeIconColor = DEFAULT_ACTIVE_ICON_COLOR,
  iconColor = DEFAULT_ICON_COLOR,
  isReadyOnly = false,
  customHitSlop = { bottom: 5, top: 5, left: 5, right: 5 },
}: IChip) {
  const isEqual = useSharedValue(value === activeValue);
  const derivedIsEqual = useDerivedValue(() =>
    isEqual.value ? withTiming(1) : withTiming(0)
  );

  const isActive = value === activeValue;

  useEffect(() => {
    isEqual.value = value === activeValue;
  }, [activeValue, isEqual, value]);

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      derivedIsEqual.value,
      [0, 1],
      [chipBackgroundColor, activeChipBackgroundColor]
    );

    return {
      backgroundColor,
    };
  });

  const animatedTextColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      derivedIsEqual.value,
      [0, 1],
      [chipTextColor, activeChipTextColor]
    );

    return {
      color,
    };
  });

  const resolvedIconColor = isActive ? activeIconColor : iconColor;

  const renderIcon = (icon?: React.ReactNode) => {
    if (!React.isValidElement(icon)) {
      return icon;
    }

    return React.cloneElement(icon as React.ReactElement<any>, {
      fill: resolvedIconColor,
      stroke: resolvedIconColor,
      color: resolvedIconColor,
    });
  };

  return (
    <TouchableOpacity
      disabled={isReadyOnly}
      hitSlop={customHitSlop}
      onPress={() => {
        onChipPress?.(value);
      }}
    >
      <Animated.View
        style={[styles.chip, containerStyle, animatedBackgroundColor]}
      >
        {renderIcon(startIcon)}
        <Animated.Text style={[styles.text, labelStyle, animatedTextColor]}>
          {value}
        </Animated.Text>
        {renderIcon(endIcon)}
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
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
  },
  text: {},
});
