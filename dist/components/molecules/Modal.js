"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Modal;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const utils_1 = require("../../utils");
function Modal({ isOpen, setIsOpen, containerStyle, overlayStyle, children, }) {
    return (<>
      <react_native_1.Modal transparent animationType="fade" visible={isOpen}>
        <react_native_1.Pressable onPress={() => {
            if (react_native_1.Platform.OS === "android") {
                setIsOpen && setIsOpen(false);
            }
        }}>
          <react_native_1.Pressable onPress={() => {
            if (react_native_1.Platform.OS === "ios") {
                setIsOpen && setIsOpen(false);
            }
        }} style={[styles.overlay, overlayStyle]}>
            <react_native_1.Pressable onPress={(e) => {
            e.stopPropagation();
        }} style={[styles.container, containerStyle]}>
              {children}
            </react_native_1.Pressable>
          </react_native_1.Pressable>
        </react_native_1.Pressable>
      </react_native_1.Modal>
    </>);
}
const styles = react_native_1.StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(0,0,0,.5)",
        width: utils_1.SCREEN_WIDTH,
        height: utils_1.SCREEN_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#fff",
        width: 300,
        minHeight: 200,
        borderRadius: 7,
    },
});
