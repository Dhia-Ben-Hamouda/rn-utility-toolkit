import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { PropsWithChildren, SetStateAction } from "react";
import {
  FlatListProps,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { SharedValue, WithTimingConfig } from "react-native-reanimated";

//? Atoms types / interfaces

export interface ButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  gradientWrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isDisabled?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onPress?: () => void;
  isOutlined?: boolean;
  activityIndicatorColor?: string;
  pendingActionBackgroundColor?: string;
  useGradients?: boolean;
  gradientColors?: Array<string>;
  gradientStart?: GradientCoordinate;
  gradientEnd?: GradientCoordinate;
}

export interface CheckboxProps {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  size?: number;
  label?: string;
  color?: string;
  checkColor?: string;
  customCheckIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface DividerProps {
  dividerStyle?: StyleProp<ViewStyle>;
}

export interface IconButtonProps {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isOutlined?: boolean;
  customHitSlop?: number;
  color?: string;
  useGradients?: boolean;
  gradientColors?: Array<string>;
  gradientStart?: GradientCoordinate;
  gradientEnd?: GradientCoordinate;
  isDisabled?: boolean;
}

export interface RadioButtonProps {
  label?: string;
  value: string;
  activeValue: string;
  onChange: (newValue: string) => void;
  labelStyle?: StyleProp<TextStyle>;
  radioContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  customDotSize?: number;
}

export interface SwitchProps {
  thumbStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (newValue: boolean) => void;
  customThumbTranslation?: number;
  value: boolean;
  activeSwitchColor?: string;
  inactiveSwitchColor?: string;
  isDisabled?: boolean;
  disabledSwitchColor?: string;
}

export interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: number;
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
  direction?: "left" | "right";
  enabled?: boolean;
  angle?: number;
  shimmerWidth?: number;
}

//? Molecules types / interfaces

export interface ChipProps {
  value: string;
  activeValue: string;
  onChipPress?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  startPicture?: ImageSourcePropType;
  activeChipBackgroundColor?: string;
  chipBackgroundColor?: string;
  activeChipTextColor?: string;
  chipTextColor?: string;
}

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  overlayStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface ProgressBarProps {
  progress: number;
  containerStyle?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
}

export interface SelectItem<T> {
  label: string;
  value: T;
  picture?: ImageSourcePropType;
}

export interface SelectProps<T> {
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  data: Array<SelectItem<T>>;
  value: null | SelectItem<T>;
  onChange?: (newValue: SelectItem<T>) => void;
  shouldCloseAfterSelection?: boolean;
  isArrowShown?: boolean;
  itemBackgroundColor?: string;
  selectedItemBackgroundColor?: string;
  itemLabelColor?: string;
  selectedItemLabelColor?: string;
  itemLabelStyle?: StyleProp<TextStyle>;
  selectedItemLabelStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  checkColor?: string;
  checkSize?: number;
  arrowColor?: string;
  arrowSize?: number;
  arrowContainerStyle?: StyleProp<ViewStyle>;
  customArrowIcon?: React.ReactNode;
  onSelectOpened?: () => void;
  onSelectClosed?: () => void;
  customDropdownOffset?: number;
  dropdownItemStyle?: StyleProp<ViewStyle>;
  customArrowRotation?: number;
}

export interface TabOption {
  label: string;
  value: string;
}

export interface GradientCoordinate {
  x: number;
  y: number;
}

export interface TabsProps {
  options: Array<TabOption>;
  selectedValue: TabOption;
  onChange?: (newValue: TabOption) => void;
  innerPadding?: number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabLabelColor?: string;
  tabLabelColor?: string;
  useGradients?: boolean;
  gradientColors?: Array<string>;
  gradientStart?: GradientCoordinate;
  gradientEnd?: GradientCoordinate;
  animationConfig?: WithTimingConfig;
}

export interface PickerItem<T> {
  label: string;
  subLabel?: string;
  value: T;
  picture?: ImageSourcePropType;
}

