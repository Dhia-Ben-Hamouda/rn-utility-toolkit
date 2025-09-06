import {
  backgrounds,
  borders,
  colors,
  fonts,
  gaps,
  gutters,
  layout,
  sizes,
} from "../theme";

export default function useTheme() {
  return {
    gutters,
    sizes,
    layout,
    fonts,
    borders,
    colors,
    backgrounds,
    gaps,
  };
}
