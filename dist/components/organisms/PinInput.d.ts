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
interface IPinInputRef {
    focus: () => void;
    blur: () => void;
}
declare const _default: React.ForwardRefExoticComponent<IPinInput & React.RefAttributes<IPinInputRef>>;
export default _default;
