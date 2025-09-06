import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IIconButon {
    icon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    isOutlined?: boolean;
    customHitSlop?: number;
    color?: string;
}
export default function IconButton({ icon, onPress, containerStyle, customHitSlop, isOutlined, color, }: IIconButon): React.JSX.Element;
export {};
