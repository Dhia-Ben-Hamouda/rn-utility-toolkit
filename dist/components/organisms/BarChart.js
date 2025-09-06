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
const atoms_1 = require("../atoms");
const utils_1 = require("../../utils");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const BAR_EXPANSION_DURATION = 400;
const AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Pressable);
function Bar({ id, firstCategoryValue, secondCategoryValue, biggestChartValue, selectedBarId, setSelectedBarId, isFirstCategorySwitchOpen, isSecondCategorySwitchOpen, categories, date, language, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const firstCategoryHeight = (0, react_native_reanimated_1.useSharedValue)(0);
    const secondCategoryHeight = (0, react_native_reanimated_1.useSharedValue)(0);
    const isSelected = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        if (isFirstCategorySwitchOpen) {
            firstCategoryHeight.value = (0, react_native_reanimated_1.withTiming)((firstCategoryValue / biggestChartValue) * 100, {
                duration: BAR_EXPANSION_DURATION,
            });
        }
        else {
            firstCategoryHeight.value = (0, react_native_reanimated_1.withTiming)(0, {
                duration: BAR_EXPANSION_DURATION,
            });
        }
    }, [isFirstCategorySwitchOpen]);
    (0, react_1.useEffect)(() => {
        if (isSecondCategorySwitchOpen) {
            secondCategoryHeight.value = (0, react_native_reanimated_1.withTiming)((secondCategoryValue / biggestChartValue) * 100, {
                duration: BAR_EXPANSION_DURATION,
            });
        }
        else {
            secondCategoryHeight.value = (0, react_native_reanimated_1.withTiming)(0, {
                duration: BAR_EXPANSION_DURATION,
            });
        }
    }, [isSecondCategorySwitchOpen]);
    (0, react_1.useEffect)(() => {
        if (firstCategoryValue) {
            firstCategoryHeight.value = (0, react_native_reanimated_1.withTiming)((firstCategoryValue / biggestChartValue) * 100, {
                duration: BAR_EXPANSION_DURATION,
            });
        }
    }, [firstCategoryValue]);
    (0, react_1.useEffect)(() => {
        if (secondCategoryValue) {
            secondCategoryHeight.value = (0, react_native_reanimated_1.withTiming)((secondCategoryValue / biggestChartValue) * 100, {
                duration: BAR_EXPANSION_DURATION,
            });
        }
    }, [secondCategoryValue]);
    const animatedFirstCategoryBarStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            height: `${firstCategoryHeight.value}%`,
        };
    });
    const animatedSecondCategoryBarStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            height: `${secondCategoryHeight.value}%`,
        };
    });
    (0, react_1.useEffect)(() => {
        isSelected.value = (0, react_native_reanimated_1.withTiming)(selectedBarId === id ? 1 : 0, {
            duration: BAR_EXPANSION_DURATION,
        });
    }, [selectedBarId]);
    const defaultSelectedBarColor = (0, utils_1.hexToRgba)("darkgreen", 0.1);
    const selectedBarColor = (0, utils_1.hexToRgba)((_b = (_a = categories[0]) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : "darkgreen", 0.1);
    const animatedContainerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const backgroundColor = (0, react_native_reanimated_1.interpolateColor)(isSelected.value, [0, 1], ["transparent", categories ? selectedBarColor : defaultSelectedBarColor]);
        const padding = (0, react_native_reanimated_1.interpolate)(isSelected.value, [0, 1], [0, 12]);
        const paddingBottom = (0, react_native_reanimated_1.interpolate)(isSelected.value, [0, 1], [0, 20]);
        return {
            backgroundColor,
            padding,
            paddingBottom,
        };
    });
    const animatedDotStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const dimension = (0, react_native_reanimated_1.interpolate)(isSelected.value, [0, 1], [0, 18]);
        const opacity = (0, react_native_reanimated_1.interpolate)(isSelected.value, [0, 1], [0, 1]);
        return {
            height: dimension,
            width: dimension,
            opacity,
        };
    });
    const animatedPopoverStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(isSelected.value, [0, 1], [0, 1]);
        const scale = (0, react_native_reanimated_1.interpolate)(isSelected.value, [0, 1], [0.5, 1]);
        const adjustedLeft = id * 40 > utils_1.SCREEN_WIDTH - 200 ? -130 : 20;
        return {
            scale,
            opacity,
            zIndex: 99999,
            left: adjustedLeft,
        };
    });
    const locale = {
        [utils_1.Languages.EN]: "en-GB",
        [utils_1.Languages.FR]: "fr-FR",
        [utils_1.Languages.AR]: "ar-AR",
    };
    return (<react_native_1.View>
      <AnimatedPressable style={[
            {
                alignItems: "center",
                gap: 12,
                flex: 1,
                borderRadius: 7,
                overflow: "visible",
            },
            animatedContainerStyle,
        ]} onPress={() => {
            setSelectedBarId(id);
        }}>
        <react_native_1.View style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 4,
            flex: 1,
        }}>
          <react_native_reanimated_1.default.View style={[
            {
                backgroundColor: "lightgreen",
                width: 8,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
            },
            { backgroundColor: (_c = categories[0]) === null || _c === void 0 ? void 0 : _c.color },
            animatedFirstCategoryBarStyle,
        ]}/>
          <react_native_reanimated_1.default.View style={[
            {
                backgroundColor: "yellow",
                width: 8,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
            },
            { backgroundColor: (_d = categories[1]) === null || _d === void 0 ? void 0 : _d.color },
            animatedSecondCategoryBarStyle,
        ]}/>
        </react_native_1.View>
        <react_native_1.Text style={{
            fontSize: 14,
            fontWeight: "bold",
        }}>
          {(_e = new Intl.DateTimeFormat(locale[language], { weekday: "short" })
            .format(date)) === null || _e === void 0 ? void 0 : _e.replace(".", "")}
        </react_native_1.Text>
      </AnimatedPressable>
      <react_native_reanimated_1.default.View style={[
            {
                backgroundColor: "lightgreen",
                borderRadius: 50,
                borderColor: "white",
                left: "50%",
                borderWidth: 4,
            },
            { backgroundColor: (_f = categories[0]) === null || _f === void 0 ? void 0 : _f.color },
            animatedDotStyle,
            {
                left: "50%",
                transform: [
                    {
                        translateY: -10,
                    },
                    {
                        translateX: -9,
                    },
                ],
            },
        ]}/>
      <react_native_reanimated_1.default.View style={[
            (0, utils_1.generateShadow)(),
            {
                backgroundColor: "white",
                width: 168,
                position: "absolute",
                borderRadius: 5,
                top: 5,
                left: 20,
                padding: 10,
            },
            animatedPopoverStyle,
        ]}>
        <react_native_1.Text style={{
            fontSize: 11,
        }}>
          {date === null || date === void 0 ? void 0 : date.toLocaleDateString(locale[language], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })}
        </react_native_1.Text>
        <atoms_1.Divider dividerStyle={{ height: 1, marginVertical: 8 }}/>
        <react_native_1.View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4,
        }}>
          <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <react_native_1.View style={[
            {
                height: 8,
                width: 8,
                backgroundColor: "lightgreen",
                borderRadius: 50,
            },
            { backgroundColor: (_g = categories[0]) === null || _g === void 0 ? void 0 : _g.color },
        ]}/>
            <react_native_1.Text style={{ fontSize: 12 }}>{(_h = categories[0]) === null || _h === void 0 ? void 0 : _h.name}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={{ fontSize: 12 }}>
            {(0, utils_1.formatAmountByCurrency)(firstCategoryValue, "TND")}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <react_native_1.View style={[
            {
                height: 8,
                width: 8,
                backgroundColor: "yellow",
                borderRadius: 50,
            },
            { backgroundColor: (_j = categories[1]) === null || _j === void 0 ? void 0 : _j.color },
        ]}/>
            <react_native_1.Text style={{ fontSize: 12 }}>{(_k = categories[1]) === null || _k === void 0 ? void 0 : _k.name}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={{ fontSize: 12 }}>
            {(0, utils_1.formatAmountByCurrency)(secondCategoryValue, "TND")}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_reanimated_1.default.View>
    </react_native_1.View>);
}
exports.default = react_1.default.forwardRef(({ categories, data, language = utils_1.Languages.EN }, ref) => {
    var _a, _b, _c, _d, _e, _f;
    const [selectedBarId, setSelectedBarId] = (0, react_1.useState)(null);
    const [isFirstCategorySwitchOpen, setIsFirstCategorySwitchOpen] = (0, react_1.useState)(true);
    const [isSecondCategorySwitchOpen, setIsSecondCategorySwitchOpen] = (0, react_1.useState)(true);
    const biggestChartValue = (0, react_1.useMemo)(() => {
        const barValues = data === null || data === void 0 ? void 0 : data.flatMap((bar) => [
            bar === null || bar === void 0 ? void 0 : bar.firstCategoryValue,
            bar === null || bar === void 0 ? void 0 : bar.secondCategoryValue,
        ]);
        return barValues === null || barValues === void 0 ? void 0 : barValues.reduce((acc, curr) => {
            return acc > curr ? acc : curr;
        });
    }, [data]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        removeSelectedBarId: () => {
            setSelectedBarId(null);
        },
    }));
    return (<react_native_1.Pressable onPress={() => {
            setSelectedBarId(null);
        }}>
        <react_native_1.View style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 24,
            marginTop: 16,
            marginBottom: 36,
        }}>
          <react_native_1.View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        }}>
            <atoms_1.Switch thumbStyle={{ width: 14, height: 14 }} customThumbTranslation={20} containerStyle={{
            width: 42,
        }} activeSwitchColor={(_b = (_a = categories[0]) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : "lightgreen"} value={isFirstCategorySwitchOpen} onChange={setIsFirstCategorySwitchOpen}/>
            <react_native_1.Text>{(_c = categories[0]) === null || _c === void 0 ? void 0 : _c.name}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <atoms_1.Switch thumbStyle={{ height: 14, width: 14 }} customThumbTranslation={20} containerStyle={{ width: 42 }} activeSwitchColor={(_e = (_d = categories[1]) === null || _d === void 0 ? void 0 : _d.color) !== null && _e !== void 0 ? _e : "yellow"} value={isSecondCategorySwitchOpen} onChange={setIsSecondCategorySwitchOpen}/>
            <react_native_1.Text>{(_f = categories[1]) === null || _f === void 0 ? void 0 : _f.name}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_gesture_handler_1.ScrollView contentContainerStyle={{
            paddingHorizontal: 8,
            gap: 20,
            alignItems: "flex-end",
            height: 200,
        }} showsHorizontalScrollIndicator={false} bounces={false} horizontal>
          {data === null || data === void 0 ? void 0 : data.map((item) => (<Bar key={item === null || item === void 0 ? void 0 : item.id} language={language} categories={categories} biggestChartValue={biggestChartValue} selectedBarId={selectedBarId} setSelectedBarId={setSelectedBarId} isFirstCategorySwitchOpen={isFirstCategorySwitchOpen} isSecondCategorySwitchOpen={isSecondCategorySwitchOpen} {...item}/>))}
        </react_native_gesture_handler_1.ScrollView>
      </react_native_1.Pressable>);
});
