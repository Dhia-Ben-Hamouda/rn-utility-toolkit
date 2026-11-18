import React, { ForwardedRef, useImperativeHandle, useRef } from "react";
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
import type { CarouselRef } from "../../types";

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
  dotsOnTop?: boolean;
}

function CarouselComponent<T>(
  {
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
    dotsOnTop = false,
  }: ICarousel<T>,
  ref: ForwardedRef<CarouselRef>
) {
  const offset = useSharedValue(0);
  const listRef = useRef<Animated.FlatList<T>>(null);

  useImperativeHandle(
    ref,
    () => ({
      goToNextSlide: (index: number) => {
        listRef.current?.scrollToIndex({ index, animated: true });
      },
      goToPreviousSlide: (index: number) => {
        listRef.current?.scrollToIndex({ index, animated: true });
      },
      skipSlides: () => {
        listRef.current?.scrollToEnd({ animated: true });
      },
    }),
    [data.length, dotOffsetMultiplier, offset]
  );

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
    if (
      viewableItems[0]?.index !== null &&
      viewableItems[0]?.index !== undefined
    ) {
      onChange && onChange(viewableItems[0]?.index);
    }
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (offset) {
        offset.value = event.contentOffset.x;
      }
    },
  });

  return (
    <View
      style={[
        styles.wrapper,
        containerStyle,
        dotsOnTop && { flexDirection: "column-reverse" },
      ]}
    >
      <Animated.FlatList
        ref={listRef}
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

const Carousel = React.forwardRef(CarouselComponent) as <T>(
  props: ICarousel<T> & React.RefAttributes<CarouselRef>
) => React.ReactElement;

export default Carousel;

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
