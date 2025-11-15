"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IconButton;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
function IconButton({ icon, onPress, containerStyle, customHitSlop, isOutlined, gradientColors = ["#000", "#777"], useGradients = false, gradientStart = { x: 0, y: 0 }, gradientEnd = { x: 1, y: 0 }, isDisabled, }) {
    if (useGradients) {
        return (<react_native_1.TouchableOpacity disabled={isDisabled} onPress={onPress} hitSlop={customHitSlop}>
        <react_native_linear_gradient_1.default style={[styles.container, containerStyle]} colors={gradientColors} start={gradientStart} end={gradientEnd}>
          {icon}
        </react_native_linear_gradient_1.default>
      </react_native_1.TouchableOpacity>);
    }
    return (<react_native_1.TouchableOpacity disabled={isDisabled} onPress={onPress} hitSlop={customHitSlop} style={[
            styles.container,
            isOutlined && { borderWidth: 1, backgroundColor: "transparent" },
            containerStyle,
        ]}>
      {icon}
    </react_native_1.TouchableOpacity>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        width: 46,
        height: 46,
        backgroundColor: "#333",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});
