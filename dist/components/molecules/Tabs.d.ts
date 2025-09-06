import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { WithTimingConfig } from "react-native-reanimated";
export interface ITabOption {
    label: string;
    value: string;
}
export interface IGradientCoordinate {
    x: number;
    y: number;
}
interface ITabs {
    options: Array<ITabOption>;
    selectedValue: ITabOption;
    onChange?: (newValue: ITabOption) => void;
    innerPadding?: number;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    indicatorStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    activeTabLabelColor?: string;
    tabLabelColor?: string;
    useGradients?: boolean;
    gradientColors?: Array<string>;
    gradientStart?: IGradientCoordinate;
    gradientEnd?: IGradientCoordinate;
    animationConfig?: WithTimingConfig;
}
export default function Tabs({ options, selectedValue, onChange, innerPadding, containerStyle, labelStyle, activeTabLabelColor, tabLabelColor, indicatorStyle, tabStyle, gradientColors, useGradients, gradientStart, gradientEnd, animationConfig, }: ITabs): React.JSX.Element;
export {};
