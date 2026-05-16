import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IGradientCoordinate {
    x: number;
    y: number;
}
interface IProgressBar {
    progress: number;
    containerStyle?: StyleProp<ViewStyle>;
    barStyle?: StyleProp<ViewStyle>;
    useGradients?: boolean;
    gradientColors?: Array<string>;
    gradientStart?: IGradientCoordinate;
    gradientEnd?: IGradientCoordinate;
}
export default function ProgressBar({ progress, barStyle, containerStyle, gradientColors, useGradients, gradientStart, gradientEnd, }: IProgressBar): React.JSX.Element;
export {};
