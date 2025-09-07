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
exports.default = Tabs;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const DEFAULT_INNER_PADDING = 8;
function Tab({ option, selectedValue, onChange, tabStyle, labelStyle, activeTabLabelColor, tabLabelColor, }) {
    const progress = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        progress.value = (0, react_native_reanimated_1.withTiming)(selectedValue === option.value ? 1 : 0);
    }, [selectedValue, option.value]);
    const animatedTabTextStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const color = (0, react_native_reanimated_1.interpolateColor)(progress.value, [0, 1], [tabLabelColor, activeTabLabelColor]);
        return { color };
    });
    return (<react_native_1.TouchableOpacity style={[styles.tab, tabStyle]} onPress={() => onChange === null || onChange === void 0 ? void 0 : onChange(option)}>
      <react_native_reanimated_1.default.Text style={[styles.label, labelStyle, animatedTabTextStyle]}>
        {option.label}
      </react_native_reanimated_1.default.Text>
    </react_native_1.TouchableOpacity>);
}
function Tabs({ options, selectedValue, onChange, innerPadding = DEFAULT_INNER_PADDING, containerStyle, labelStyle, activeTabLabelColor = "#000", tabLabelColor = "#000", indicatorStyle, tabStyle, gradientColors = ["#333", "#999"], useGradients = false, gradientStart = { x: 0, y: 0 }, gradientEnd = { x: 1, y: 0 }, animationConfig, }) {
    const offset = (0, react_native_reanimated_1.useSharedValue)(0);
    const [containerDimensions, setContainerDimensions] = (0, react_1.useState)({
        height: 0,
        width: 0,
    });
    (0, react_1.useEffect)(() => {
        const selectedIndex = options.findIndex((opt) => opt.value === selectedValue.value);
        offset.value = (0, react_native_reanimated_1.withTiming)(selectedIndex >= 0 ? selectedIndex : 0, animationConfig);
    }, [selectedValue, options]);
    const itemWidth = (0, react_1.useMemo)(() => {
        if (!containerDimensions.width)
            return 0;
        return (containerDimensions.width - innerPadding * 2) / (options === null || options === void 0 ? void 0 : options.length);
    }, [containerDimensions.width, innerPadding, options === null || options === void 0 ? void 0 : options.length]);
    const animatedIndicatorStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            transform: [{ translateX: offset.value * itemWidth }],
        };
    });
    const combinedIndicatorStyle = [
        styles.indicator,
        animatedIndicatorStyle,
        {
            width: `${100 / (options === null || options === void 0 ? void 0 : options.length)}%`,
            height: containerDimensions.height - innerPadding * 2,
            top: innerPadding,
            left: innerPadding,
        },
        indicatorStyle,
    ];
    return (<react_native_1.View style={[styles.container, containerStyle, { padding: innerPadding }]} onLayout={(event) => {
            setContainerDimensions({
                height: event.nativeEvent.layout.height,
                width: event.nativeEvent.layout.width,
            });
        }}>
      {useGradients ? (<react_native_reanimated_1.default.View style={[combinedIndicatorStyle, { backgroundColor: "transparent" }]}>
          <react_native_linear_gradient_1.default key={JSON.stringify(containerDimensions)} style={{
                width: "100%",
                height: containerDimensions.height - innerPadding * 2,
                borderRadius: 8,
            }} colors={gradientColors} start={gradientStart} end={gradientEnd}/>
        </react_native_reanimated_1.default.View>) : (<react_native_reanimated_1.default.View style={combinedIndicatorStyle}/>)}

      {options.map((option) => (<Tab key={option.value} labelStyle={labelStyle} tabLabelColor={tabLabelColor} onChange={onChange} tabStyle={tabStyle} selectedValue={selectedValue.value} option={option} activeTabLabelColor={activeTabLabelColor}/>))}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#eaeaea",
        borderRadius: 8,
        flexDirection: "row",
    },
    tab: {
        minHeight: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    indicator: {
        backgroundColor: "#fff",
        position: "absolute",
        borderRadius: 8,
    },
    label: {
        fontWeight: "bold",
    },
});
