import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IPinInput {
    pinLength?: number;
    value: string;
    onChange?: (newValue: string) => void;
    blinkingSpeed?: number;
    cursorColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    pinStyle?: StyleProp<ViewStyle>;
    activePinStyle?: ViewStyle;
    showCursor?: boolean;
    secureTextEntry?: boolean;
    shouldOnlyAcceptNumbers?: boolean;
}
export default function PinInput({ pinLength, blinkingSpeed, onChange, value, cursorColor, activePinStyle, pinStyle, containerStyle, secureTextEntry, shouldOnlyAcceptNumbers, }: IPinInput): React.JSX.Element;
export {};
