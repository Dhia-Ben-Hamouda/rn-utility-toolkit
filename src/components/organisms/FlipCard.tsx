import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  Text,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function PlaceholderCard({ label }: { label: string }) {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{label}</Text>
    </View>
  );
}

interface IFlipCard {
  frontCard?: React.ReactNode;
  backCard?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function FlipCard({
  backCard = <PlaceholderCard label="Back Card" />,
  frontCard = <PlaceholderCard label="Front Card" />,
  containerStyle,
}: IFlipCard) {
  const isRotated = useSharedValue(0);

  const animatedFrontCardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      isRotated.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: `${rotation}deg`,
        },
      ],
    };
  });

  const animatedBackCardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      isRotated.value,
      [0, 1],
      [180, 360],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: `${rotation}deg`,
        },
      ],
    };
  });

  const toggleRotation = () => {
    isRotated.value = withTiming(isRotated.value ? 0 : 1, {
      duration: 500,
      easing: Easing.linear,
    });
  };

  return (
    <Pressable
      onPress={toggleRotation}
      style={[styles.container, containerStyle]}
    >
      <Animated.View style={[styles.card, animatedFrontCardStyle]}>
        {frontCard}
      </Animated.View>
      <Animated.View style={[styles.card, animatedBackCardStyle]}>
        {backCard}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 230,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  },
  placeholderContainer: {
    backgroundColor: "#333",
    height: "100%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
});
