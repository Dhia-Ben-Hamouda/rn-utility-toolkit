"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Modal;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const utils_1 = require("../../utils");
function Modal(_a) {
    var { isOpen, setIsOpen, children } = _a, rest = __rest(_a, ["isOpen", "setIsOpen", "children"]);
    return (<>
      <react_native_1.Modal transparent animationType="fade" visible={isOpen} {...rest}>
        <react_native_1.Pressable onPress={() => {
            if (react_native_1.Platform.OS === "android") {
                setIsOpen && setIsOpen(false);
            }
        }}>
          <react_native_1.Pressable onPress={() => {
            if (react_native_1.Platform.OS === "ios") {
                setIsOpen && setIsOpen(false);
            }
        }} style={styles.overlay}>
            <react_native_1.Pressable onPress={(e) => {
            e.stopPropagation();
        }} style={styles.container}>
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
