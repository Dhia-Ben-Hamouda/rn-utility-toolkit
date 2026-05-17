import React, { useEffect, useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_SPEED = 2000;
const DEFAULT_BACKGROUND_COLOR = "#e4e4e4";
const DEFAULT_HIGHLIGHT_COLOR = "#bbbbbb";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface ISkeleton {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
  shimmerWidth?: number;
  enabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Skeleton({
  width,
  height,
  borderRadius = 8,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  speed = DEFAULT_SPEED,
  shimmerWidth = 120,
  enabled = true,
  containerStyle,
}: ISkeleton) {
  const progress = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(
    typeof width === "number" ? width : 0
  );

  useEffect(() => {
    if (!enabled || containerWidth <= 0) {
      cancelAnimation(progress);
      progress.value = 0;
      return;
    }

    progress.value = withRepeat(
      withTiming(1, {
        duration: speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [containerWidth, enabled, progress, speed]);

  const onLayout = (event: LayoutChangeEvent) => {
    if (typeof width !== "number") {
      setContainerWidth(event.nativeEvent.layout.width);
    }
  };

  const shimmerBandWidth = shimmerWidth * 2.4;

  const animatedShimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [-shimmerBandWidth, containerWidth]
    );

    return {
      transform: [{ translateX }, { skewX: "-18deg" }],
    };
  });

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        containerStyle,
      ]}
    >
      {enabled && containerWidth > 0 ? (
        <AnimatedGradient
          pointerEvents="none"
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0)",
            highlightColor,
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0)",
          ]}
          locations={[0, 0.3, 0.5, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.shimmer,
            {
              width: shimmerBandWidth,
              height: height * 1.6,
              top: -height * 0.3,
            },
            animatedShimmerStyle,
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    opacity: 0.95,
  },
});
