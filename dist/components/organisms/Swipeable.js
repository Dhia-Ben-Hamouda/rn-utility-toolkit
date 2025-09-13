"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Swipeable;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const atoms_1 = require("../atoms");
const ACTION_BUTTON_DIMENSION = 42;
const ACTION_CONTAINER_GAP = 8;
function Swipeable({ children, containerStyle, actionContainerStyle, actions = [], }) {
    const translationX = (0, react_native_reanimated_1.useSharedValue)(0);
    const actionContainerWidth = (actions === null || actions === void 0 ? void 0 : actions.length) * (ACTION_BUTTON_DIMENSION + ACTION_CONTAINER_GAP);
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-10, 10])
        .onUpdate((event) => {
        if (!translationX.value && event.translationX > 0) {
            return;
        }
        if (event.translationX < 0) {
            translationX.value = (0, react_native_reanimated_1.withTiming)(-actionContainerWidth);
        }
        else {
            translationX.value = (0, react_native_reanimated_1.withTiming)(0);
        }
    });
    const animatedContainerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateX: translationX.value }],
    }));
    return (<react_native_gesture_handler_1.GestureDetector gesture={panGesture}>
      <react_native_reanimated_1.default.View>
        <react_native_reanimated_1.default.View style={[styles.container, containerStyle, animatedContainerStyle]}>
          {children}
        </react_native_reanimated_1.default.View>
        <react_native_1.View style={[styles.actionContainer, actionContainerStyle]}>
          {actions === null || actions === void 0 ? void 0 : actions.map((action, index) => (<atoms_1.IconButton key={index} {...action}/>))}
        </react_native_1.View>
      </react_native_reanimated_1.default.View>
    </react_native_gesture_handler_1.GestureDetector>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
    },
    actionContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        minHeight: 49,
        height: "100%",
        right: 0,
        gap: ACTION_CONTAINER_GAP,
        zIndex: -1,
    },
});
