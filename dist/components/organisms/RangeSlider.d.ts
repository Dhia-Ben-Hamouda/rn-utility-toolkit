import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface ISliderBase {
    thumbStyle?: StyleProp<ViewStyle>;
    trackStyle?: StyleProp<ViewStyle>;
    progressStyle?: StyleProp<ViewStyle>;
    color?: string;
    sliderWidth?: number;
    unit?: string;
    min?: number;
    max?: number;
    step?: number;
}
interface ISingleSlider extends ISliderBase {
    isRange?: false;
    value: number;
    onChange: (newValue: number) => void;
}
interface IRangeSlider extends ISliderBase {
    isRange: true;
    value: number[];
    onChange: (newValue: number[]) => void;
}
type ISlider = ISingleSlider | IRangeSlider;
export default function Slider({ value: propValue, onChange, thumbStyle, progressStyle, color, trackStyle, unit, max, min, sliderWidth, step, isRange, }: ISlider): React.JSX.Element;
export {};
