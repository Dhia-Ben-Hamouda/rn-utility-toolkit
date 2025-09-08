import React from "react";
import { ViewStyle } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface ISkeleton {
  contentStyle?: ViewStyle;
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
  direction?: "left" | "right";
  enabled?: boolean;
  angle?: number;
  shimmerWidth?: number;
}

export default function Skeleton({ contentStyle, ...rest }: ISkeleton) {
  return (
    <SkeletonPlaceholder {...rest}>
      <SkeletonPlaceholder.Item {...contentStyle} />
    </SkeletonPlaceholder>
  );
}