export interface PickerProps<T> {
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  data: Array<PickerItem<T>>;
  value: null | PickerItem<T>;
  onChange?: (newValue: PickerItem<T>) => void;
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
  bottomSheetListProps?: Partial<FlatListProps<PickerItem<T>>>;
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

export interface PickerRef {
  open: () => void;
  close: () => void;
}

//? organisms types / interfaces

export interface AccordionProps {
  title?: string;
  isDefaultExpanded?: boolean;
  expansionDuration?: number;
  arrowColor?: string;
  arrowSize?: number;
  customArrowIcon?: React.ReactNode;
  customArrowRotationAngle?: number;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isArrowShown?: boolean;
  isTitleShown?: boolean;
  onAccordionOpened?: (contentHeight: number) => void;
  onAccordionClosed?: (contentHeight: number) => void;
}

export interface CarouselProps<T> {
  data: Array<T>;
  renderItem: (payload: {
    item: T;
    index: number;
    offset: SharedValue<number>;
  }) => React.ReactElement | null;
  containerStyle?: StyleProp<ViewStyle>;
  dotsContainerStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  dotColor?: string;
  activeDotWidth?: number;
  dotStyle?: StyleProp<ViewStyle>;
  dotWidth?: number;
  showDots?: boolean;
  onChange?: (newIndex: number) => void;
  dotOffsetMultiplier?: number;
}

export interface FlipCardProps {
  frontCard: React.ReactNode;
  backCard: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface PinInputProps {
  pinLength?: number;
  value: string;
  onChange?: (newValue: string) => void;
  blinkingSpeed?: number;
  cursorColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  pinContainerStyle?: StyleProp<ViewStyle>;
  activePinContainerStyle?: ViewStyle;
  cursorStyle?: StyleProp<ViewStyle>;
  pinTextStyle?: StyleProp<TextStyle>;
  secureDotStyle?: StyleProp<ViewStyle>;
  showCursor?: boolean;
  secureTextEntry?: boolean;
  shouldOnlyAcceptNumbers?: boolean;
}

export interface PinInputRef {
  focus: () => void;
  blur: () => void;
}

export interface SwipeableProps extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  actions?: Array<IconButtonProps>;
}

export interface SliderBase {
  thumbStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  progressStyle?: StyleProp<ViewStyle>;
  color?: string;
  sliderWidth?: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface SingleSliderProps extends SliderBase {
  isRange?: false;
  value: number;
  onChange: (newValue: number) => void;
}

export interface RangeSliderProps extends SliderBase {
  isRange: true;
  value: number[];
  onChange: (newValue: number[]) => void;
}

export interface DatePickerBaseProps {
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  label?: string;
  placeholder?: string;
  isArrowShown?: boolean;
  placeholderStyle?: StyleProp<TextStyle>;
  arrowColor?: string;
  arrowSize?: number;
  arrowContainerStyle?: StyleProp<ViewStyle>;
  customArrowIcon?: React.ReactNode;
  onDatePickerOpened?: () => void;
  onDatePickerClosed?: () => void;
  customArrowRotation?: number;
  bottomSheetModalProps?: Partial<BottomSheetModalProps>;
  cancelButtonProps?: Omit<ButtonProps, "onPress">;
  chooseDateButtonProps?: Omit<ButtonProps, "onPress">;
  chooseYearButtonProps?: Omit<ButtonProps, "onPress">;
  chooseMonthButtonProps?: Omit<ButtonProps, "onPress">;
  cancelButtonText?: string;
  chooseDateButtonText?: string;
  chooseYearButtonText?: string;
  chooseMonthButtonText?: string;
  activeDateBackgroundColor?: string;
  activeDateTextColor?: string;
  dateBackgroundColor?: string;
  dateTextColor?: string;
  farDateTextColor?: string;
  farDateBackgroundColor?: string;
  rangeDateBackgroundColor?: string;
  disabledDateTextColor?: string;
  hideInput?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export type DateRangeValue = [Date | null, Date | null];

export interface SingleDatePickerProps extends DatePickerBaseProps {
  mode?: "single";
  value: Date | null;
  onChange?: (newDate: Date) => void;
}

export interface RanngeDatePickerProps extends DatePickerBaseProps {
  mode: "range";
  value: DateRangeValue;
  onChange?: (newDateRange: DateRangeValue) => void;
}

export interface DatePickerRef {
  open: () => void;
  close: () => void;
}