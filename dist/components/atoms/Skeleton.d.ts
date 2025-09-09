import React from "react";
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
export default function Skeleton({ width, height, speed, backgroundColor, highlightColor, ...rest }: ISkeleton): React.JSX.Element;
export {};
