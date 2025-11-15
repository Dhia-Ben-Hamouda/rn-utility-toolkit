import React, { useEffect } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { ClipPath, Defs, Path, Rect } from "react-native-svg";

const DEFAULT_STAR_SIZE = 36;
const DEFAULT_ACTIVE_STAR_COLOR = "#333333";
const DEFAULT_INACTIVE_STAR_COLOR = "#d8d8d8";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IStar {
  onChange?: (newValue: number) => void;
  isReadOnly: boolean;
  activeValue: number;
  starSize: number;
  value: number;
  activeStarColor: string;
  inactiveStarColor: string;
}

function Star({
  onChange,
  value,
  activeValue,
  isReadOnly,
  starSize,
  activeStarColor,
  inactiveStarColor,
}: IStar) {
  const isStarActive = useSharedValue(0);

  useEffect(() => {
    if (isReadOnly) return;
    isStarActive.value = withTiming(value <= activeValue ? 1 : 0);
  }, [value, activeValue, isReadOnly]);

  const animatedProps = useAnimatedProps(() => {
    const fill = interpolateColor(
      isStarActive.value,
      [0, 1],
      [inactiveStarColor, activeStarColor]
    );

    return { fill };
  });

  const fillPercentage = Math.min(Math.max(activeValue - (value - 1), 0), 1);
  const fillWidth = fillPercentage * 640;

  return (
    <Pressable
      disabled={isReadOnly}
      onPress={() => {
        if (!isReadOnly) onChange && onChange(value);
      }}
    >
      <Svg width={starSize} height={starSize} viewBox="0 0 640 640">
        {isReadOnly ? (
          <>
            <Path
              d="M341.5 45.1c-4.1-8-12.4-13.1-21.4-13.1-9 0-17.3 5.1-21.4 13.1l-73.6 144.2-159.9 25.4c-8.9 1.4-16.3 7.7-19.1 16.3-2.8 8.6-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2 7.3 5.3 16.9 6.1 25 2l144.4-73.4L464.4 555c8 4.1 17.7 3.3 25-2 7.3-5.3 11-14.2 9.6-23.2l-25.3-159.9 114.4-114.5c6.4-6.4 8.6-15.8 5.8-24.4-2.8-8.6-10.1-14.9-19.1-16.3L415 189.3 341.5 45.1z"
              fill={inactiveStarColor}
            />
            <Defs>
              <ClipPath id={`clip-${value}`}>
                <Rect x="0" y="0" width={fillWidth} height="640" />
              </ClipPath>
            </Defs>
            <Path
              d="M341.5 45.1c-4.1-8-12.4-13.1-21.4-13.1-9 0-17.3 5.1-21.4 13.1l-73.6 144.2-159.9 25.4c-8.9 1.4-16.3 7.7-19.1 16.3-2.8 8.6-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2 7.3 5.3 16.9 6.1 25 2l144.4-73.4L464.4 555c8 4.1 17.7 3.3 25-2 7.3-5.3 11-14.2 9.6-23.2l-25.3-159.9 114.4-114.5c6.4-6.4 8.6-15.8 5.8-24.4-2.8-8.6-10.1-14.9-19.1-16.3L415 189.3 341.5 45.1z"
              fill={activeStarColor}
              clipPath={`url(#clip-${value})`}
            />
          </>
        ) : (
          <AnimatedPath
            animatedProps={animatedProps}
            d="M341.5 45.1c-4.1-8-12.4-13.1-21.4-13.1-9 0-17.3 5.1-21.4 13.1l-73.6 144.2-159.9 25.4c-8.9 1.4-16.3 7.7-19.1 16.3-2.8 8.6-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2 7.3 5.3 16.9 6.1 25 2l144.4-73.4L464.4 555c8 4.1 17.7 3.3 25-2 7.3-5.3 11-14.2 9.6-23.2l-25.3-159.9 114.4-114.5c6.4-6.4 8.6-15.8 5.8-24.4-2.8-8.6-10.1-14.9-19.1-16.3L415 189.3 341.5 45.1z"
          />
        )}
      </Svg>
    </Pressable>
  );
}

interface IRating {
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (newValue: number) => void;
  isReadOnly?: boolean;
  starSize?: number;
  activeStarColor?: string;
  inactiveStarColor?: string;
  value: number;
}

export default function Rating({
  containerStyle,
  value,
  onChange,
  isReadOnly = false,
  starSize = DEFAULT_STAR_SIZE,
  activeStarColor = DEFAULT_ACTIVE_STAR_COLOR,
  inactiveStarColor = DEFAULT_INACTIVE_STAR_COLOR,
}: IRating) {
  return (
    <View
      key={isReadOnly ? value : undefined}
      style={[styles.container, containerStyle]}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          value={index + 1}
          onChange={onChange}
          activeValue={value}
          isReadOnly={isReadOnly}
          starSize={starSize}
          inactiveStarColor={inactiveStarColor}
          activeStarColor={activeStarColor}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
  },
});
