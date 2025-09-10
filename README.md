# React Native Utility Toolkit

A lightweight React Native utility toolkit with reusable **components**, **hooks**, and **helper functions** for faster development.

## 📦 Installation

```bash
npm install rn-utility-toolkit
# or
yarn add rn-utility-toolkit
```

Then install the required peer dependencies:

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-svg react-native-linear-gradient @react-native-masked-view/masked-view
# or
yarn add react-native-reanimated react-native-gesture-handler react-native-svg react-native-linear-gradient @react-native-masked-view/masked-view
```

## 🚀 Components

The library is organized following the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology:

### 🔹 Atoms

Small, reusable building blocks of the UI.

- `Button`

![Button Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/button.gif)

```tsx
import React from "react";
import { Button, type ButtonProps } from "rn-utility-toolkit";
import { HomeIcon } from "./icons";

export default function App() {
  return (
    <Button
      containerStyle={{ margin: 10 }}
      gradientWrapperStyle={{ marginVertical: 10 }}
      textStyle={{ fontSize: 18, fontWeight: "bold" }}
      isDisabled={false}
      isLoading={false}
      startIcon={<HomeIcon />}
      endIcon={<HomeIcon />}
      onPress={() => console.log("Button pressed")}
      isOutlined={false}
      activityIndicatorColor="#fff"
      pendingActionBackgroundColor="#aaa"
      useGradients={true}
      gradientColors={["#333", "#000"]}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 1, y: 0 }}
    >
      Click Me
    </Button>
  );
}
```

- `Checkbox`

![Checkbox Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/checkbox.gif)

```tsx
import React, { useState } from "react";
import { Checkbox, type CheckboxProps } from "rn-utility-toolkit";
import { CheckIcon } from "./icons";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      isChecked={checked}
      onChange={(value) => setChecked(value)}
      size={28}
      label="Accept Terms & Conditions"
      color="#333"
      checkColor="#fff"
      customCheckIcon={<CheckIcon />}
      containerStyle={{ marginBottom: 16 }}
      boxStyle={{ borderRadius: 6 }}
      labelStyle={{ fontSize: 18, color: "#333" }}
    />
  );
}
```

- `Divider`

```tsx
import React from "react";
import { Divider, type DividerProps } from "rn-utility-toolkit";

export default function App() {
  return (
    <Divider
      dividerStyle={{
        backgroundColor: "#ccc",
        height: 1,
        marginTop: 8,
        marginBottom: 8,
      }}
    />
  );
}
```

- `IconButton`

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, type IconButtonProps } from "rn-utility-toolkit";
import { StarIcon } from "./icons";

export default function App() {
  return (
    <IconButton
      icon={<StarIcon />}
      onPress={() => console.log("Icon button pressed")}
      containerStyle={{ margin: 10 }}
      customHitSlop={20}
      isOutlined={true}
      color="#333"
    />
  );
}
```

- `RadioButton`

![Radio Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/radio.gif)

```tsx
import React, { useState } from "react";
import { RadioButton, type RadioButtonProps } from "rn-utility-toolkit";

export default function App() {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <RadioButton
      label="Option 1"
      value="option1"
      activeValue={selectedValue}
      onChange={(val) => setSelectedValue(val)}
      labelStyle={{ fontSize: 18, color: "#333" }}
      containerStyle={{ marginBottom: 16 }}
      radioContainerStyle={{ width: 24, height: 24 }}
      color="#333"
      customDotSize={12}
    />
  );
}
```

- `Switch`

![Switch Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/switch.gif)

```tsx
import React, { useState } from "react";
import { Switch, type SwitchProps } from "rn-utility-toolkit";

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDisabledSwitch, setIsDisabledSwitch] = useState(true);

  return (
    <Switch
      value={isEnabled}
      onChange={(val) => setIsEnabled(val)}
      containerStyle={{ width: 60, height: 30, padding: 5 }}
      thumbStyle={{ width: 20, height: 20, backgroundColor: "#fff" }}
      customThumbTranslation={28}
      activeSwitchColor="#333"
      inactiveSwitchColor="#bbb"
      isDisabled={false}
      disabledSwitchColor="#999"
    />
  );
}
```

