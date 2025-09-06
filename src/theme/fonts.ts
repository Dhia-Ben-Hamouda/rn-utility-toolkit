import { Fonts } from "../types";
import { colors } from "./colors";
import { sizes } from "./sizes";

export const fonts = {
  latoThin: {
    fontFamily: "Lato_Thin",
  },
  latoRegular: {
    fontFamily: "Lato_Regular",
  },
  latoLight: {
    fontFamily: "Lato_Light",
  },
  latoBold: {
    fontFamily: "Lato_Bold",
  },
  latoBlack: {
    fontFamily: "Lato_Black",
  },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
  justify: {
    textAlign: "justify",
  },
  underline: {
    textDecorationLine: "underline",
  },
} as Fonts;

Object.entries(colors)?.forEach(([key, value]) => {
  Object.assign(fonts, {
    [`${key}`]: {
      color: value,
    },
  });
});

sizes.forEach((size) => {
  Object.assign(fonts, {
    [`size${size}`]: {
      fontSize: size,
    },
    [`line${size}`]: {
      lineHeight: size,
    },
  });
});
