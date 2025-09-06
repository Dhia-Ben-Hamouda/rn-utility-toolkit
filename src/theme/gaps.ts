import { Gaps } from "../types";
import { sizes } from "./sizes";

export const gaps = {} as Gaps;

sizes.map((size) => {
  Object.assign(gaps, {
    [`gap${size}`]: {
      gap: size,
    },
    [`columnGap${size}`]: {
      columnGap: size,
    },
    [`rowGap${size}`]: {
      rowGap: size,
    },
  });
});
