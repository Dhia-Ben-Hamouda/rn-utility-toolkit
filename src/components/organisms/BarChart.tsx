import { Divider, Switch } from "../atoms";
import {
  formatAmountByCurrency,
  generateShadow,
  hexToRgba,
  Languages,
  SCREEN_WIDTH,
} from "../../utils";
import React, {
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Pressable, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const BAR_EXPANSION_DURATION = 400;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface IChartCategory {
  name: string;
  color: string;
}

export interface IBar {
  id: number;
  firstCategoryValue: number;
  secondCategoryValue: number;
  date: Date;
}

function Bar({
  id,
  firstCategoryValue,
  secondCategoryValue,
  biggestChartValue,
  selectedBarId,
  setSelectedBarId,
  isFirstCategorySwitchOpen,
  isSecondCategorySwitchOpen,
  categories,
  date,
  language,
}: IBar & {
  biggestChartValue: number;
  selectedBarId: number | null;
  setSelectedBarId: React.Dispatch<SetStateAction<number | null>>;
  isFirstCategorySwitchOpen: boolean;
  isSecondCategorySwitchOpen: boolean;
  categories: IChartCategory[];
  language: Languages;
}) {
  const firstCategoryHeight = useSharedValue(0);
  const secondCategoryHeight = useSharedValue(0);
  const isSelected = useSharedValue(0);

  useEffect(() => {
    if (isFirstCategorySwitchOpen) {
      firstCategoryHeight.value = withTiming(
        (firstCategoryValue / biggestChartValue) * 100,
        {
          duration: BAR_EXPANSION_DURATION,
        }
      );
    } else {
      firstCategoryHeight.value = withTiming(0, {
        duration: BAR_EXPANSION_DURATION,
      });
    }
  }, [isFirstCategorySwitchOpen]);

  useEffect(() => {
    if (isSecondCategorySwitchOpen) {
      secondCategoryHeight.value = withTiming(
        (secondCategoryValue / biggestChartValue) * 100,
        {
          duration: BAR_EXPANSION_DURATION,
        }
      );
    } else {
      secondCategoryHeight.value = withTiming(0, {
        duration: BAR_EXPANSION_DURATION,
      });
    }
  }, [isSecondCategorySwitchOpen]);

  useEffect(() => {
    if (firstCategoryValue) {
      firstCategoryHeight.value = withTiming(
        (firstCategoryValue / biggestChartValue) * 100,
        {
          duration: BAR_EXPANSION_DURATION,
        }
      );
    }
  }, [firstCategoryValue]);

  useEffect(() => {
    if (secondCategoryValue) {
      secondCategoryHeight.value = withTiming(
        (secondCategoryValue / biggestChartValue) * 100,
        {
          duration: BAR_EXPANSION_DURATION,
        }
      );
    }
  }, [secondCategoryValue]);

  const animatedFirstCategoryBarStyle = useAnimatedStyle(() => {
    return {
      height: `${firstCategoryHeight.value}%`,
    };
  });

  const animatedSecondCategoryBarStyle = useAnimatedStyle(() => {
    return {
      height: `${secondCategoryHeight.value}%`,
    };
  });

  useEffect(() => {
    isSelected.value = withTiming(selectedBarId === id ? 1 : 0, {
      duration: BAR_EXPANSION_DURATION,
    });
  }, [selectedBarId]);

  const defaultSelectedBarColor = hexToRgba("darkgreen", 0.1);
  const selectedBarColor = hexToRgba(categories[0]?.color ?? "darkgreen", 0.1);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isSelected.value,
      [0, 1],
      ["transparent", categories ? selectedBarColor : defaultSelectedBarColor]
    );

    const padding = interpolate(isSelected.value, [0, 1], [0, 12]);

    const paddingBottom = interpolate(isSelected.value, [0, 1], [0, 20]);

    return {
      backgroundColor,
      padding,
      paddingBottom,
    };
  });

  const animatedDotStyle = useAnimatedStyle(() => {
    const dimension = interpolate(isSelected.value, [0, 1], [0, 18]);

    const opacity = interpolate(isSelected.value, [0, 1], [0, 1]);

    return {
      height: dimension,
      width: dimension,
      opacity,
    };
  });

  const animatedPopoverStyle = useAnimatedStyle(() => {
    const opacity = interpolate(isSelected.value, [0, 1], [0, 1]);

    const scale = interpolate(isSelected.value, [0, 1], [0.5, 1]);

    const adjustedLeft = id * 40 > SCREEN_WIDTH - 200 ? -130 : 20;

    return {
      scale,
      opacity,
      zIndex: 99999,
      left: adjustedLeft,
    };
  });

  const locale: Record<Languages, string> = {
    [Languages.EN]: "en-GB",
    [Languages.FR]: "fr-FR",
    [Languages.AR]: "ar-AR",
  };

  return (
    <View>
      <AnimatedPressable
        style={[
          {
            alignItems: "center",
            gap: 12,
            flex: 1,
            borderRadius: 7,
            overflow: "visible",
          },
          animatedContainerStyle,
        ]}
        onPress={() => {
          setSelectedBarId(id);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 4,
            flex: 1,
          }}
        >
          <Animated.View
            style={[
              {
                backgroundColor: "lightgreen",
                width: 8,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              },
              { backgroundColor: categories[0]?.color },
              animatedFirstCategoryBarStyle,
            ]}
          />
          <Animated.View
            style={[
              {
                backgroundColor: "yellow",
                width: 8,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              },
              { backgroundColor: categories[1]?.color },
              animatedSecondCategoryBarStyle,
            ]}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {new Intl.DateTimeFormat(locale[language], { weekday: "short" })
            .format(date)
            ?.replace(".", "")}
        </Text>
      </AnimatedPressable>
      <Animated.View
        style={[
          {
            backgroundColor: "lightgreen",
            borderRadius: 50,
            borderColor: "white",
            left: "50%",
            borderWidth: 4,
          },
          { backgroundColor: categories[0]?.color },
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
        ]}
      />
      <Animated.View
        style={[
          generateShadow(),
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
        ]}
      >
        <Text
          style={{
            fontSize: 11,
          }}
        >
          {date?.toLocaleDateString(locale[language], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Divider dividerStyle={{ height: 1, marginVertical: 8 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View
              style={[
                {
                  height: 8,
                  width: 8,
                  backgroundColor: "lightgreen",
                  borderRadius: 50,
                },
                { backgroundColor: categories[0]?.color },
              ]}
            />
            <Text style={{ fontSize: 12 }}>{categories[0]?.name}</Text>
          </View>
          <Text style={{ fontSize: 12 }}>
            {formatAmountByCurrency(firstCategoryValue, "TND")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View
              style={[
                {
                  height: 8,
                  width: 8,
                  backgroundColor: "yellow",
                  borderRadius: 50,
                },
                { backgroundColor: categories[1]?.color },
              ]}
            />
            <Text style={{ fontSize: 12 }}>{categories[1]?.name}</Text>
          </View>
          <Text style={{ fontSize: 12 }}>
            {formatAmountByCurrency(secondCategoryValue, "TND")}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

export interface IBarChartRef {
  removeSelectedBarId: () => void;
}

interface IBarChart {
  categories: IChartCategory[];
  data: IBar[];
  language?: Languages;
}

export default React.forwardRef(
  ({ categories, data, language = Languages.EN }: IBarChart, ref) => {
    const [selectedBarId, setSelectedBarId] = useState<number | null>(null);
    const [isFirstCategorySwitchOpen, setIsFirstCategorySwitchOpen] =
      useState(true);
    const [isSecondCategorySwitchOpen, setIsSecondCategorySwitchOpen] =
      useState(true);

    const biggestChartValue = useMemo(() => {
      const barValues = data?.flatMap((bar) => [
        bar?.firstCategoryValue,
        bar?.secondCategoryValue,
      ]);

      return barValues?.reduce((acc, curr) => {
        return acc > curr ? acc : curr;
      });
    }, [data]);

    useImperativeHandle(ref, () => ({
      removeSelectedBarId: () => {
        setSelectedBarId(null);
      },
    }));

    return (
      <Pressable
        onPress={() => {
          setSelectedBarId(null);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 24,
            marginTop: 16,
            marginBottom: 36,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Switch
              thumbStyle={{ width: 14, height: 14 }}
              customThumbTranslation={20}
              containerStyle={{
                width: 42,
              }}
              activeSwitchColor={categories[0]?.color ?? "lightgreen"}
              value={isFirstCategorySwitchOpen}
              onChange={setIsFirstCategorySwitchOpen}
            />
            <Text>{categories[0]?.name}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Switch
              thumbStyle={{ height: 14, width: 14 }}
              customThumbTranslation={20}
              containerStyle={{ width: 42 }}
              activeSwitchColor={categories[1]?.color ?? "yellow"}
              value={isSecondCategorySwitchOpen}
              onChange={setIsSecondCategorySwitchOpen}
            />
            <Text>{categories[1]?.name}</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 8,
            gap: 20,
            alignItems: "flex-end",
            height: 200,
          }}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
        >
          {data?.map((item) => (
            <Bar
              key={item?.id}
              language={language}
              categories={categories}
              biggestChartValue={biggestChartValue}
              selectedBarId={selectedBarId}
              setSelectedBarId={setSelectedBarId}
              isFirstCategorySwitchOpen={isFirstCategorySwitchOpen}
              isSecondCategorySwitchOpen={isSecondCategorySwitchOpen}
              {...item}
            />
          ))}
        </ScrollView>
      </Pressable>
    );
  }
);
