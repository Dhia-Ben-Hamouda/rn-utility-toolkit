import React, { PropsWithChildren } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IAction {
  icon: React.ReactNode;
  onPress: () => void;
}

function Action({ icon, onPress }: IAction) {
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.action]}>
      {icon}
    </TouchableOpacity>
  );
}

interface ISwipeable extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  actions?: Array<IAction>;
}

const ACTION_BUTTON_DIMENSION = 42;
const ACTION_CONTAINER_GAP = 8;

export default function Swipeable({
  children,
  containerStyle,
  actions = [],
}: ISwipeable) {
  const translationX = useSharedValue(0);

  const actionContainerWidth =
    actions?.length * (ACTION_BUTTON_DIMENSION + ACTION_CONTAINER_GAP);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      if (!translationX.value && event.translationX > 0) {
        return;
      }

      if (event.translationX < 0) {
        translationX.value = withTiming(-actionContainerWidth);
      } else {
        translationX.value = withTiming(0);
      }
    });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        <Animated.View
          style={[styles.container, containerStyle, animatedContainerStyle]}
        >
          {children}
        </Animated.View>
        <View style={[styles.actionContainer]}>
          {actions?.map((action, index) => (
            <Action key={index} {...action} />
          ))}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  actionContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minHeight: 49,
    right: 0,
    gap: ACTION_CONTAINER_GAP,
    zIndex: -1,
  },
  action: {
    backgroundColor: "#333",
    width: ACTION_BUTTON_DIMENSION,
    height: ACTION_BUTTON_DIMENSION,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
