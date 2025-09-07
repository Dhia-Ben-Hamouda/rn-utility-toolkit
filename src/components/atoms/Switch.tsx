import { useEffect } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_ACTIVE_COLOR = "#555";
const DEFAULT_INACTIVE_COLOR = "#ccc";

interface ISwitch {
  thumbStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (newValue: boolean) => void;
  customThumbTranslation?: number;
  value: boolean;
  activeSwitchColor?: string;
  inactiveSwitchColor?: string;
}

export default function Switch({
  onChange,
  value,
  containerStyle,
  thumbStyle,
  customThumbTranslation,
  activeSwitchColor = DEFAULT_ACTIVE_COLOR,
  inactiveSwitchColor = DEFAULT_INACTIVE_COLOR,
}: ISwitch) {
  const isToggled = useSharedValue(0);

  useEffect(() => {
    isToggled.value = withTiming(value ? 1 : 0);
  }, [value, isToggled]);

  const handleThumbPress = () => {
    onChange && onChange(!value);
  };

  const animatedThumbStyle = useAnimatedStyle(() => {
    const translationX = interpolate(
      isToggled.value,
      [0, 1],
      [0, customThumbTranslation ?? 22]
    );

    return {
      transform: [
        {
          translateX: translationX,
        },
      ],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isToggled.value,
      [0, 1],
      [inactiveSwitchColor, activeSwitchColor]
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Pressable style={{ alignSelf: "flex-start" }} onPress={handleThumbPress}>
      <Animated.View
        hitSlop={25}
        style={[styles.container, containerStyle, animatedContainerStyle]}
      >
        <Animated.View style={[styles.thumb, thumbStyle, animatedThumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#555",
    padding: 4,
    borderRadius: 50,
    width: 46,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowColor: "#000",
        shadowOpacity: 0.15,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thumb: {
    width: 16,
    height: 16,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
});
