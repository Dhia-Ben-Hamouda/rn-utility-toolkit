import React from "react";
import { ListRenderItem, StyleProp, ViewStyle } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
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
export default function Carousel<T>({ data, renderItem, outerContainerStyle, dotsContainerStyle, offset, activeDotColor, dotColor, activeDotWidth, dotWidth, dotStyle, showDots, onChange, ...rest }: ICarousel<T>): React.JSX.Element;
export {};
