import { StyleProp, TextStyle, ViewStyle } from "react-native";
interface IRadioButton {
    label?: string;
    value: string;
    activeValue: string;
    onChange: (newValue: string) => void;
    labelStyle?: StyleProp<TextStyle>;
    radioContainerStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    color?: string;
    customDotSize?: number;
}
export default function RadioButton({ label, onChange, value, activeValue, labelStyle, color, containerStyle, radioContainerStyle, customDotSize, }: IRadioButton): import("react").JSX.Element;
export {};
