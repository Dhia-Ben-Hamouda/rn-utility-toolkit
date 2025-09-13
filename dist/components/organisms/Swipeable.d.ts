import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { IconButtonProps } from "../../types";
interface ISwipeable extends PropsWithChildren {
    containerStyle?: StyleProp<ViewStyle>;
    actionContainerStyle?: StyleProp<ViewStyle>;
    actions?: Array<IconButtonProps>;
}
export default function Swipeable({ children, containerStyle, actionContainerStyle, actions, }: ISwipeable): React.JSX.Element;
export {};
