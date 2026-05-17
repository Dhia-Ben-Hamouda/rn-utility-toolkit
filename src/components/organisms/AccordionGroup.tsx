import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Accordion, { IAccordion } from "../molecules/Accordion";

interface AccordionGroupItem
  extends Omit<IAccordion, "isExpanded" | "onToggle"> {
  key?: string;
  content: React.ReactNode;
}

interface IAccordionGroup {
  data: AccordionGroupItem[];
  defaultOpenIndex?: number | null;
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  allowMultiple?: boolean;
}

export default function AccordionGroup({
  data,
  defaultOpenIndex = null,
  containerStyle,
  itemContainerStyle,
  separatorStyle,
  titleStyle,
  headerStyle,
  allowMultiple = false,
}: IAccordionGroup) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const isItemOpen = (index: number) => openIndexes?.includes(index);

  const handleToggle = (index: number, nextIsExpanded: boolean) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        nextIsExpanded
          ? [...prev, index]
          : prev.filter((openIndex) => openIndex !== index)
      );
      return;
    }

    setOpenIndexes(nextIsExpanded ? [index] : []);
  };

  return (
    <View style={[styles.groupContainer, containerStyle]}>
      {data?.map((item, index) => {
        const {
          key,
          content,
          containerStyle: accordionContainerStyle,
          headerStyle: accordionHeaderStyle,
          titleStyle: accordionTitleStyle,
          ...accordionProps
        } = item;

        const showSeparator = index < data?.length - 1 && !isItemOpen(index);

        return (
          <View key={key ?? String(index)} style={itemContainerStyle}>
            <Accordion
              {...accordionProps}
              isExpanded={isItemOpen(index)}
              onToggle={(next) => handleToggle(index, next)}
              useOppositeArrowIcons
              containerStyle={[styles.itemContainer, accordionContainerStyle]}
              headerStyle={[styles.header, headerStyle, accordionHeaderStyle]}
              titleStyle={[styles.title, titleStyle, accordionTitleStyle]}
              contentContainerStyle={[
                styles.contentContainer,
                accordionProps.contentContainerStyle,
              ]}
            >
              {content}
            </Accordion>

            {showSeparator ? (
              <View style={[styles.separator, separatorStyle]} />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  itemContainer: {
    borderRadius: 0,
  },
  header: {
    backgroundColor: "#fff",
  },
  title: {
    color: "#3d3d3d",
    fontWeight: "500",
  },
  contentContainer: {
    backgroundColor: "#fff",
  },
  separator: {
    marginHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    borderStyle: "dashed",
  },
});
