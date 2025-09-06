import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils";
import { DimensionValue } from "react-native";

export const layout = {
  // Flex direction
  row: { flexDirection: "row" },
  col: { flexDirection: "column" },

  // Justify content
  justifyStart: { justifyContent: "flex-start" },
  justifyCenter: { justifyContent: "center" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },
  justifyEvenly: { justifyContent: "space-evenly" },

  // Align items
  itemsStart: { alignItems: "flex-start" },
  itemsCenter: { alignItems: "center" },
  itemsEnd: { alignItems: "flex-end" },
  itemsStretch: { alignItems: "stretch" },
  itemsBaseline: { alignItems: "baseline" },

  // Align self
  selfStart: { alignSelf: "flex-start" },
  selfCenter: { alignSelf: "center" },
  selfEnd: { alignSelf: "flex-end" },
  selfStretch: { alignSelf: "stretch" },

  // Flex wrap
  wrap: { flexWrap: "wrap" },
  noWrap: { flexWrap: "nowrap" },

  // Center both axes
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Position
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  // zIndex helpers
  z0: { zIndex: 0 },
  z1: { zIndex: 1 },
  z10: { zIndex: 10 },
  z100: { zIndex: 100 },
  z1000: { zIndex: 1000 },
  generateIndex: (value: number) => ({
    zIndex: value,
  }),

  // Position offsets
  top0: { top: 0 },
  generateTop: (value: DimensionValue) => ({
    top: value,
  }),
  right0: { right: 0 },
  generateRight: (value: DimensionValue) => ({
    right: value,
  }),
  bottom0: { bottom: 0 },
  generateBottom: (value: DimensionValue) => ({
    bottom: value,
  }),
  left0: { left: 0 },
  generateLeft: (value: DimensionValue) => ({
    left: value,
  }),

  // Width percentages
  w10Percent: { width: "10%" },
  w20Percent: { width: "20%" },
  w30Percent: { width: "30%" },
  w40Percent: { width: "40%" },
  w50Percent: { width: "50%" },
  w60Percent: { width: "60%" },
  w70Percent: { width: "70%" },
  w80Percent: { width: "80%" },
  w90Percent: { width: "90%" },
  w100Percent: { width: "100%" },
  wScreen: { width: SCREEN_WIDTH },
  generateHeight: (height: DimensionValue) => ({
    height,
  }),
  generateMinHeight: (minHeight: DimensionValue) => ({
    minHeight,
  }),
  generateMaxHeight: (maxHeight: DimensionValue) => ({
    maxHeight,
  }),

  // Height percentages
  h10Percent: { height: "10%" },
  h20Percent: { height: "20%" },
  h30Percent: { height: "30%" },
  h40Percent: { height: "40%" },
  h50Percent: { height: "50%" },
  h60Percent: { height: "60%" },
  h70Percent: { height: "70%" },
  h80Percent: { height: "80%" },
  h90Percent: { height: "90%" },
  h100Percent: { height: "100%" },
  hScreen: { height: SCREEN_HEIGHT },
  generateWidth: (width: DimensionValue) => ({
    width,
  }),
  generateMinWidth: (minWidth: DimensionValue) => ({
    minWidth,
  }),
  generateMaxWidth: (maxWidth: DimensionValue) => ({
    maxWidth,
  }),

  // Overflow
  overflowHidden: { overflow: "hidden" },
  overflowVisible: { overflow: "visible" },

  // Flex
  flex_1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  halfFlex: {
    flex: 0.5,
  },
  generateFlex: (value: number) => ({
    flex: value,
  }),

  // Transforms
  generateTranslateX: (value: number | `${number}%`) => ({
    transform: [{ translateX: value }],
  }),
  generateTranslateY: (value: number | `${number}%`) => ({
    transform: [{ translateY: value }],
  }),
  generateScale: (value: number) => ({
    transform: [{ scale: value }],
  }),
  generateScaleX: (value: number) => ({
    transform: [{ scaleX: value }],
  }),
  generateScaleY: (value: number) => ({
    transform: [{ scaleY: value }],
  }),
  generateRotate: (angle: number) => ({
    transform: [{ rotate: `${angle}deg` }],
  }),
  generateRotateZ: (angle: number) => ({
    transform: [{ rotateZ: `${angle}deg` }],
  }),
  generateRotateY: (angle: number) => ({
    transform: [{ rotateY: `${angle}deg` }],
  }),
  generateSkewX: (angle: number) => ({
    transform: [{ skewX: `${angle}deg` }],
  }),
  generateSkewY: (angle: number) => ({
    transform: [{ skewY: `${angle}deg` }],
  }),
} as const;
