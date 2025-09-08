"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IconButton;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const DEFAULT_BUTTON_COLOR = "#333";
function IconButton({ icon, onPress, containerStyle, customHitSlop, isOutlined, color = DEFAULT_BUTTON_COLOR, }) {
    return (<>
      <react_native_1.TouchableOpacity onPress={onPress} hitSlop={customHitSlop} style={[
            styles.container,
            containerStyle,
            { backgroundColor: color, borderColor: color },
            isOutlined && { borderWidth: 1, backgroundColor: "transparent" },
        ]}>
        {icon}
      </react_native_1.TouchableOpacity>
    </>);
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
