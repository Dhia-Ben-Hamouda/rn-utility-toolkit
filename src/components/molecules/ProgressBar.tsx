import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface IGradientCoordinate {
  x: number;
  y: number;
}

interface IProgressBar {
  progress: number;
  containerStyle?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  useGradients?: boolean;
  gradientColors?: Array<string>;
  gradientStart?: IGradientCoordinate;
  gradientEnd?: IGradientCoordinate;
}

export default function ProgressBar({
  progress,
  barStyle,
  containerStyle,
  gradientColors = ["#000", "#666"],
  useGradients = false,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 0, y: 1 },
}: IProgressBar) {
  return (
    <View style={[styles.container, containerStyle]}>
      {useGradients ? (
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={[styles.bar, barStyle, { width: `${progress}%` }]}
        ></LinearGradient>
      ) : (
        <View style={[styles.bar, barStyle, { width: `${progress}%` }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d4d4d4",
    width: "100%",
    borderRadius: 50,
    position: "relative",
  },
  bar: {
    backgroundColor: "#333",
    borderRadius: 50,
    height: 8,
  },
});
