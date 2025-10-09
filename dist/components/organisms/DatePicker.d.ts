import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ButtonProps } from "../../types";
type DateMode = "single" | "range";
type DateValue = Date | null;
export type DateRangeValue = [Date | null, Date | null];
export interface IDatePickerRef {
    open: () => void;
    close: () => void;
}
interface IDatePickerBase {
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    isRequired?: boolean;
    isError?: boolean;
    errorMessage?: string;
    errorMessageStyle?: StyleProp<TextStyle>;
    label?: string;
    placeholder?: string;
    isArrowShown?: boolean;
    placeholderStyle?: StyleProp<TextStyle>;
    arrowColor?: string;
    arrowSize?: number;
    arrowContainerStyle?: StyleProp<ViewStyle>;
    customArrowIcon?: React.ReactNode;
    onDatePickerOpened?: () => void;
    onDatePickerClosed?: () => void;
    customArrowRotation?: number;
    bottomSheetModalProps?: Partial<BottomSheetModalProps>;
    cancelButtonProps?: Omit<ButtonProps, "onPress">;
    chooseDateButtonProps?: Omit<ButtonProps, "onPress">;
    chooseYearButtonProps?: Omit<ButtonProps, "onPress">;
    chooseMonthButtonProps?: Omit<ButtonProps, "onPress">;
    cancelButtonText?: string;
    chooseDateButtonText?: string;
    chooseYearButtonText?: string;
    chooseMonthButtonText?: string;
    activeDateBackgroundColor?: string;
    activeDateTextColor?: string;
    dateBackgroundColor?: string;
    dateTextColor?: string;
    farDateTextColor?: string;
    farDateBackgroundColor?: string;
    rangeDateBackgroundColor?: string;
    disabledDateTextColor?: string;
    hideInput?: boolean;
    minDate?: Date;
    maxDate?: Date;
}
interface IDatePickerSingle extends IDatePickerBase {
    mode?: "single";
    value: DateValue;
    onChange?: (newDate: Date) => void;
}
interface IDatePickerRange extends IDatePickerBase {
    mode: "range";
    value: DateRangeValue;
    onChange?: (newDateRange: DateRangeValue) => void;
}
type IDatePicker = IDatePickerSingle | IDatePickerRange;
declare function DatePicker({ containerStyle, inputContainerStyle, labelStyle, isRequired, isError, errorMessage, errorMessageStyle, label, placeholder, onChange, value, mode, isArrowShown, arrowColor, arrowSize, placeholderStyle, arrowContainerStyle, customArrowIcon, onDatePickerOpened, onDatePickerClosed, customArrowRotation, bottomSheetModalProps, cancelButtonProps, chooseDateButtonProps, chooseYearButtonProps, chooseMonthButtonProps, chooseYearButtonText, chooseMonthButtonText, cancelButtonText, chooseDateButtonText, activeDateBackgroundColor, activeDateTextColor, dateBackgroundColor, dateTextColor, farDateTextColor, farDateBackgroundColor, rangeDateBackgroundColor, disabledDateTextColor, hideInput, minDate, maxDate, }: IDatePicker, ref: React.Ref<IDatePickerRef>): React.JSX.Element;
declare const _default: <T extends DateMode = "single" | "range">(props: (T extends "range" ? IDatePickerRange : IDatePickerSingle) & {
    ref?: React.Ref<IDatePickerRef>;
}) => ReturnType<typeof DatePicker>;
export default _default;
