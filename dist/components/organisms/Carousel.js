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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Carousel;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const utils_1 = require("../../utils");
const DEFAULT_ACTIVE_DOT_COLOR = "#000";
const DEFAULT_DOT_COLOR = "#ccc";
const DEFAULT_ACTIVE_DOT_WIDTH = 24;
const DEFAULT_DOT_WIDTH = 8;
function AnimatedDot({ index, offset, activeDotColor, dotColor, activeDotWidth, dotStyle, dotWidth, dotOffsetMultiplier, }) {
    const animatedDotStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        if (!offset) {
            return {};
        }
        const width = (0, react_native_reanimated_1.interpolate)(offset.value, [
            (index - 1) * dotOffsetMultiplier,
            index * dotOffsetMultiplier,
            (index + 1) * dotOffsetMultiplier,
        ], [dotWidth, activeDotWidth, dotWidth], react_native_reanimated_1.Extrapolation.CLAMP);
        const backgroundColor = (0, react_native_reanimated_1.interpolateColor)(offset.value, [
            (index - 1) * dotOffsetMultiplier,
            index * dotOffsetMultiplier,
            (index + 1) * dotOffsetMultiplier,
        ], [dotColor, activeDotColor, dotColor]);
        return {
            width,
            backgroundColor,
        };
    });
    return <react_native_reanimated_1.default.View style={[styles.dot, dotStyle, animatedDotStyle]}/>;
}
function Carousel(_a) {
    var { data = [], renderItem: customRenderItem, containerStyle, dotsContainerStyle, activeDotColor = DEFAULT_ACTIVE_DOT_COLOR, dotColor = DEFAULT_DOT_COLOR, activeDotWidth = DEFAULT_ACTIVE_DOT_WIDTH, dotWidth = DEFAULT_DOT_WIDTH, dotStyle, showDots = true, onChange, dotOffsetMultiplier = utils_1.SCREEN_WIDTH } = _a, rest = __rest(_a, ["data", "renderItem", "containerStyle", "dotsContainerStyle", "activeDotColor", "dotColor", "activeDotWidth", "dotWidth", "dotStyle", "showDots", "onChange", "dotOffsetMultiplier"]);
    const offset = (0, react_native_reanimated_1.useSharedValue)(0);
    const viewabilitConfigCallbackPairsRef = (0, react_1.useRef)([
        {
            onViewableItemsChanged,
            viewabilityConfig: {
                itemVisiblePercentThreshold: 100,
            },
        },
    ]);
    function onViewableItemsChanged({ viewableItems, }) {
        var _a, _b;
        onChange && onChange((_b = (_a = viewableItems[0]) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : 0);
    }
    const onScroll = (0, react_native_reanimated_1.useAnimatedScrollHandler)({
        onScroll: (event) => {
            if (offset) {
                offset.value = event.contentOffset.x;
            }
        },
    });
    return (<react_native_1.View style={[styles.wrapper, containerStyle]}>
      <react_native_reanimated_1.default.FlatList onScroll={onScroll} showsHorizontalScrollIndicator={false} pagingEnabled horizontal data={data} renderItem={({ item, index }) => {
            return customRenderItem({
                item,
                index,
                offset,
            });
        }} viewabilityConfigCallbackPairs={viewabilitConfigCallbackPairsRef.current} {...rest}/>
      {showDots && (<react_native_1.View style={[styles.dotsContainer, dotsContainerStyle]}>
          {data === null || data === void 0 ? void 0 : data.map((_, index) => (<AnimatedDot key={index} dotColor={dotColor} activeDotColor={activeDotColor} index={index} offset={offset} activeDotWidth={activeDotWidth} dotStyle={dotStyle} dotWidth={dotWidth} dotOffsetMultiplier={dotOffsetMultiplier}/>))}
        </react_native_1.View>)}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    wrapper: {
        gap: 12,
    },
    dotsContainer: {
        justifyContent: "center",
        marginHorizontal: 16,
        flexDirection: "row",
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: "#555",
        borderRadius: 50,
    },
});
