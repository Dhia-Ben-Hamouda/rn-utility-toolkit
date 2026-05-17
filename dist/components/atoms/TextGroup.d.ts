import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
interface ITextGroup {
    title: string;
    description: string;
    end?: boolean;
    horizontal?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
}
export default function TextGroup({ title, description, end, horizontal, containerStyle, descriptionStyle, titleStyle, }: ITextGroup): React.JSX.Element;
export {};
