import { Backgrounds } from "../types";
import { colors } from "./colors";

export const backgrounds = {} as Backgrounds;

Object.entries(colors)?.forEach(([key, value]) => {
  Object.assign(backgrounds, {
    [`${key}`]: {
      backgroundColor: value,
    },
  });
});
