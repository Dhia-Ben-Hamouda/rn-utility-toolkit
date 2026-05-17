import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
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
  FadeIn,
  FadeOut,
  interpolate,
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

function PlusIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 448 512">
      <Path
        fill={color}
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
    </Svg>
  );
}

function MinusIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 448 512">
      <Path
        fill={color}
        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
      />
    </Svg>
  );
}

export interface IAccordion {
  title?: string;
  isDefaultExpanded?: boolean;
  isExpanded?: boolean;
  onToggle?: (nextIsExpanded: boolean) => void;
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
  useOppositeArrowIcons?: boolean;
  openArrowIcon?: React.ReactNode;
  closeArrowIcon?: React.ReactNode;
}

export default function Accordion({
  title = "Title",
  children,
  isDefaultExpanded = true,
  isExpanded: controlledExpanded,
  onToggle,
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
  useOppositeArrowIcons = false,
  closeArrowIcon,
  openArrowIcon,
}: PropsWithChildren<IAccordion>) {
  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(isDefaultExpanded);
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;
  const [measuredContentHeight, setMeasuredContentHeight] = useState(0);

  const isOpen = useSharedValue(isExpanded ? 1 : 0);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    if (isExpanded && measuredContentHeight > 0) {
      contentHeight.value = withTiming(measuredContentHeight, {
        duration: expansionDuration,
      });
      isOpen.value = withTiming(1, { duration: expansionDuration });
    }

    if (!isExpanded) {
      contentHeight.value = withTiming(0, {
        duration: expansionDuration,
      });
      isOpen.value = withTiming(0, { duration: expansionDuration });
    }
  }, [
    contentHeight,
    expansionDuration,
    isExpanded,
    isOpen,
    measuredContentHeight,
  ]);

  const onContentLayout = (event: LayoutChangeEvent) => {
    const nextHeight = event.nativeEvent.layout.height;

    if (nextHeight === measuredContentHeight) {
      return;
    }

    setMeasuredContentHeight(nextHeight);

    if (isExpanded) {
      contentHeight.value = withTiming(nextHeight, {
        duration: expansionDuration,
      });
    }
  };

  const toggleAccordion = () => {
    const nextIsExpanded = !isExpanded;

    if (!isControlled) {
      setInternalExpanded(nextIsExpanded);
    }

    onToggle?.(nextIsExpanded);

    if (nextIsExpanded) {
      onAccordionOpened?.(measuredContentHeight);
    } else {
      onAccordionClosed?.(measuredContentHeight);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: contentHeight.value,
  }));

  const animatedArrow = useAnimatedStyle(() => {
    const rotation = interpolate(
      isOpen.value,
      [0, 1],
      [0, customArrowRotationAngle],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const renderArrowIcon = () => {
    if (useOppositeArrowIcons) {
      return (
        <View style={styles.iconContainer}>
          {isExpanded ? (
            <Animated.View
              key="minus"
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              {closeArrowIcon ?? (
                <MinusIcon color={arrowColor} size={arrowSize} />
              )}
            </Animated.View>
          ) : (
            <Animated.View
              key="plus"
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              {openArrowIcon ?? (
                <PlusIcon color={arrowColor} size={arrowSize} />
              )}
            </Animated.View>
          )}
        </View>
      );
    }

    return (
      <Animated.View style={animatedArrow}>
        {customArrowIcon ?? <AngleDown color={arrowColor} size={arrowSize} />}
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={toggleAccordion} style={[styles.header, headerStyle]}>
        {isTitleShown && (
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        )}
        {isArrowShown && renderArrowIcon()}
      </Pressable>

      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <View
          onLayout={onContentLayout}
          style={[styles.contentWrapper, contentContainerStyle]}
        >
          {children}
        </View>
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
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    position: "relative",
    overflow: "hidden",
  },
  contentWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
