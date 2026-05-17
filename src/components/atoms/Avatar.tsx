import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface IGradientCoordinate {
  x: number;
  y: number;
}

interface IAvatar {
  picture?: ImageSourcePropType;
  name?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: ImageStyle;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  onPress?: () => void;
  useGradients?: boolean;
  gradientColors?: string[];
  gradientStart?: IGradientCoordinate;
  gradientEnd?: IGradientCoordinate;
}

const DEFAULT_SIZE = 42;
const DEFAULT_BACKGROUND_COLOR = "#d9d9d9";
const DEFAULT_TEXT_COLOR = "#333";
const DEFAULT_GRADIENT_COLORS = ["#333", "#999"];

const getInitials = (name?: string) => {
  if (!name?.trim()) return "?";

  const parts = name?.trim()?.split(" ")?.filter(Boolean);

  if (parts?.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const firstName = parts[0];
  const lastName = parts[parts?.length - 1];

  return `${firstName[0]}${lastName[0]}`?.toUpperCase();
};

export default function Avatar({
  picture,
  name = "",
  size = DEFAULT_SIZE,
  containerStyle,
  imageStyle,
  textStyle,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  textColor = DEFAULT_TEXT_COLOR,
  borderRadius,
  onPress,
  useGradients = false,
  gradientColors = DEFAULT_GRADIENT_COLORS,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
}: IAvatar) {
  const initials = useMemo(() => getInitials(name), [name]);
  const resolvedBorderRadius = borderRadius ?? size / 2;
  const computedFontSize = Math.max(14, size * 0.36);

  const wrapperStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius: resolvedBorderRadius,
    },
    !useGradients && { backgroundColor },
    containerStyle,
  ];

  const content = picture ? (
    <Image
      source={picture}
      style={[
        styles.image,
        {
          width: size,
          height: size,
          borderRadius: resolvedBorderRadius,
        },
        imageStyle,
      ]}
      resizeMode="cover"
    />
  ) : (
    <Text
      style={[
        styles.text,
        {
          color: textColor,
          fontSize: computedFontSize,
        },
        textStyle,
      ]}
      numberOfLines={1}
    >
      {initials}
    </Text>
  );

  if (useGradients && !picture) {
    return (
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={{ borderRadius: resolvedBorderRadius }}
      >
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={wrapperStyle}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{ borderRadius: resolvedBorderRadius }}
    >
      <View style={wrapperStyle}>{content}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    overflow: "hidden",
  },
  text: {
    fontWeight: "700",
  },
});
