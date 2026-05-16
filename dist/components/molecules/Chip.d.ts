import React from "react";
import { Insets, StyleProp, TextStyle, ViewStyle } from "react-native";
interface IChip {
    value: string;
    activeValue?: string;
    onChipPress?: (value: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    activeChipBackgroundColor?: string;
    chipBackgroundColor?: string;
    activeChipTextColor?: string;
    chipTextColor?: string;
    isReadyOnly?: boolean;
    customHitSlop?: number | Insets | null | undefined;
}
export default function Chip({ value, activeValue, onChipPress, containerStyle, labelStyle, startIcon, endIcon, activeChipBackgroundColor, chipBackgroundColor, activeChipTextColor, chipTextColor, isReadyOnly, customHitSlop, }: IChip): React.JSX.Element;
export {};
