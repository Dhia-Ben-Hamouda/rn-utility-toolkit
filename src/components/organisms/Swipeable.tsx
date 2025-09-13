import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconButtonProps } from "../../types";
import { IconButton } from "../atoms";

interface ISwipeable extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actions?: Array<IconButtonProps>;
}

const ACTION_BUTTON_DIMENSION = 42;
const ACTION_CONTAINER_GAP = 8;

export default function Swipeable({
  children,
  containerStyle,
  actionContainerStyle,
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
        <View style={[styles.actionContainer, actionContainerStyle]}>
          {actions?.map((action, index) => (
            <IconButton key={index} {...action} />
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
    height: "100%",
    right: 0,
    gap: ACTION_CONTAINER_GAP,
    zIndex: -1,
  },
});
