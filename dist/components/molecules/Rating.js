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
exports.default = Rating;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
const DEFAULT_STAR_SIZE = 36;
const DEFAULT_ACTIVE_STAR_COLOR = "#333333";
const DEFAULT_INACTIVE_STAR_COLOR = "#d8d8d8";
const AnimatedPath = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Path);
function Star({ onChange, value, activeValue, isReadOnly, starSize, activeStarColor, inactiveStarColor, }) {
    const isStarActive = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        if (isReadOnly)
            return;
        isStarActive.value = (0, react_native_reanimated_1.withTiming)(value <= activeValue ? 1 : 0);
    }, [value, activeValue, isReadOnly]);
    const animatedProps = (0, react_native_reanimated_1.useAnimatedProps)(() => {
        const fill = (0, react_native_reanimated_1.interpolateColor)(isStarActive.value, [0, 1], [inactiveStarColor, activeStarColor]);
        return { fill };
    });
    const fillPercentage = Math.min(Math.max(activeValue - (value - 1), 0), 1);
    const fillWidth = fillPercentage * 640;
    return (<react_native_1.Pressable disabled={isReadOnly} onPress={() => {
            if (!isReadOnly)
                onChange && onChange(value);
        }}>
      <react_native_svg_1.default width={starSize} height={starSize} viewBox="0 0 640 640">
        {isReadOnly ? (<>
            <react_native_svg_1.Path d="M341.5 45.1c-4.1-8-12.4-13.1-21.4-13.1-9 0-17.3 5.1-21.4 13.1l-73.6 144.2-159.9 25.4c-8.9 1.4-16.3 7.7-19.1 16.3-2.8 8.6-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2 7.3 5.3 16.9 6.1 25 2l144.4-73.4L464.4 555c8 4.1 17.7 3.3 25-2 7.3-5.3 11-14.2 9.6-23.2l-25.3-159.9 114.4-114.5c6.4-6.4 8.6-15.8 5.8-24.4-2.8-8.6-10.1-14.9-19.1-16.3L415 189.3 341.5 45.1z" fill={inactiveStarColor}/>
            <react_native_svg_1.Defs>
              <react_native_svg_1.ClipPath id={`clip-${value}`}>
                <react_native_svg_1.Rect x="0" y="0" width={fillWidth} height="640"/>
              </react_native_svg_1.ClipPath>
            </react_native_svg_1.Defs>
            <react_native_svg_1.Path d="M341.5 45.1c-4.1-8-12.4-13.1-21.4-13.1-9 0-17.3 5.1-21.4 13.1l-73.6 144.2-159.9 25.4c-8.9 1.4-16.3 7.7-19.1 16.3-2.8 8.6-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2 7.3 5.3 16.9 6.1 25 2l144.4-73.4L464.4 555c8 4.1 17.7 3.3 25-2 7.3-5.3 11-14.2 9.6-23.2l-25.3-159.9 114.4-114.5c6.4-6.4 8.6-15.8 5.8-24.4-2.8-8.6-10.1-14.9-19.1-16.3L415 189.3 341.5 45.1z" fill={activeStarColor} clipPath={`url(#clip-${value})`}/>
          </>) : (<AnimatedPath animatedProps={animatedProps} d="M341.5 45.1c-4.1-8-12.4-13.1-21.4-13.1-9 0-17.3 5.1-21.4 13.1l-73.6 144.2-159.9 25.4c-8.9 1.4-16.3 7.7-19.1 16.3-2.8 8.6-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2 7.3 5.3 16.9 6.1 25 2l144.4-73.4L464.4 555c8 4.1 17.7 3.3 25-2 7.3-5.3 11-14.2 9.6-23.2l-25.3-159.9 114.4-114.5c6.4-6.4 8.6-15.8 5.8-24.4-2.8-8.6-10.1-14.9-19.1-16.3L415 189.3 341.5 45.1z"/>)}
      </react_native_svg_1.default>
    </react_native_1.Pressable>);
}
function Rating({ containerStyle, value, onChange, isReadOnly = false, starSize = DEFAULT_STAR_SIZE, activeStarColor = DEFAULT_ACTIVE_STAR_COLOR, inactiveStarColor = DEFAULT_INACTIVE_STAR_COLOR, }) {
    return (<react_native_1.View key={isReadOnly ? value : undefined} style={[styles.container, containerStyle]}>
      {Array.from({ length: 5 }).map((_, index) => (<Star key={index} value={index + 1} onChange={onChange} activeValue={value} isReadOnly={isReadOnly} starSize={starSize} inactiveStarColor={inactiveStarColor} activeStarColor={activeStarColor}/>))}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 4,
    },
});
