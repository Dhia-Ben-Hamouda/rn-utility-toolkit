import React from "react";
import { ViewStyle } from "react-native";
interface ISkeleton {
    contentStyle?: ViewStyle;
    backgroundColor?: string;
    highlightColor?: string;
    speed?: number;
    direction?: "left" | "right";
    enabled?: boolean;
    angle?: number;
    shimmerWidth?: number;
}
export default function Skeleton({ contentStyle, ...rest }: ISkeleton): React.JSX.Element;
export {};
