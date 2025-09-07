import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
interface IPinInput {
    pinLength?: number;
    value: string;
    onChange?: (newValue: string) => void;
    blinkingSpeed?: number;
    cursorColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    pinContainerStyle?: StyleProp<ViewStyle>;
    activePinContainerStyle?: ViewStyle;
    cursorStyle?: StyleProp<ViewStyle>;
    pinTextStyle?: StyleProp<TextStyle>;
    secureDotStyle?: StyleProp<ViewStyle>;
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
