import React, { useRef } from "react";
import {
  ListRenderItem,
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
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../../utils";

const DEFAULT_ACTIVE_DOT_COLOR = "#000";
const DEFAULT_DOT_COLOR = "#ccc";
const DEFAULT_ACTIVE_DOT_WIDTH = 24;
const DEFAULT_DOT_WIDTH = 10;

interface IAnimatedDot {
  index: number;
  offset: SharedValue<number>;
  activeDotColor: string;
  dotColor: string;
  activeDotWidth: number;
  dotWidth: number;
  dotStyle?: StyleProp<ViewStyle>;
  dotHeight?: number;
}

function AnimatedDot({
  index,
  offset,
  activeDotColor,
  dotColor,
  activeDotWidth,
  dotStyle,
  dotWidth,
}: IAnimatedDot) {
  const animatedDotStyle = useAnimatedStyle(() => {
    if (!offset) {
      return {};
    }

    const width = interpolate(
      offset.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [dotWidth, activeDotWidth, dotWidth],
      Extrapolation.CLAMP
    );

    const backgroundColor = interpolateColor(
      offset.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
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
interface ICarousel<T> extends Partial<Animated.FlatList<T>> {
  data: Array<T>;
  renderItem: ListRenderItem<T>;
  offset?: SharedValue<number>;
  outerContainerStyle?: StyleProp<ViewStyle>;
  dotsContainerStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  dotColor?: string;
  activeDotWidth?: number;
  dotStyle?: StyleProp<ViewStyle>;
  dotWidth?: number;
  showDots?: boolean;
  onChange?: (newIndex: number) => void;
}

export default function Carousel<T>({
  data = [],
  renderItem,
  outerContainerStyle,
  dotsContainerStyle,
  offset,
  activeDotColor = DEFAULT_ACTIVE_DOT_COLOR,
  dotColor = DEFAULT_DOT_COLOR,
  activeDotWidth = DEFAULT_ACTIVE_DOT_WIDTH,
  dotWidth = DEFAULT_DOT_WIDTH,
  dotStyle,
  showDots = true,
  onChange,
  ...rest
}: ICarousel<T>) {
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
    <View style={[outerContainerStyle]}>
      <Animated.FlatList
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={data}
        renderItem={renderItem}
        viewabilityConfigCallbackPairs={
          viewabilitConfigCallbackPairsRef.current
        }
        {...rest}
      />
      {showDots && offset && (
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
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    justifyContent: "center",
    marginHorizontal: 16,
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#555",
    borderRadius: 50,
  },
});
