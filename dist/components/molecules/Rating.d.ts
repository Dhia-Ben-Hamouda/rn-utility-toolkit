import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IRating {
    containerStyle?: StyleProp<ViewStyle>;
    onChange?: (newValue: number) => void;
    isReadOnly?: boolean;
    starSize?: number;
    activeStarColor?: string;
    inactiveStarColor?: string;
    value: number;
}
export default function Rating({ containerStyle, value, onChange, isReadOnly, starSize, activeStarColor, inactiveStarColor, }: IRating): React.JSX.Element;
export {};
