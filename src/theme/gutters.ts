import { Gutters } from "../types";
import { sizes } from "./sizes";

export const gutters: Gutters = sizes.reduce((acc, size) => {
  return Object.assign(acc, {
    [`margin${size}`]: {
      margin: size,
    },
    [`marginTop${size}`]: {
      marginTop: size,
    },
    [`marginRight${size}`]: {
      marginRight: size,
    },
    [`marginBottom${size}`]: {
      marginBottom: size,
    },
    [`marginLeft${size}`]: {
      marginLeft: size,
    },
    [`marginHorizontal${size}`]: {
      marginHorizontal: size,
    },
    [`marginVertical${size}`]: {
      marginVertical: size,
    },
    [`marginStart${size}`]: {
      marginStart: size,
    },
    [`marginEnd${size}`]: {
      marginEnd: size,
    },
    [`padding${size}`]: {
      padding: size,
    },
    [`paddingTop${size}`]: {
      paddingTop: size,
    },
    [`paddingRight${size}`]: {
      paddingRight: size,
    },
    [`paddingBottom${size}`]: {
      paddingBottom: size,
    },
    [`paddingLeft${size}`]: {
      paddingLeft: size,
    },
    [`paddingHorizontal${size}`]: {
      paddingHorizontal: size,
    },
    [`paddingVertical${size}`]: {
      paddingVertical: size,
    },
    [`paddingStart${size}`]: {
      paddingStart: size,
    },
    [`paddingEnd${size}`]: {
      paddingEnd: size,
    },
  });
}, {} as Gutters);
