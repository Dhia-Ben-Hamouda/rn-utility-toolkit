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
const DEFAULT_ARROW_COLOR = "#000";
const DEFAULT_ARROW_ROTATION_ANGLE = -180;
function AngleDown({ size, color }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
      <react_native_svg_1.Path fill={color} d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
    </react_native_svg_1.default>);
}
function PlusIcon({ size, color }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
      <react_native_svg_1.Path fill={color} d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
    </react_native_svg_1.default>);
}
function MinusIcon({ size, color }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
      <react_native_svg_1.Path fill={color} d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
    </react_native_svg_1.default>);
}
function Accordion({ title = "Title", children, isDefaultExpanded = true, isExpanded: controlledExpanded, onToggle, expansionDuration = DEFAULT_EXPANSION_DURATION, arrowColor = DEFAULT_ARROW_COLOR, arrowSize = DEFAULT_ARROW_SIZE, customArrowIcon, customArrowRotationAngle = DEFAULT_ARROW_ROTATION_ANGLE, isArrowShown = true, isTitleShown = true, headerStyle, containerStyle, titleStyle, contentContainerStyle, onAccordionClosed, onAccordionOpened, useOppositeArrowIcons = true, closeArrowIcon, openArrowIcon, }) {
    const isControlled = controlledExpanded !== undefined;
    const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(isDefaultExpanded);
    const isExpanded = isControlled ? controlledExpanded : internalExpanded;
    const [measuredContentHeight, setMeasuredContentHeight] = (0, react_1.useState)(0);
    const isOpen = (0, react_native_reanimated_1.useSharedValue)(isExpanded ? 1 : 0);
    const contentHeight = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        if (isExpanded && measuredContentHeight > 0) {
            contentHeight.value = (0, react_native_reanimated_1.withTiming)(measuredContentHeight, {
                duration: expansionDuration,
            });
            isOpen.value = (0, react_native_reanimated_1.withTiming)(1, { duration: expansionDuration });
        }
        if (!isExpanded) {
            contentHeight.value = (0, react_native_reanimated_1.withTiming)(0, {
                duration: expansionDuration,
            });
            isOpen.value = (0, react_native_reanimated_1.withTiming)(0, { duration: expansionDuration });
        }
    }, [
        contentHeight,
        expansionDuration,
        isExpanded,
        isOpen,
        measuredContentHeight,
    ]);
    const onContentLayout = (event) => {
        const nextHeight = event.nativeEvent.layout.height;
        if (nextHeight === measuredContentHeight) {
            return;
        }
        setMeasuredContentHeight(nextHeight);
        if (isExpanded) {
            contentHeight.value = (0, react_native_reanimated_1.withTiming)(nextHeight, {
                duration: expansionDuration,
            });
        }
    };
    const toggleAccordion = () => {
        const nextIsExpanded = !isExpanded;
        if (!isControlled) {
            setInternalExpanded(nextIsExpanded);
        }
        onToggle === null || onToggle === void 0 ? void 0 : onToggle(nextIsExpanded);
        if (nextIsExpanded) {
            onAccordionOpened === null || onAccordionOpened === void 0 ? void 0 : onAccordionOpened(measuredContentHeight);
        }
        else {
            onAccordionClosed === null || onAccordionClosed === void 0 ? void 0 : onAccordionClosed(measuredContentHeight);
        }
    };
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        height: contentHeight.value,
    }));
    const animatedArrow = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const rotation = (0, react_native_reanimated_1.interpolate)(isOpen.value, [0, 1], [0, customArrowRotationAngle], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [{ rotate: `${rotation}deg` }],
        };
    });
    const renderArrowIcon = () => {
        if (useOppositeArrowIcons) {
            return (<react_native_1.View style={styles.iconContainer}>
          {isExpanded ? (<react_native_reanimated_1.default.View key="minus" entering={react_native_reanimated_1.FadeIn.duration(200)} exiting={react_native_reanimated_1.FadeOut.duration(200)}>
              {closeArrowIcon !== null && closeArrowIcon !== void 0 ? closeArrowIcon : (<MinusIcon color={arrowColor} size={arrowSize}/>)}
            </react_native_reanimated_1.default.View>) : (<react_native_reanimated_1.default.View key="plus" entering={react_native_reanimated_1.FadeIn.duration(200)} exiting={react_native_reanimated_1.FadeOut.duration(200)}>
              {openArrowIcon !== null && openArrowIcon !== void 0 ? openArrowIcon : (<PlusIcon color={arrowColor} size={arrowSize}/>)}
            </react_native_reanimated_1.default.View>)}
        </react_native_1.View>);
        }
        return (<react_native_reanimated_1.default.View style={animatedArrow}>
        {customArrowIcon !== null && customArrowIcon !== void 0 ? customArrowIcon : <AngleDown color={arrowColor} size={arrowSize}/>}
      </react_native_reanimated_1.default.View>);
    };
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.Pressable onPress={toggleAccordion} style={[styles.header, headerStyle]}>
        {isTitleShown && (<react_native_1.Text style={[styles.title, titleStyle]}>{title}</react_native_1.Text>)}
        {isArrowShown && renderArrowIcon()}
      </react_native_1.Pressable>

      <react_native_reanimated_1.default.View style={[styles.contentContainer, animatedStyle]}>
        <react_native_1.View onLayout={onContentLayout} style={[styles.contentWrapper, contentContainerStyle]}>
          {children}
        </react_native_1.View>
      </react_native_reanimated_1.default.View>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    title: {
        color: "#000",
    },
    header: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentContainer: {
        position: "relative",
        overflow: "hidden",
    },
    contentWrapper: {
        backgroundColor: "#fff",
        padding: 12,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    iconContainer: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