### 🔹 Molecules

Groups of atoms combined together.

- `Chip`

```tsx
import React, { useState } from "react";
import { Chip, type ChipProps } from "rn-utility-toolkit";

export default function App() {
  const [activeChip, setActiveChip] = useState("Chip 1");

  return (
    <Chip
      value="Chip 1"
      activeValue={activeChip}
      onChipPress={(val) => setActiveChip(val)}
      containerStyle={{ margin: 8 }}
      labelStyle={{ fontSize: 16, fontWeight: "600" }}
      startPicture={{ uri: "https://via.placeholder.com/16" }}
      activeChipBackgroundColor="#333"
      chipBackgroundColor="#e0e0e0"
      activeChipTextColor="#fff"
      chipTextColor="#333"
    />
  );
}
```

- `Modal`

```tsx
import React, { useState } from "react";
import { Text } from "react-native";
import { Modal } from "rn-utility-toolkit";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      containerStyle={{ width: 350, minHeight: 250, borderRadius: 12 }}
    >
      <Text>This is the modal content!</Text>
    </Modal>
  );
}
```

- `ProgressBar`

```tsx
import React, { useState } from "react";
import { ProgressBar } from "rn-utility-toolkit";

export default function App() {
  const [progress, setProgress] = useState(30);

  return (
    <ProgressBar
      progress={progress}
      containerStyle={{ marginTop: 20, height: 12, borderRadius: 6 }}
      barStyle={{ backgroundColor: "#333" }}
    />
  );
}
```

- `Select`

![Select Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/select.gif)

```tsx
import React, { useState } from "react";
import { Select, type SelectProps, type SelectItem } from "rn-utility-toolkit";

export default function App() {
  const [selectedItem, setSelectedItem] = useState<SelectItem<number> | null>(
    null
  );

  return (
    <Select
      label="Choose an option"
      placeholder="Select an item"
      isRequired={true}
      isError={false}
      errorMessage="This field is required"
      containerStyle={{ marginVertical: 10 }}
      inputContainerStyle={{ backgroundColor: "#f9f9f9" }}
      labelStyle={{ fontSize: 14, color: "#555" }}
      placeholderStyle={{ color: "#999" }}
      arrowContainerStyle={{ marginLeft: 8 }}
      arrowColor="#333"
      arrowSize={16}
      customArrowIcon={undefined}
      customArrowRotation={-180}
      data={[
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
      ]}
      value={selectedItem}
      onChange={(item) => setSelectedItem(item)}
      shouldCloseAfterSelection={true}
      isArrowShown={true}
      itemBackgroundColor="#fff"
      selectedItemBackgroundColor="#eee"
      itemLabelColor="#333"
      selectedItemLabelColor="#333"
      itemLabelStyle={{ fontSize: 14 }}
      selectedItemLabelStyle={{ fontWeight: "bold" }}
      checkColor="#333"
      checkSize={16}
      dropdownItemStyle={{ paddingVertical: 12 }}
      onSelectOpened={() => console.log("Dropdown opened")}
      onSelectClosed={() => console.log("Dropdown closed")}
    />
  );
}
```

- `Tabs`

![Tabs Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/tabs.gif)

```tsx
import React, { useState } from "react";
import { Tabs, type TabsProps, type TabOption } from "rn-utility-toolkit";

export default function App() {
  const tabOptions: TabOption[] = [
    { label: "Home", value: "home" },
    { label: "Profile", value: "profile" },
    { label: "Settings", value: "settings" },
  ];

  const [selectedTab, setSelectedTab] = useState<TabOption>(tabOptions[0]);

  return (
    <Tabs
      options={tabOptions}
      selectedValue={selectedTab}
      onChange={(newTab) => setSelectedTab(newTab)}
      containerStyle={{ marginHorizontal: 16, marginTop: 50 }}
      tabLabelColor="#555"
      activeTabLabelColor="#fff"
      indicatorStyle={{ backgroundColor: "#333" }}
      useGradients={true}
      gradientColors={["#4c669f", "#3b5998", "#192f6a"]}
      innerPadding={4}
    />
  );
}
```

