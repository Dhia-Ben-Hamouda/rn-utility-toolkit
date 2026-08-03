import React from "react";
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
interface ICurrencyField extends Omit<TextInputProps, "value" | "onChange"> {
    value: string;
    onChange: (newValue: string) => void;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    isRequired?: boolean;
    startIcon?: React.ReactNode;
    isError?: boolean;
    errorMessage?: string;
    label?: string;
    currency?: string;
    currencyStyle?: StyleProp<TextStyle>;
}
export default function CurrencyField({ value, onChange, containerStyle, inputContainerStyle, labelStyle, isRequired, startIcon, isError, errorMessage, label, currency, currencyStyle, ...rest }: ICurrencyField): React.JSX.Element;
export {};
