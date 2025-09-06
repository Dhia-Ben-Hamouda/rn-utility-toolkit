import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IAction {
    icon: React.ReactNode;
    onPress: () => void;
}
interface ISwipeable extends PropsWithChildren {
    containerStyle?: StyleProp<ViewStyle>;
    actions?: Array<IAction>;
}
export default function Swipeable({ children, containerStyle, actions, }: ISwipeable): React.JSX.Element;
export {};
