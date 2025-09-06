import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IDivider {
    dividerStyle?: StyleProp<ViewStyle>;
}
export default function Divider({ dividerStyle }: IDivider): React.JSX.Element;
export {};
