"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useTheme;
const theme_1 = require("../theme");
function useTheme() {
    return {
        gutters: theme_1.gutters,
        sizes: theme_1.sizes,
        layout: theme_1.layout,
        fonts: theme_1.fonts,
        borders: theme_1.borders,
        colors: theme_1.colors,
        backgrounds: theme_1.backgrounds,
        gaps: theme_1.gaps,
    };
}
