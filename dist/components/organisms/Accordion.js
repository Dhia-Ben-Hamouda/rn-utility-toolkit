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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Accordion;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
const DEFAULT_EXPANSION_DURATION = 400;
const DEFAULT_ARROW_SIZE = 12;
const DEFAULT_ARROW_COLOR = "#fff";
const DEFAULT_ARROW_ROTATION_ANGLE = -180;
function AngleDown({ size, color }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
      <react_native_svg_1.Path fill={color} d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
    </react_native_svg_1.default>);
}
function Accordion({ title = "Title", children, isDefaultExpanded = true, expansionDuration = DEFAULT_EXPANSION_DURATION, arrowColor = DEFAULT_ARROW_COLOR, arrowSize = DEFAULT_ARROW_SIZE, customArrowIcon, customArrowRotationAngle = DEFAULT_ARROW_ROTATION_ANGLE, isArrowShown = true, isTitleShown = true, headerStyle, containerStyle, titleStyle, contentContainerStyle, onAccordionClosed, onAccordionOpened, }) {
    const isOpen = (0, react_native_reanimated_1.useSharedValue)(isDefaultExpanded ? 1 : 0);
    const contentHeight = (0, react_native_reanimated_1.useSharedValue)(0);
    const contentRef = (0, react_native_reanimated_1.useAnimatedRef)();
    (0, react_1.useEffect)(() => {
        (0, react_native_reanimated_1.runOnUI)(() => {
            "worklet";
            var _a;
            const measuredContentHeight = (_a = (0, react_native_reanimated_1.measure)(contentRef)) === null || _a === void 0 ? void 0 : _a.height;
            if (!isOpen.value) {
                return;
            }
            if (measuredContentHeight) {
                contentHeight.value = (0, react_native_reanimated_1.withTiming)(measuredContentHeight, {
                    duration: expansionDuration,
                });
            }
        })();
    }, [contentHeight, contentRef, expansionDuration, isOpen.value]);
    const toggleAccordion = () => {
        if (isOpen.value) {
            contentHeight.value = (0, react_native_reanimated_1.withTiming)(0, {
                duration: expansionDuration,
            });
            (0, react_native_reanimated_1.runOnUI)(() => {
                "worklet";
                var _a;
                const measuredContentHeight = (_a = (0, react_native_reanimated_1.measure)(contentRef)) === null || _a === void 0 ? void 0 : _a.height;
                onAccordionClosed &&
                    (0, react_native_reanimated_1.runOnJS)(onAccordionClosed)(measuredContentHeight !== null && measuredContentHeight !== void 0 ? measuredContentHeight : 0);
            })();
        }
        else {
            (0, react_native_reanimated_1.runOnUI)(() => {
                "worklet";
                var _a;
                const measuredContentHeight = (_a = (0, react_native_reanimated_1.measure)(contentRef)) === null || _a === void 0 ? void 0 : _a.height;
                if (measuredContentHeight) {
                    contentHeight.value = (0, react_native_reanimated_1.withTiming)(measuredContentHeight, {
                        duration: expansionDuration,
                    });
                }
                onAccordionOpened &&
                    (0, react_native_reanimated_1.runOnJS)(onAccordionOpened)(measuredContentHeight !== null && measuredContentHeight !== void 0 ? measuredContentHeight : 0);
            })();
        }
        isOpen.value = (0, react_native_reanimated_1.withTiming)(isOpen.value ? 0 : 1);
    };
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            height: contentHeight.value,
        };
    });
    const animatedArrow = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const rotation = (0, react_native_reanimated_1.interpolate)(isOpen.value, [0, 1], [0, customArrowRotationAngle], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [
                {
                    rotate: `${rotation}deg`,
                },
            ],
        };
    });
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.Pressable onPress={toggleAccordion} style={[styles.header, headerStyle]}>
        {isTitleShown && (<react_native_1.Text style={[styles.title, titleStyle]}>{title}</react_native_1.Text>)}
        {isArrowShown && (<react_native_reanimated_1.default.View style={animatedArrow}>
            {customArrowIcon !== null && customArrowIcon !== void 0 ? customArrowIcon : (<AngleDown color={arrowColor} size={arrowSize}/>)}
          </react_native_reanimated_1.default.View>)}
      </react_native_1.Pressable>
      <react_native_reanimated_1.default.View style={[styles.contentContainer, animatedStyle]}>
        <react_native_reanimated_1.default.View ref={contentRef} style={[styles.contentWrapper, contentContainerStyle]}>
          {children}
        </react_native_reanimated_1.default.View>
      </react_native_reanimated_1.default.View>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: "hidden",
    },
    title: {
        color: "#fff",
    },
    header: {
        backgroundColor: "#555",
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentContainer: {
        position: "relative",
    },
    contentWrapper: {
        backgroundColor: "#fff",
        padding: 12,
        position: "absolute",
        width: "100%",
        top: 0,
    },
});
