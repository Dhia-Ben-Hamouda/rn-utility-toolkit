import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
export interface IAccordion {
    title?: string;
    isDefaultExpanded?: boolean;
    isExpanded?: boolean;
    onToggle?: (nextIsExpanded: boolean) => void;
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
    useOppositeArrowIcons?: boolean;
    openArrowIcon?: React.ReactNode;
    closeArrowIcon?: React.ReactNode;
}
export default function Accordion({ title, children, isDefaultExpanded, isExpanded: controlledExpanded, onToggle, expansionDuration, arrowColor, arrowSize, customArrowIcon, customArrowRotationAngle, isArrowShown, isTitleShown, headerStyle, containerStyle, titleStyle, contentContainerStyle, onAccordionClosed, onAccordionOpened, useOppositeArrowIcons, closeArrowIcon, openArrowIcon, }: PropsWithChildren<IAccordion>): React.JSX.Element;
