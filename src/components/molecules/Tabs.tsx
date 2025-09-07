import React, { useEffect, useMemo, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

const DEFAULT_INNER_PADDING = 8;

export interface ITabOption {
  label: string;
  value: string;
}

export interface IGradientCoordinate {
  x: number;
  y: number;
}

interface ITabs {
  options: Array<ITabOption>;
  selectedValue: ITabOption;
  onChange?: (newValue: ITabOption) => void;
  innerPadding?: number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabLabelColor?: string;
  tabLabelColor?: string;
  useGradients?: boolean;
  gradientColors?: Array<string>;
  gradientStart?: IGradientCoordinate;
  gradientEnd?: IGradientCoordinate;
  animationConfig?: WithTimingConfig;
}

function Tab({
  option,
  selectedValue,
  onChange,
  tabStyle,
  labelStyle,
  activeTabLabelColor,
  tabLabelColor,
}: {
  option: ITabOption;
  selectedValue: string;
  onChange?: (newValue: ITabOption) => void;
  tabStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeTabLabelColor: string;
  tabLabelColor: string;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(selectedValue === option.value ? 1 : 0);
  }, [selectedValue, option.value]);

  const animatedTabTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [tabLabelColor, activeTabLabelColor]
    );

    return { color };
  });

  return (
    <TouchableOpacity
      style={[styles.tab, tabStyle]}
      onPress={() => onChange?.(option)}
    >
      <Animated.Text style={[styles.label, labelStyle, animatedTabTextStyle]}>
        {option.label}
      </Animated.Text>
    </TouchableOpacity>
  );
}

export default function Tabs({
  options,
  selectedValue,
  onChange,
  innerPadding = DEFAULT_INNER_PADDING,
  containerStyle,
  labelStyle,
  activeTabLabelColor = "#000",
  tabLabelColor = "#000",
  indicatorStyle,
  tabStyle,
  gradientColors = ["#333", "#999"],
  useGradients = false,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },
  animationConfig,
}: ITabs) {
  const offset = useSharedValue(0);
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const selectedIndex = options.findIndex(
      (opt) => opt.value === selectedValue.value
    );
    offset.value = withTiming(
      selectedIndex >= 0 ? selectedIndex : 0,
      animationConfig
    );
  }, [selectedValue, options]);

  const itemWidth = useMemo(() => {
    if (!containerDimensions.width) return 0;
    return (containerDimensions.width - innerPadding * 2) / options?.length;
  }, [containerDimensions.width, innerPadding, options?.length]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * itemWidth }],
    };
  });

  const combinedIndicatorStyle: StyleProp<ViewStyle> = [
    styles.indicator,
    animatedIndicatorStyle,
    {
      width: `${100 / options?.length}%`,
      height: containerDimensions.height - innerPadding * 2,
      top: innerPadding,
      left: innerPadding,
    },
    indicatorStyle,
  ];

  return (
    <View
      style={[styles.container, containerStyle, { padding: innerPadding }]}
      onLayout={(event) => {
        setContainerDimensions({
          height: event.nativeEvent.layout.height,
          width: event.nativeEvent.layout.width,
        });
      }}
    >
      {useGradients ? (
        <Animated.View
          style={[combinedIndicatorStyle, { backgroundColor: "transparent" }]}
        >
          <LinearGradient
            key={JSON.stringify(containerDimensions)}
            style={{
              width: "100%",
              height: containerDimensions.height - innerPadding * 2,
              borderRadius: 8,
            }}
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
          />
        </Animated.View>
      ) : (
        <Animated.View style={combinedIndicatorStyle} />
      )}

      {options.map((option) => (
        <Tab
          key={option.value}
          labelStyle={labelStyle}
          tabLabelColor={tabLabelColor}
          onChange={onChange}
          tabStyle={tabStyle}
          selectedValue={selectedValue.value}
          option={option}
          activeTabLabelColor={activeTabLabelColor}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e4e4e4",
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
