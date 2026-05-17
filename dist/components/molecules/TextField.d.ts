import React from "react";
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
interface ITextField extends Omit<TextInputProps, "value" | "onChange"> {
    value: string;
    onChange: (newValue: string) => void;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    isRequired?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isError?: boolean;
    errorMessage?: string;
    isPasswordField?: boolean;
    label?: string;
    showPasswordIcon?: React.ReactNode;
    hidePasswordIcon?: React.ReactNode;
}
export default function TextField({ value, onChange, containerStyle, inputContainerStyle, labelStyle, isRequired, startIcon, endIcon, isError, errorMessage, isPasswordField, label, showPasswordIcon, hidePasswordIcon, ...rest }: ITextField): React.JSX.Element;
export {};
