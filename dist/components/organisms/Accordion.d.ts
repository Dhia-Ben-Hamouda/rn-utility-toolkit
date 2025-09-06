import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
interface IAccordion {
    title?: string;
    isDefaultExpanded?: boolean;
    expansionDuration?: number;
    arrowColor?: string;
    arrowSize?: number;
    customArrowIcon?: React.ReactNode;
    customArrowRotationAngle?: number;
    headerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    isArrowShown?: boolean;
    isTitleShown?: boolean;
    onAccordionOpened?: (contentHeight: number) => void;
    onAccordionClosed?: (contentHeight: number) => void;
}
export default function Accordion({ title, children, isDefaultExpanded, expansionDuration, arrowColor, arrowSize, customArrowIcon, customArrowRotationAngle, isArrowShown, isTitleShown, headerStyle, containerStyle, titleStyle, contentContainerStyle, onAccordionClosed, onAccordionOpened, }: PropsWithChildren<IAccordion>): React.JSX.Element;
export {};
