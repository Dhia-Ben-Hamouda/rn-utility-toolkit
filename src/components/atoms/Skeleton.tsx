import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const DEFAULT_SPEED = 1250;
const DEFAULT_BACKGROUND_COLOR = "#ccc";
const DEFAULT_HIGHLIGHT_COLOR = "#aaa";

interface ISkeleton {
  width: number;
  height: number;
  borderRadius?: number;
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
  direction?: "left" | "right";
  enabled?: boolean;
  angle?: number;
  shimmerWidth?: number;
}

export default function Skeleton({
  width,
  height,
  speed = DEFAULT_SPEED,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  ...rest
}: ISkeleton) {
  return (
    <SkeletonPlaceholder
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
      speed={speed}
      {...rest}
    >
      <SkeletonPlaceholder.Item width={width} height={height} />
    </SkeletonPlaceholder>
  );
}
