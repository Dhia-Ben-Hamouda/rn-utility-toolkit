import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  FlatListProps,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { ButtonProps, RadioButtonProps } from "../../types";
import { isIos } from "../../utils";
import { Button, RadioButton } from "../atoms";

const ANIMATION_DURATION = 500;
const DEFAULT_ARROW_COLOR = "rgba(0,0,0,.75)";
const DEFAULT_ARROW_SIZE = 12;
const DEFAULT_ARROW_ROTATION = 0;
const DEFAULT_SELECTED_ITEM_BORDER_COLOR = "#333";
const DEFAULT_ITEM_BORDER_COLOR = "rgba(0,0,0,.1)";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AngleDown({
  size = 20,
  color = DEFAULT_ARROW_COLOR,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 448 512">
      <Path
        fill={color}
        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
      />
    </Svg>
  );
}

function PickerItem<T>({
  item,
  value,
  onPress,
  itemStyle,
  selectedItemBorderColor,
  itemBorderColor,
}: {
  item: IPickerItem<T>;
  value: IPickerItem<T> | null;
  onPress: (newValue: IPickerItem<T>) => void;
  selectedItemBorderColor: string;
  itemBorderColor: string;
  itemStyle?: {
    labelStyle?: StyleProp<TextStyle>;
    subLabelStyle?: StyleProp<TextStyle>;
    radioStyle?: Omit<RadioButtonProps, "value" | "activeValue" | "onChange">;
    containerStyle?: StyleProp<ViewStyle>;
    pictureStyle?: StyleProp<ImageStyle>;
  };
}) {
  const isActive = useSharedValue(0);

  useEffect(() => {
    isActive.value = withTiming(value?.label === item?.label ? 1 : 0);
  }, [value, item]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      isActive.value,
      [0, 1],
      [itemBorderColor, selectedItemBorderColor]
    );

    const borderWidth = interpolate(isActive.value, [0, 1], [1, 2]);

    return {
      borderColor,
      borderWidth,
    };
  });

  return (
    <AnimatedPressable
      hitSlop={10}
      onPress={() => {
        onPress && onPress(item);
      }}
      style={[
        styles.itemContainer,
        itemStyle?.containerStyle,
        animatedContainerStyle,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        {item?.picture && (
          <Image
            resizeMode="contain"
            source={item?.picture}
            style={[
              {
                width: 46,
                height: 46,
              },
              itemStyle?.pictureStyle,
            ]}
          />
        )}
        <View
          style={{
            gap: 2,
          }}
        >
          <Text style={[{ fontWeight: "700" }, itemStyle?.labelStyle]}>
            {item?.label}
          </Text>
          {item?.subLabel && (
            <Text style={[itemStyle?.subLabelStyle]}>{item?.subLabel}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          minHeight: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RadioButton
          onChange={() => {
            onPress && onPress(item);
          }}
          value={item?.label}
          activeValue={value?.label as string}
          containerStyle={{
            gap: 0,
          }}
          {...itemStyle?.radioStyle}
        />
      </View>
    </AnimatedPressable>
  );
}

export interface IPickerItem<T> {
  label: string;
  subLabel?: string;
  value: T;
  picture?: ImageSourcePropType;
}

interface IPicker<T> {
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  data: Array<IPickerItem<T>>;
  value: null | IPickerItem<T>;
  onChange?: (newValue: IPickerItem<T>) => void;
  isArrowShown?: boolean;
  placeholderStyle?: StyleProp<TextStyle>;
  arrowColor?: string;
  arrowSize?: number;
  arrowContainerStyle?: StyleProp<ViewStyle>;
  customArrowIcon?: React.ReactNode;
  onPickerOpened?: () => void;
  onPickerClosed?: () => void;
  customArrowRotation?: number;
  confirmationMethod?: "button" | "selection";
  confirmationButtonProps?: Omit<ButtonProps, "onPress">;
  confirmationButtonLabel?: string;
  bottomSheetListProps?: Partial<FlatListProps<IPickerItem<T>>>;
  bottomSheetModalProps?: Partial<BottomSheetModalProps>;
  shouldCloseOnSelection?: boolean;
  selectedItemBorderColor?: string;
  itemBorderColor?: string;
  sheetHeader?: React.ReactNode;
  sheetListStyle?: StyleProp<ViewStyle>;
  itemStyle?: {
    labelStyle?: StyleProp<TextStyle>;
    subLabelStyle?: StyleProp<TextStyle>;
    radioStyle?: Omit<RadioButtonProps, "value" | "activeValue" | "onChange">;
    containerStyle?: StyleProp<ViewStyle>;
  };
}

export interface IPickerRef {
  open: () => void;
  close: () => void;
}

function Picker<T>(
  {
    containerStyle,
    inputContainerStyle,
    labelStyle,
    isRequired = false,
    isError,
    errorMessage,
    errorMessageStyle,
    label,
    placeholder = "Select option",
    data = [],
    onChange,
    value,
    isArrowShown = true,
    arrowColor = DEFAULT_ARROW_COLOR,
    arrowSize = DEFAULT_ARROW_SIZE,
    placeholderStyle,
    arrowContainerStyle,
    customArrowIcon,
    onPickerOpened,
    onPickerClosed,
    customArrowRotation = DEFAULT_ARROW_ROTATION,
    confirmationMethod = "selection",
    confirmationButtonProps,
    confirmationButtonLabel = "Choose",
    bottomSheetListProps,
    bottomSheetModalProps,
    shouldCloseOnSelection = true,
    selectedItemBorderColor = DEFAULT_SELECTED_ITEM_BORDER_COLOR,
    itemBorderColor = DEFAULT_ITEM_BORDER_COLOR,
    sheetHeader,
    sheetListStyle,
    itemStyle,
  }: IPicker<T>,
  ref: React.Ref<IPickerRef>
) {
  const isOpen = useSharedValue(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [localValue, setLocalValue] = useState<IPickerItem<T> | null>(value);
  const onChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const bottomSheetModalBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const animatedArrowStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      isOpen.value,
      [0, 1],
      [0, customArrowRotation],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  function handlePress() {
    bottomSheetModalRef.current?.present();

    if (isOpen.value) {
      onPickerClosed && onPickerClosed();
    } else {
      onPickerOpened && onPickerOpened();
    }

    isOpen.value = withTiming(isOpen.value ? 0 : 1, {
      duration: ANIMATION_DURATION,
    });
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetModalRef.current?.present();
      isOpen.value = withTiming(1, { duration: ANIMATION_DURATION });
      onPickerOpened && onPickerOpened();
    },
    close: () => {
      bottomSheetModalRef.current?.close();
      isOpen.value = withTiming(0, { duration: ANIMATION_DURATION });
      onPickerClosed && onPickerClosed();
    },
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text style={[styles.star]}>*</Text>}{" "}
        </Text>
      )}
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.inputContainer,
          inputContainerStyle,
          isError && { borderColor: "red" },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {value?.picture && (
            <Image
              resizeMode="contain"
              source={value?.picture}
              style={{ width: 20, height: 20 }}
            />
          )}
          <Text style={[styles.label, placeholderStyle]}>
            {value ? value?.label : placeholder}
          </Text>
        </View>
        {isArrowShown && (
          <View style={[arrowContainerStyle]}>
            <Animated.View style={[animatedArrowStyle]}>
              {customArrowIcon ? (
                customArrowIcon
              ) : (
                <AngleDown size={arrowSize} color={arrowColor} />
              )}
            </Animated.View>
          </View>
        )}
      </TouchableOpacity>
      {isError && (
        <Text style={[styles.error, errorMessageStyle]}>{errorMessage}</Text>
      )}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={bottomSheetModalBackdrop}
        handleComponent={() => <></>}
        enableDynamicSizing={false}
        enablePanDownToClose
        snapPoints={[confirmationMethod === "button" ? "55%" : "50%"]}
        {...bottomSheetModalProps}
      >
        <View style={[styles.sheetContainer]}>
          {sheetHeader}
          <BottomSheetFlatList
            bounces={false}
            data={data}
            contentContainerStyle={[styles.sheetList, sheetListStyle]}
            renderItem={({
              item,
              index,
            }: {
              item: IPickerItem<T>;
              index: number;
            }) => (
              <PickerItem
                key={index}
                value={localValue}
                item={item}
                itemStyle={itemStyle}
                selectedItemBorderColor={selectedItemBorderColor}
                itemBorderColor={itemBorderColor}
                onPress={() => {
                  if (confirmationMethod === "button") {
                    setLocalValue(item);
                  } else {
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
                      if (shouldCloseOnSelection) {
                        bottomSheetModalRef.current?.close();
                      }
                    }, 200);
                  }
                }}
              />
            )}
            {...bottomSheetListProps}
          />
          {confirmationMethod === "button" && (
            <Button
              onPress={() => {
                onChange && localValue && onChange(localValue);
                if (shouldCloseOnSelection) {
                  bottomSheetModalRef.current?.close();
                }
              }}
              {...confirmationButtonProps}
              textStyle={[
                { fontWeight: "600" },
                confirmationButtonProps?.textStyle,
              ]}
            >
              {confirmationButtonLabel}
            </Button>
          )}
        </View>
      </BottomSheetModal>
    </View>
  );
}

export default forwardRef(Picker) as <T>(
  props: IPicker<T> & { ref?: React.Ref<IPickerRef> }
) => ReturnType<typeof Picker>;

const styles = StyleSheet.create({
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
  sheetContainer: {
    padding: 16,
    flex: 1,
    gap: 16,
    ...(isIos && { paddingBottom: 42 }),
  },
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
