import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  measure,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
} from "react-native-reanimated";

interface IExpandable extends PropsWithChildren {
  isOpen: SharedValue<number>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function Expandable({
  isOpen,
  children,
  contentContainerStyle,
}: IExpandable) {
  const contentRef = useAnimatedRef();

  const animatedContainerStyle = useAnimatedStyle(() => {
    const measuredContentHeight = measure(contentRef)?.height ?? 0;

    const height = interpolate(
      isOpen.value,
      [0, 1],
      [0, measuredContentHeight],
    );

    return {
      height,
      overflow: "hidden",
    };
  });

  return (
    <Animated.View style={[animatedContainerStyle]}>
      <Animated.View
        style={[styles.contentContainer, contentContainerStyle]}
        ref={contentRef}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    position: "absolute",
    top: 0,
  },
});
