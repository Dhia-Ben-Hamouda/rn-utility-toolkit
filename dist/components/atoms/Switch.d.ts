import { StyleProp, ViewStyle } from "react-native";
interface ISwitch {
    thumbStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onChange: (newValue: boolean) => void;
    customThumbTranslation?: number;
    value: boolean;
    activeSwitchColor?: string;
    inactiveSwitchColor?: string;
    isDisabled?: boolean;
    disabledSwitchColor?: string;
}
export default function Switch({ onChange, value, containerStyle, thumbStyle, customThumbTranslation, activeSwitchColor, inactiveSwitchColor, isDisabled, disabledSwitchColor, }: ISwitch): import("react").JSX.Element;
export {};
