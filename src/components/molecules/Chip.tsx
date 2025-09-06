import React, { SetStateAction, useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
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

const DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR = "#555";
const DEFAULT_CHIP_BACKGROUND_COLOR = "#fff";
const DEFAULT_ACTIVE_CHIP_TEXT_COLOR = "#fff";
const DEFAULT_CHIP_TEXT_COLOR = "#555";

interface IChip {
  value: string;
  activeValue: string;
  setActiveValue: React.Dispatch<SetStateAction<string>>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  startPicture?: ImageSourcePropType;
  activeChipBackgroundColor?: string;
  chipBackgroundColor?: string;
  activeChipTextColor?: string;
  chipTextColor?: string;
}

export default function Chip({
  value,
  activeValue,
  setActiveValue,
  containerStyle,
  labelStyle,
  startPicture,
  activeChipBackgroundColor = DEFAULT_ACTIVE_CHIP_BACKGROUND_COLOR,
  chipBackgroundColor = DEFAULT_CHIP_BACKGROUND_COLOR,
  activeChipTextColor = DEFAULT_ACTIVE_CHIP_TEXT_COLOR,
  chipTextColor = DEFAULT_CHIP_TEXT_COLOR,
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
      hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
      onPress={() => {
        setActiveValue(value);
      }}
    >
      <Animated.View
        style={[styles.chip, containerStyle, animatedBackgroundColor]}
      >
        {startPicture && (
          <Image
            resizeMode="contain"
            style={{ width: 16, height: 20 }}
            source={startPicture}
          />
        )}
        <Animated.Text style={[styles.text, labelStyle, animatedTextColor]}>
          {value}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
