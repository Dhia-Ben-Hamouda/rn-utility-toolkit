import { Borders } from "../types";
import { colors } from "./colors";
import { sizes } from "./sizes";

export const borders = {} as Borders;

Object.entries(colors).forEach(([key, value]) => {
  Object.assign(borders, {
    [`${key}`]: {
      borderColor: value,
    },
  });
});

sizes.forEach((size) => {
  Object.assign(borders, {
    [`width${size}`]: {
      borderWidth: size,
    },
    [`rounded${size}`]: {
      borderRadius: size,
    },
    [`roundedTopRight${size}`]: {
      borderTopRightRadius: size,
    },
    [`roundedBottomRight${size}`]: {
      borderBottomRightRadius: size,
    },
    [`roundedBottomLeft${size}`]: {
      borderBottomLeftRadius: size,
    },
    [`roundedTopLeft${size}`]: {
      borderTopLeftRadius: size,
    },
  });
});
