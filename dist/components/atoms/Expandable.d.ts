import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";
interface IExpandable extends PropsWithChildren {
    isOpen: SharedValue<number>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}
export default function Expandable({ isOpen, children, contentContainerStyle, }: IExpandable): React.JSX.Element;
export {};
