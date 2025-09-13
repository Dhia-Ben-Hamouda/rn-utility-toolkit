import React, { useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewabilityConfigCallbackPairs,
  ViewStyle,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../../utils";

const DEFAULT_ACTIVE_DOT_COLOR = "#000";
const DEFAULT_DOT_COLOR = "#ccc";
const DEFAULT_ACTIVE_DOT_WIDTH = 24;
const DEFAULT_DOT_WIDTH = 8;

interface IAnimatedDot {
  index: number;
  offset: SharedValue<number>;
  activeDotColor: string;
  dotColor: string;
  activeDotWidth: number;
  dotWidth: number;
  dotStyle?: StyleProp<ViewStyle>;
  dotHeight?: number;
  dotOffsetMultiplier: number;
}

function AnimatedDot({
  index,
  offset,
  activeDotColor,
  dotColor,
  activeDotWidth,
  dotStyle,
  dotWidth,
  dotOffsetMultiplier,
}: IAnimatedDot) {
  const animatedDotStyle = useAnimatedStyle(() => {
    if (!offset) {
      return {};
    }

    const width = interpolate(
      offset.value,
      [
        (index - 1) * dotOffsetMultiplier,
        index * dotOffsetMultiplier,
        (index + 1) * dotOffsetMultiplier,
      ],
      [dotWidth, activeDotWidth, dotWidth],
      Extrapolation.CLAMP
    );

    const backgroundColor = interpolateColor(
      offset.value,
      [
        (index - 1) * dotOffsetMultiplier,
        index * dotOffsetMultiplier,
        (index + 1) * dotOffsetMultiplier,
      ],
      [dotColor, activeDotColor, dotColor]
    );

    return {
      width,
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.dot, dotStyle, animatedDotStyle]} />;
}
interface ICarousel<T> {
  data: Array<T>;
  renderItem: (payload: {
    item: T;
    index: number;
    offset: SharedValue<number>;
  }) => React.ReactElement | null;
  containerStyle?: StyleProp<ViewStyle>;
  dotsContainerStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  dotColor?: string;
  activeDotWidth?: number;
  dotStyle?: StyleProp<ViewStyle>;
  dotWidth?: number;
  showDots?: boolean;
  onChange?: (newIndex: number) => void;
  dotOffsetMultiplier?: number;
}

export default function Carousel<T>({
  data = [],
  renderItem: customRenderItem,
  containerStyle,
  dotsContainerStyle,
  activeDotColor = DEFAULT_ACTIVE_DOT_COLOR,
  dotColor = DEFAULT_DOT_COLOR,
  activeDotWidth = DEFAULT_ACTIVE_DOT_WIDTH,
  dotWidth = DEFAULT_DOT_WIDTH,
  dotStyle,
  showDots = true,
  onChange,
  dotOffsetMultiplier = SCREEN_WIDTH,
}: ICarousel<T>) {
  const offset = useSharedValue(0);

  const viewabilitConfigCallbackPairsRef =
    useRef<ViewabilityConfigCallbackPairs>([
      {
        onViewableItemsChanged,
        viewabilityConfig: {
          itemVisiblePercentThreshold: 100,
        },
      },
    ]);

  function onViewableItemsChanged({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) {
    onChange && onChange(viewableItems[0]?.index ?? 0);
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (offset) {
        offset.value = event.contentOffset.x;
      }
    },
  });

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Animated.FlatList
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        horizontal
        data={data}
        renderItem={({ item, index }) => {
          return customRenderItem({
            item,
            index,
            offset,
          });
        }}
        viewabilityConfigCallbackPairs={
          viewabilitConfigCallbackPairsRef.current
        }
      />
      {showDots && (
        <View style={[styles.dotsContainer, dotsContainerStyle]}>
          {data?.map((_, index) => (
            <AnimatedDot
              key={index}
              dotColor={dotColor}
              activeDotColor={activeDotColor}
              index={index}
              offset={offset}
              activeDotWidth={activeDotWidth}
              dotStyle={dotStyle}
              dotWidth={dotWidth}
              dotOffsetMultiplier={dotOffsetMultiplier}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  dotsContainer: {
    justifyContent: "center",
    marginHorizontal: 16,
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#555",
    borderRadius: 50,
  },
});
