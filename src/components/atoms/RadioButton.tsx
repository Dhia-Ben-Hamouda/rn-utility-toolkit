import { useEffect } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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

export default function RadioButton({
  label,
  onChange,
  value,
  activeValue,
  labelStyle,
  color = "#555",
  containerStyle,
  radioContainerStyle,
  customDotSize = 10,
}: IRadioButton) {
  const isRadioChecked = useSharedValue(0);

  useEffect(() => {
    isRadioChecked.value = withTiming(activeValue === value ? 1 : 0, {
      duration: 300,
    });
  }, [activeValue, isRadioChecked, value]);

  const animatedRadioDotStyle = useAnimatedStyle(() => {
    const dimension = interpolate(
      isRadioChecked.value,
      [0, 1],
      [0, customDotSize]
    );

    return {
      width: dimension,
      height: dimension,
      backgroundColor: color,
      borderRadius: 50,
    };
  });

  const handlePress = () => {
    onChange && onChange(value);
  };

  return (
    <Pressable hitSlop={15} style={styles.pressable} onPress={handlePress}>
      <View style={[styles.container, containerStyle]}>
        <View
          style={[
            styles.radioContainer,
            radioContainerStyle,
            color && { borderColor: color },
          ]}
        >
          <Animated.View style={[animatedRadioDotStyle]} />
        </View>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  radioContainer: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    alignSelf: "flex-start",
  },
});
