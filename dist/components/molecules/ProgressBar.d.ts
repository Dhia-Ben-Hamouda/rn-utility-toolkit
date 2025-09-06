import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IProgressBar {
    progress: number;
    containerStyle?: StyleProp<ViewStyle>;
    barStyle?: StyleProp<ViewStyle>;
}
export default function ProgressBar({ progress, barStyle, containerStyle, }: IProgressBar): React.JSX.Element;
export {};
