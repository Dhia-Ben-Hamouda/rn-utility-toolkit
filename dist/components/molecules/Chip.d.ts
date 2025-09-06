import React, { SetStateAction } from "react";
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from "react-native";
interface IChip {
    value: string;
    activeValue: string;
    setActiveValue: React.Dispatch<SetStateAction<string>>;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    startPicture?: ImageSourcePropType;
    activeChipBackgroundColor?: string;
    chipBackgroundColor?: string;
    activeChipTextColor?: string;
    chipTextColor?: string;
}
export default function Chip({ value, activeValue, setActiveValue, containerStyle, labelStyle, startPicture, activeChipBackgroundColor, chipBackgroundColor, activeChipTextColor, chipTextColor, }: IChip): React.JSX.Element;
export {};
