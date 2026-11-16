import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";
import type { CarouselRef } from "../../types";
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
declare const Carousel: <T>(props: ICarousel<T> & React.RefAttributes<CarouselRef>) => React.ReactElement;
export default Carousel;
