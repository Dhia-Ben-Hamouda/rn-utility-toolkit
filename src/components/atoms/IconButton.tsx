import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface IGradientCoordinate {
  x: number;
  y: number;
}

interface IIconButton {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isOutlined?: boolean;
  customHitSlop?: number;
  color?: string;
  useGradients?: boolean;
  gradientColors?: Array<string>;
  gradientStart?: IGradientCoordinate;
  gradientEnd?: IGradientCoordinate;
  isDisabled?: boolean;
}

export default function IconButton({
  icon,
  onPress,
  containerStyle,
  customHitSlop,
  isOutlined,
  gradientColors = ["#000", "#777"],
  useGradients = false,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },
  isDisabled,
}: IIconButton) {
  if (useGradients) {
    return (
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onPress}
        hitSlop={customHitSlop}
      >
        <LinearGradient
          style={[styles.container, containerStyle]}
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
        >
          {icon}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      hitSlop={customHitSlop}
      style={[
        styles.container,
        isOutlined && { borderWidth: 1, backgroundColor: "transparent" },
        containerStyle,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    backgroundColor: "#333",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
