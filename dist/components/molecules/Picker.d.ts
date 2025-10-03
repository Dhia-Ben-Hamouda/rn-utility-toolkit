import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import React from "react";
import { FlatListProps, ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ButtonProps, RadioButtonProps } from "../../types";
export interface IPickerItem<T> {
    label: string;
    subLabel?: string;
    value: T;
    picture?: ImageSourcePropType;
}
interface IPicker<T> {
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    isRequired?: boolean;
    isError?: boolean;
    errorMessage?: string;
    errorMessageStyle?: StyleProp<TextStyle>;
    label?: string;
    placeholder?: string;
    data: Array<IPickerItem<T>>;
    value: null | IPickerItem<T>;
    onChange?: (newValue: IPickerItem<T>) => void;
    isArrowShown?: boolean;
    placeholderStyle?: StyleProp<TextStyle>;
    arrowColor?: string;
    arrowSize?: number;
    arrowContainerStyle?: StyleProp<ViewStyle>;
    customArrowIcon?: React.ReactNode;
    onPickerOpened?: () => void;
    onPickerClosed?: () => void;
    customArrowRotation?: number;
    confirmationMethod?: "button" | "selection";
    confirmationButtonProps?: Omit<ButtonProps, "onPress">;
    confirmationButtonLabel?: string;
    bottomSheetListProps?: Partial<FlatListProps<IPickerItem<T>>>;
    bottomSheetModalProps?: Partial<BottomSheetModalProps>;
    shouldCloseOnSelection?: boolean;
    selectedItemBorderColor?: string;
    itemBorderColor?: string;
    sheetHeader?: React.ReactNode;
    sheetListStyle?: StyleProp<ViewStyle>;
    itemStyle?: {
        labelStyle?: StyleProp<TextStyle>;
        subLabelStyle?: StyleProp<TextStyle>;
        radioStyle?: Omit<RadioButtonProps, "value" | "activeValue" | "onChange">;
        containerStyle?: StyleProp<ViewStyle>;
    };
}
export interface IPickerRef {
    open: () => void;
    close: () => void;
}
declare function Picker<T>({ containerStyle, inputContainerStyle, labelStyle, isRequired, isError, errorMessage, errorMessageStyle, label, placeholder, data, onChange, value, isArrowShown, arrowColor, arrowSize, placeholderStyle, arrowContainerStyle, customArrowIcon, onPickerOpened, onPickerClosed, customArrowRotation, confirmationMethod, confirmationButtonProps, confirmationButtonLabel, bottomSheetListProps, bottomSheetModalProps, shouldCloseOnSelection, selectedItemBorderColor, itemBorderColor, sheetHeader, sheetListStyle, itemStyle, }: IPicker<T>, ref: React.Ref<IPickerRef>): React.JSX.Element;
declare const _default: <T>(props: IPicker<T> & {
    ref?: React.Ref<IPickerRef>;
}) => ReturnType<typeof Picker>;
export default _default;
