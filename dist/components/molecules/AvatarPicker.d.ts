import React, { ReactNode } from "react";
import { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from "react-native";
export type AvatarValue = ImageSourcePropType | null | undefined;
interface ICropPickerValue {
    filename: string;
    uri: string;
    mime: string;
}
interface IAvatarPicker {
    value: AvatarValue;
    onChange?: (newValue: ICropPickerValue) => void;
    size?: number;
    customAvatar?: ImageSourcePropType;
    customEditIcon?: ReactNode;
    avatarStyle?: ImageStyle;
    editContainerStyle?: StyleProp<ViewStyle>;
}
export default function AvatarPicker({ customEditIcon, value, onChange, size, customAvatar, avatarStyle, editContainerStyle, }: IAvatarPicker): React.JSX.Element;
export {};
