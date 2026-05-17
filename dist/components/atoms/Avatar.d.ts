import React from "react";
import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
interface IGradientCoordinate {
    x: number;
    y: number;
}
interface IAvatar {
    picture?: ImageSourcePropType;
    name?: string;
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: ImageStyle;
    textStyle?: StyleProp<TextStyle>;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    onPress?: () => void;
    useGradients?: boolean;
    gradientColors?: string[];
    gradientStart?: IGradientCoordinate;
    gradientEnd?: IGradientCoordinate;
}
export default function Avatar({ picture, name, size, containerStyle, imageStyle, textStyle, backgroundColor, textColor, borderRadius, onPress, useGradients, gradientColors, gradientStart, gradientEnd, }: IAvatar): React.JSX.Element;
export {};
