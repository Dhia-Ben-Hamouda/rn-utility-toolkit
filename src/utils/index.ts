import { Dimensions, Platform } from "react-native";

export function hexToRgba(hex: string, opacity: number) {
  hex = hex?.replace(/^#/, "");

  if (hex?.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export function generateInsets(value: number) {
  return {
    left: value,
    top: value,
    right: value,
    bottom: value,
  };
}

export function generateShadow(
  shadowColor: string = "#000000",
  shadowOffset: { height: number; width: number } = { height: 0, width: 0 },
  shadowOpacity: number = 0.15,
  shadowRadius: number = 5,
  elevation: number = 2
) {
  return Platform.select({
    ios: {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    },
    android: {
      elevation,
    },
  });
}

export function capitalize(value: string = "") {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function formatAmountByCurrency(
  amount: number,
  currency?: string,
  isCurrencyLeftPositioned?: boolean,
) {
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount);

  return isCurrencyLeftPositioned
    ? `${currency} ${formattedAmount}`.trim()
    : `${formattedAmount} ${currency}`.trim();
}

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
