import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IGradientCoordinate {
    x: number;
    y: number;
}
interface IIconButton {
    icon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    isOutlined?: boolean;
    customHitSlop?: number;
    color?: string;
    useGradients?: boolean;
    gradientColors?: Array<string>;
    gradientStart?: IGradientCoordinate;
    gradientEnd?: IGradientCoordinate;
    isDisabled?: boolean;
}
export default function IconButton({ icon, onPress, containerStyle, customHitSlop, isOutlined, color, gradientColors, useGradients, gradientStart, gradientEnd, isDisabled, }: IIconButton): React.JSX.Element;
export {};
