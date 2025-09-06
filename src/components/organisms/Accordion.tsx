import React, { PropsWithChildren, useEffect } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const DEFAULT_EXPANSION_DURATION = 400;
const DEFAULT_ARROW_SIZE = 12;
const DEFAULT_ARROW_COLOR = "#fff";
const DEFAULT_ARROW_ROTATION_ANGLE = -180;

function AngleDown({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 448 512">
      <Path
        fill={color}
        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
      />
    </Svg>
  );
}

interface IAccordion {
  title?: string;
  isDefaultExpanded?: boolean;
  expansionDuration?: number;
  arrowColor?: string;
  arrowSize?: number;
  customArrowIcon?: React.ReactNode;
  customArrowRotationAngle?: number;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isArrowShown?: boolean;
  isTitleShown?: boolean;
  onAccordionOpened?: (contentHeight: number) => void;
  onAccordionClosed?: (contentHeight: number) => void;
}

export default function Accordion({
  title = "Title",
  children,
  isDefaultExpanded = true,
  expansionDuration = DEFAULT_EXPANSION_DURATION,
  arrowColor = DEFAULT_ARROW_COLOR,
  arrowSize = DEFAULT_ARROW_SIZE,
  customArrowIcon,
  customArrowRotationAngle = DEFAULT_ARROW_ROTATION_ANGLE,
  isArrowShown = true,
  isTitleShown = true,
  headerStyle,
  containerStyle,
  titleStyle,
  contentContainerStyle,
  onAccordionClosed,
  onAccordionOpened,
}: PropsWithChildren<IAccordion>) {
  const isOpen = useSharedValue(isDefaultExpanded ? 1 : 0);
  const contentHeight = useSharedValue(0);
  const contentRef = useAnimatedRef();

  useEffect(() => {
    runOnUI(() => {
      "worklet";
      const measuredContentHeight = measure(contentRef)?.height;

      if (!isOpen.value) {
        return;
      }

      if (measuredContentHeight) {
        contentHeight.value = withTiming(measuredContentHeight, {
          duration: expansionDuration,
        });
      }
    })();
  }, [contentHeight, contentRef, expansionDuration, isOpen.value]);

  const toggleAccordion = () => {
    if (isOpen.value) {
      contentHeight.value = withTiming(0, {
        duration: expansionDuration,
      });

      runOnUI(() => {
        "worklet";
        const measuredContentHeight = measure(contentRef)?.height;

        onAccordionClosed &&
          runOnJS(onAccordionClosed)(measuredContentHeight ?? 0);
      })();
    } else {
      runOnUI(() => {
        "worklet";
        const measuredContentHeight = measure(contentRef)?.height;

        if (measuredContentHeight) {
          contentHeight.value = withTiming(measuredContentHeight, {
            duration: expansionDuration,
          });
        }

        onAccordionOpened &&
          runOnJS(onAccordionOpened)(measuredContentHeight ?? 0);
      })();
    }

    isOpen.value = withTiming(isOpen.value ? 0 : 1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: contentHeight.value,
    };
  });

  const animatedArrow = useAnimatedStyle(() => {
    const rotation = interpolate(
      isOpen.value,
      [0, 1],
      [0, customArrowRotationAngle],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          rotate: `${rotation}deg`,
        },
      ],
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={toggleAccordion} style={[styles.header, headerStyle]}>
        {isTitleShown && (
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        )}
        {isArrowShown && (
          <Animated.View style={animatedArrow}>
            {customArrowIcon ?? (
              <AngleDown color={arrowColor} size={arrowSize} />
            )}
          </Animated.View>
        )}
      </Pressable>
      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <Animated.View
          ref={contentRef}
          style={[styles.contentWrapper, contentContainerStyle]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    color: "#fff",
  },
  header: {
    backgroundColor: "#555",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    position: "relative",
  },
  contentWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    position: "absolute",
    width: "100%",
    top: 0,
  },
});
