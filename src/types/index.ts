import { PropsWithChildren, SetStateAction } from "react";
import {
  ImageSourcePropType,
  ListRenderItem,
  ModalProps as NativeModalProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  SharedValue,
  WithTimingConfig,
} from "react-native-reanimated";

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

export interface SwitchProps {
  thumbStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (newValue: boolean) => void;
  customThumbTranslation?: number;
  value: boolean;
  activeSwitchColor?: string;
  inactiveSwitchColor?: string;
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

export interface DividerProps {
  dividerStyle?: StyleProp<ViewStyle>;
}

export interface ProgressBarProps {
  progress: number;
  containerStyle?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
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

export interface FlipCardProps {
  frontCard: React.ReactNode;
  backCard: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface IconButtonProps {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isOutlined?: boolean;
  customHitSlop?: number;
  color?: string;
}

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

export interface CarouselProps<T> extends Partial<Animated.FlatList<T>> {
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
  dotOffsetMultiplier: number;
}

export interface SwipeableAction {
  icon: React.ReactNode;
  onPress: () => void;
}

export interface SwipeableProps extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  actions?: Array<SwipeableAction>;
}
