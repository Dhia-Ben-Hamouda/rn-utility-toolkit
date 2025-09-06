"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProgressBar;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function ProgressBar({ progress, barStyle, containerStyle, }) {
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.View style={[styles.bar, barStyle, { width: `${progress}%` }]}/>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#d4d4d4",
        width: "100%",
        height: 6,
        borderRadius: 50,
        position: "relative",
    },
    bar: {
        backgroundColor: "#555",
        height: "100%",
        borderRadius: 50,
    },
});
