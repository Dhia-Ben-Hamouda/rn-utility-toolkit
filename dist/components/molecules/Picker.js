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
const bottom_sheet_1 = require("@gorhom/bottom-sheet");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
const utils_1 = require("../../utils");
const atoms_1 = require("../atoms");
const ANIMATION_DURATION = 500;
const DEFAULT_ARROW_COLOR = "rgba(0,0,0,.75)";
const DEFAULT_ARROW_SIZE = 12;
const DEFAULT_ARROW_ROTATION = 0;
const DEFAULT_SELECTED_ITEM_BORDER_COLOR = "#333";
const DEFAULT_ITEM_BORDER_COLOR = "rgba(0,0,0,.1)";
const AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Pressable);
function AngleDown({ size = 20, color = DEFAULT_ARROW_COLOR, }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
      <react_native_svg_1.Path fill={color} d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
    </react_native_svg_1.default>);
}
function PickerItem({ item, value, onPress, itemStyle, selectedItemBorderColor, itemBorderColor, }) {
    const isActive = (0, react_native_reanimated_1.useSharedValue)(0);
    (0, react_1.useEffect)(() => {
        isActive.value = (0, react_native_reanimated_1.withTiming)((value === null || value === void 0 ? void 0 : value.label) === (item === null || item === void 0 ? void 0 : item.label) ? 1 : 0);
    }, [value, item]);
    const animatedContainerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const borderColor = (0, react_native_reanimated_1.interpolateColor)(isActive.value, [0, 1], [itemBorderColor, selectedItemBorderColor]);
        const borderWidth = (0, react_native_reanimated_1.interpolate)(isActive.value, [0, 1], [1, 2]);
        return {
            borderColor,
            borderWidth,
        };
    });
    return (<AnimatedPressable hitSlop={10} onPress={() => {
            onPress && onPress(item);
        }} style={[
            styles.itemContainer,
            itemStyle === null || itemStyle === void 0 ? void 0 : itemStyle.containerStyle,
            animatedContainerStyle,
        ]}>
      <react_native_1.View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        }}>
        {(item === null || item === void 0 ? void 0 : item.picture) && (<react_native_1.Image resizeMode="contain" source={item === null || item === void 0 ? void 0 : item.picture} style={[
                {
                    width: 46,
                    height: 46,
                },
                itemStyle === null || itemStyle === void 0 ? void 0 : itemStyle.pictureStyle,
            ]}/>)}
        <react_native_1.View style={{
            gap: 2,
        }}>
          <react_native_1.Text style={[{ fontWeight: "700" }, itemStyle === null || itemStyle === void 0 ? void 0 : itemStyle.labelStyle]}>
            {item === null || item === void 0 ? void 0 : item.label}
          </react_native_1.Text>
          {(item === null || item === void 0 ? void 0 : item.subLabel) && (<react_native_1.Text style={[itemStyle === null || itemStyle === void 0 ? void 0 : itemStyle.subLabelStyle]}>{item === null || item === void 0 ? void 0 : item.subLabel}</react_native_1.Text>)}
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={{
            minHeight: 32,
            alignItems: "center",
            justifyContent: "center",
        }}>
        <atoms_1.RadioButton onChange={() => {
            onPress && onPress(item);
        }} value={item === null || item === void 0 ? void 0 : item.label} activeValue={value === null || value === void 0 ? void 0 : value.label} containerStyle={{
            gap: 0,
        }} {...itemStyle === null || itemStyle === void 0 ? void 0 : itemStyle.radioStyle}/>
      </react_native_1.View>
    </AnimatedPressable>);
}
function Picker({ containerStyle, inputContainerStyle, labelStyle, isRequired = false, isError, errorMessage, errorMessageStyle, label, placeholder = "Select option", data = [], onChange, value, isArrowShown = true, arrowColor = DEFAULT_ARROW_COLOR, arrowSize = DEFAULT_ARROW_SIZE, placeholderStyle, arrowContainerStyle, customArrowIcon, onPickerOpened, onPickerClosed, customArrowRotation = DEFAULT_ARROW_ROTATION, confirmationMethod = "selection", confirmationButtonProps, confirmationButtonLabel = "Choose", bottomSheetListProps, bottomSheetModalProps, shouldCloseOnSelection = true, selectedItemBorderColor = DEFAULT_SELECTED_ITEM_BORDER_COLOR, itemBorderColor = DEFAULT_ITEM_BORDER_COLOR, sheetHeader, sheetListStyle, itemStyle, }, ref) {
    const isOpen = (0, react_native_reanimated_1.useSharedValue)(0);
    const bottomSheetModalRef = (0, react_1.useRef)(null);
    const [localValue, setLocalValue] = (0, react_1.useState)(value);
    const onChangeTimeoutRef = (0, react_1.useRef)(null);
    const closeTimeoutRef = (0, react_1.useRef)(null);
    const bottomSheetModalBackdrop = (0, react_1.useCallback)((props) => (<bottom_sheet_1.BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0}/>), []);
    const animatedArrowStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const rotation = (0, react_native_reanimated_1.interpolate)(isOpen.value, [0, 1], [0, customArrowRotation], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [{ rotate: `${rotation}deg` }],
        };
    });
    function handlePress() {
        var _a;
        (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
        if (isOpen.value) {
            onPickerClosed && onPickerClosed();
        }
        else {
            onPickerOpened && onPickerOpened();
        }
        isOpen.value = (0, react_native_reanimated_1.withTiming)(isOpen.value ? 0 : 1, {
            duration: ANIMATION_DURATION,
        });
    }
    (0, react_1.useImperativeHandle)(ref, () => ({
        open: () => {
            var _a;
            (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
            isOpen.value = (0, react_native_reanimated_1.withTiming)(1, { duration: ANIMATION_DURATION });
            onPickerOpened && onPickerOpened();
        },
        close: () => {
            var _a;
            (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.close();
            isOpen.value = (0, react_native_reanimated_1.withTiming)(0, { duration: ANIMATION_DURATION });
            onPickerClosed && onPickerClosed();
        },
    }));
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      {label && (<react_native_1.Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <react_native_1.Text style={[styles.star]}>*</react_native_1.Text>}{" "}
        </react_native_1.Text>)}
      <react_native_1.TouchableOpacity onPress={handlePress} style={[
            styles.inputContainer,
            inputContainerStyle,
            isError && { borderColor: "red" },
        ]}>
        <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {(value === null || value === void 0 ? void 0 : value.picture) && (<react_native_1.Image resizeMode="contain" source={value === null || value === void 0 ? void 0 : value.picture} style={{ width: 20, height: 20 }}/>)}
          <react_native_1.Text style={[styles.label, placeholderStyle]}>
            {value ? value === null || value === void 0 ? void 0 : value.label : placeholder}
          </react_native_1.Text>
        </react_native_1.View>
        {isArrowShown && (<react_native_1.View style={[arrowContainerStyle]}>
            <react_native_reanimated_1.default.View style={[animatedArrowStyle]}>
              {customArrowIcon ? (customArrowIcon) : (<AngleDown size={arrowSize} color={arrowColor}/>)}
            </react_native_reanimated_1.default.View>
          </react_native_1.View>)}
      </react_native_1.TouchableOpacity>
      {isError && (<react_native_1.Text style={[styles.error, errorMessageStyle]}>{errorMessage}</react_native_1.Text>)}
      <bottom_sheet_1.BottomSheetModal ref={bottomSheetModalRef} backdropComponent={bottomSheetModalBackdrop} handleComponent={() => <></>} enableDynamicSizing={false} enablePanDownToClose snapPoints={[confirmationMethod === "button" ? "55%" : "50%"]} {...bottomSheetModalProps}>
        <react_native_1.View style={[styles.sheetContainer]}>
          {sheetHeader}
          <bottom_sheet_1.BottomSheetFlatList bounces={false} data={data} contentContainerStyle={[styles.sheetList, sheetListStyle]} renderItem={({ item, index, }) => (<PickerItem key={index} value={localValue} item={item} itemStyle={itemStyle} selectedItemBorderColor={selectedItemBorderColor} itemBorderColor={itemBorderColor} onPress={() => {
                if (confirmationMethod === "button") {
                    setLocalValue(item);
                }
                else {
                    setLocalValue(item);
                    if (onChangeTimeoutRef.current) {
                        clearTimeout(onChangeTimeoutRef.current);
                    }
                    if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current);
                    }
                    onChangeTimeoutRef.current = setTimeout(() => {
                        onChange && onChange(item);
                    }, 150);
                    closeTimeoutRef.current = setTimeout(() => {
                        var _a;
                        if (shouldCloseOnSelection) {
                            (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.close();
                        }
                    }, 200);
                }
            }}/>)} {...bottomSheetListProps}/>
          {confirmationMethod === "button" && (<atoms_1.Button onPress={() => {
                var _a;
                onChange && localValue && onChange(localValue);
                if (shouldCloseOnSelection) {
                    (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.close();
                }
            }} {...confirmationButtonProps} textStyle={[
                { fontWeight: "600" },
                confirmationButtonProps === null || confirmationButtonProps === void 0 ? void 0 : confirmationButtonProps.textStyle,
            ]}>
              {confirmationButtonLabel}
            </atoms_1.Button>)}
        </react_native_1.View>
      </bottom_sheet_1.BottomSheetModal>
    </react_native_1.View>);
}
exports.default = (0, react_1.forwardRef)(Picker);
const styles = react_native_1.StyleSheet.create({
    container: {
        gap: 8,
    },
    inputContainer: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.25)",
        minHeight: 50,
    },
    label: {
        color: "rgba(0,0,0,.75)",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginStart: 8,
    },
    star: {
        color: "red",
    },
    itemLabel: {
        color: "rgba(0,0,0,.75)",
    },
    sheetContainer: Object.assign({ padding: 16, flex: 1, gap: 16 }, (utils_1.isIos && { paddingBottom: 42 })),
    sheetList: {
        gap: 12,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 7,
        padding: 12,
    },
});
