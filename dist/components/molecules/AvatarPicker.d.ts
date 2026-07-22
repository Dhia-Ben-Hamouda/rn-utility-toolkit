import React, { ReactNode } from "react";
import { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from "react-native";
interface IAvatarPickerValue {
    uri: string;
    filename?: string;
    mime?: string;
}
interface IAvatarPicker {
    value: IAvatarPickerValue | null;
    onChange?: (newValue: IAvatarPickerValue) => void;
    size?: number;
    customAvatar?: ImageSourcePropType;
    customEditIcon?: ReactNode;
    avatarStyle?: ImageStyle;
    editContainerStyle?: StyleProp<ViewStyle>;
}
export default function AvatarPicker({ customEditIcon, value, onChange, size, customAvatar, avatarStyle, editContainerStyle, }: IAvatarPicker): React.JSX.Element;
export {};
