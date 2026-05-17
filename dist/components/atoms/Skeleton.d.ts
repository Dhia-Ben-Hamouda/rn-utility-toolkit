import React from "react";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";
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
export default function Skeleton({ width, height, borderRadius, backgroundColor, highlightColor, speed, shimmerWidth, enabled, containerStyle, }: ISkeleton): React.JSX.Element;
export {};
