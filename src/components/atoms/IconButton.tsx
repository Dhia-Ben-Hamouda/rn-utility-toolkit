import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const DEFAULT_BUTTON_COLOR = "#333";

interface IIconButton {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isOutlined?: boolean;
  customHitSlop?: number;
  color?: string;
}

export default function IconButton({
  icon,
  onPress,
  containerStyle,
  customHitSlop,
  isOutlined,
  color = DEFAULT_BUTTON_COLOR,
}: IIconButton) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        hitSlop={customHitSlop}
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: color, borderColor: color },
          isOutlined && { borderWidth: 1, backgroundColor: "transparent" },
        ]}
      >
        {icon}
      </TouchableOpacity>
    </>
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