### 🔹 Organisms

Complex components composed of atoms and molecules.

- `Accordion`

```tsx
import React from "react";
import { Text } from "react-native";
import { Accordion, type AccordionProps } from "rn-utility-toolkit";

export default function App() {
  return (
    <Accordion
      title="Full Props Accordion"
      isDefaultExpanded={true}
      expansionDuration={600}
      arrowColor="#333"
      arrowSize={16}
      customArrowIcon={<Text style={{ fontSize: 18 }}>▼</Text>}
      customArrowRotationAngle={-90}
      isArrowShown={true}
      isTitleShown={true}
      headerStyle={{ backgroundColor: "#333", paddingVertical: 16 }}
      titleStyle={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}
      containerStyle={{
        marginBottom: 20,
      }}
      contentContainerStyle={{
        padding: 16,
        backgroundColor: "#e8f5e9",
      }}
      onAccordionOpened={(height) =>
        console.log("Accordion opened, content height:", height)
      }
      onAccordionClosed={(height) =>
        console.log("Accordion closed, content height:", height)
      }
    >
      <Text>This is the accordion's content</Text>
    </Accordion>
  );
}
```

- `Carousel`

```tsx
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Carousel, SCREEN_WIDTH, type CarouselProps } from "rn-utility-toolkit";

const data = [
  { id: "1", title: "Slide 1" },
  { id: "2", title: "Slide 2" },
  { id: "3", title: "Slide 3" },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Carousel
      data={data}
      renderItem={({ item, index, offset }) => (
        <View
          style={
            { backgroundColor: item.color, width: SCREEN_WIDTH - 32 },
          }
        >
          <Text>{item.title}</Text>
        </View>
      )}
      containerStyle={{ paddingHorizontal: 16 }}
      dotsContainerStyle={{ marginVertical: 12 }}
      dotStyle={{ borderRadius: 4 }}
      showDots={true}
      activeDotColor="#000"
      dotColor="#ccc"
      activeDotWidth={24}
      dotWidth={12}
      dotOffsetMultiplier={SCREEN_WIDTH}
      onChange={(index) => setCurrentIndex(index)}
    />
  );
}
```

- `FlipCard`

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlipCard, type FlipCardProps } from "rn-utility-toolkit";

export default function App() {
  return (
    <FlipCard
      frontCard={
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Front Card</Text>
        </View>
      }
      backCard={
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Back Card</Text>
        </View>
      }
      containerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 230,
  },
  placeholderContainer: {
    backgroundColor: "#333",
    height: "100%",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
});
```

- `PinInput`

![PinInput Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/pin.gif)

```tsx
import React, { useRef, useState } from "react";
import { View, Button } from "react-native";
import {
  PinInput,
  type PinInputRef,
  type PinInputProps,
} from "rn-utility-toolkit";

export default function App() {
  const [pin, setPin] = useState("");
  const pinRef = useRef<PinInputRef>(null);

  return (
    <View>
      <PinInput
        ref={pinRef}
        value={pin}
        onChange={setPin}
        pinLength={6}
        blinkingSpeed={400}
        secureTextEntry={true}
        cursorColor="#333"
        showCursor={true}
        shouldOnlyAcceptNumbers={true}
        containerStyle={{ marginVertical: 20 }}
        pinContainerStyle={{
          backgroundColor: "#f5f5f5",
          borderColor: "#ccc",
        }}
        activePinContainerStyle={{ borderColor: "#333", borderWidth: 2 }}
        pinTextStyle={{ color: "#333", fontSize: 20 }}
        secureDotStyle={{ backgroundColor: "#333" }}
      />
      <View>
        <Button title="Focus" onPress={() => pinRef.current?.focus()} />
        <Button title="Blur" onPress={() => pinRef.current?.blur()} />
      </View>
    </View>
  );
}
```

- `Swipeable`

```tsx
Coming Soon
```

- `DatePicker`

```tsx
Coming Soon
```

- `BarChart`

```tsx
Coming Soon
```

## 📚 Contributing

Issues and pull requests are welcome!  
Please open an issue first to discuss major changes.

---

Made with ❤️ by **Dhia Ben Hamouda**
