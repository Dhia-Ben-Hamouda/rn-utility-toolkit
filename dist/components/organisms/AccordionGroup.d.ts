import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { IAccordion } from "../molecules/Accordion";
interface AccordionGroupItem extends Omit<IAccordion, "isExpanded" | "onToggle"> {
    key?: string;
    content: React.ReactNode;
}
interface IAccordionGroup {
    data: AccordionGroupItem[];
    defaultOpenIndex?: number | null;
    containerStyle?: StyleProp<ViewStyle>;
    itemContainerStyle?: StyleProp<ViewStyle>;
    separatorStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    headerStyle?: StyleProp<ViewStyle>;
    allowMultiple?: boolean;
}
export default function AccordionGroup({ data, defaultOpenIndex, containerStyle, itemContainerStyle, separatorStyle, titleStyle, headerStyle, allowMultiple, }: IAccordionGroup): React.JSX.Element;
export {};
