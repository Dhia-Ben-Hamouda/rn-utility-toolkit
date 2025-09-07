import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface IProgressBar {
  progress: number;
  containerStyle?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
}

export default function ProgressBar({
  progress,
  barStyle,
  containerStyle,
}: IProgressBar) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.bar, barStyle, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d4d4d4",
    width: "100%",
    height: 8,
    borderRadius: 50,
    position: "relative",
  },
  bar: {
    backgroundColor: "#333",
    height: "100%",
    borderRadius: 50,
  },
});
