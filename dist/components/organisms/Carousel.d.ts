import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";
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
export default function Carousel<T>({ data, renderItem: customRenderItem, containerStyle, dotsContainerStyle, activeDotColor, dotColor, activeDotWidth, dotWidth, dotStyle, showDots, onChange, dotOffsetMultiplier, }: ICarousel<T>): React.JSX.Element;
export {};
