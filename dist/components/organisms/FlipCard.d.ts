import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface IFlipCard {
    frontCard: React.ReactNode;
    backCard: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}
export default function FlipCard({ backCard, frontCard, containerStyle, }: IFlipCard): React.JSX.Element;
export {};
