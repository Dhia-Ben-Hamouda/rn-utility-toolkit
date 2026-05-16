"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProgressBar;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
function ProgressBar({ progress, barStyle, containerStyle, gradientColors = ["#000", "#666"], useGradients = false, gradientStart = { x: 0, y: 0 }, gradientEnd = { x: 0, y: 1 }, }) {
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      {useGradients ? (<react_native_linear_gradient_1.default colors={gradientColors} start={gradientStart} end={gradientEnd} style={[styles.bar, barStyle, { width: `${progress}%` }]}></react_native_linear_gradient_1.default>) : (<react_native_1.View style={[styles.bar, barStyle, { width: `${progress}%` }]}/>)}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#d4d4d4",
        width: "100%",
        borderRadius: 50,
        position: "relative",
    },
    bar: {
        backgroundColor: "#333",
        borderRadius: 50,
        height: 8,
    },
});
