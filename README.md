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

![Button Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/button.gif)

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

![Checkbox Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/checkbox.gif)

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

![Divider Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/divider.png)

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

![Icon Button Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/icon.gif)

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
      useGradients={true}
      gradientColors={["#333", "#000"]}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 1, y: 0 }}
      isDisabled={false}
    />
  );
}
```

- `RadioButton`

![Radio Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/radio.gif)

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

![Switch Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/switch.gif)

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

- `Skeleton`

![Skeleton Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/atoms/skeleton.gif)

```tsx
import React from "react";
import { Skeleton, type SkeletonProps } from "rn-utility-toolkit";

export default function App() {
  return (
    <Skeleton
      width={200}
      height={40}
      borderRadius={12}
      backgroundColor="#e0e0e0"
      highlightColor="#f5f5f5"
      speed={800}
      direction="right"
      enabled={true}
      angle={30}
      shimmerWidth={120}
    />
  );
}
```

### 🔹 Molecules

Groups of atoms combined together.

- `Chip`

![Chip Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/molecules/chip.gif)

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

![Progress Bar Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/molecules/progress.png)

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

![Select Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/molecules/select.gif)

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
      errorMessageStyle={{ fontSize: 16 }}
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

![Tabs Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/molecules/tabs.gif)

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
      containerStyle={{ marginTop: 50 }}
      innerPadding={8}
      labelStyle={{ fontSize: 14, fontWeight: "500" }}
      tabLabelColor="#777"
      activeTabLabelColor="#fff"
      tabStyle={{ paddingVertical: 10 }}
      indicatorStyle={{ backgroundColor: "#333" }}
      useGradients={true}
      gradientColors={["#4c669f", "#3b5998", "#192f6a"]}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 1, y: 0 }}
      animationConfig={{ duration: 250 }}
    />
  );
}
```

- `Picker`

![Picker Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/molecules/picker.gif)

```tsx
import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import { Picker, type PickerItem, type PickerRef } from "rn-utility-toolkit";

export default function App() {
  const countries: PickerItem<string>[] = [
    {
      label: "United States",
      subLabel: "North America",
      value: "US",
      picture: { uri: "https://flagcdn.com/w40/us.png" },
    },
    {
      label: "France",
      subLabel: "Europe",
      value: "FR",
      picture: { uri: "https://flagcdn.com/w40/fr.png" },
    },
    {
      label: "Japan",
      subLabel: "Asia",
      value: "JP",
      picture: { uri: "https://flagcdn.com/w40/jp.png" },
    },
  ];

  const pickerRef = useRef<PickerRef>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<PickerItem<string> | null>(null);

  return (
    <View>
      <Picker
        ref={pickerRef}
        label="Select your country"
        isRequired
        isError={!selectedCountry}
        errorMessage="Country selection is required"
        placeholder="Choose a country"
        placeholderStyle={{ color: "gray", fontStyle: "italic" }}
        containerStyle={{ marginBottom: 20 }}
        inputContainerStyle={{ backgroundColor: "#f9f9f9" }}
        labelStyle={{ fontSize: 16, fontWeight: "600" }}
        arrowColor="blue"
        arrowSize={18}
        arrowContainerStyle={{ marginLeft: 8 }}
        customArrowRotation={180}
        customArrowIcon={<Text style={{ fontSize: 16 }}>▼</Text>}
        isArrowShown
        data={countries}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
          console.log("Selected:", item);
        }}
        onPickerOpened={() => console.log("Picker opened")}
        onPickerClosed={() => console.log("Picker closed")}
        confirmationMethod="button"
        confirmationButtonLabel="Confirm Selection"
        confirmationButtonProps={{
          containerStyle: {
            backgroundColor: "blue",
            borderRadius: 6,
            marginTop: 12,
          },
          textStyle: { color: "white" },
        }}
        bottomSheetListProps={{
          showsVerticalScrollIndicator: false,
        }}
        bottomSheetModalProps={{
          enablePanDownToClose: true,
        }}
        shouldCloseOnSelection={true}
        selectedItemBorderColor="blue"
        itemBorderColor="lightgray"
        sheetHeader={
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Available Countries
          </Text>
        }
        sheetListStyle={{ paddingBottom: 40 }}
        itemStyle={{
          labelStyle: { fontSize: 14, fontWeight: "600" },
          subLabelStyle: { fontSize: 12, color: "gray" },
          radioStyle: { activeColor: "blue" },
          containerStyle: { backgroundColor: "#fafafa" },
        }}
      />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button onPress={() => pickerRef.current?.open()}>Open Picker</Button>
        <Button onPress={() => pickerRef.current?.close()}>Close Picker</Button>
      </View>
    </View>
  );
}
```

### 🔹 Organisms

Complex components composed of atoms and molecules.

- `Accordion`

![Accordion Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/accordion.gif)

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

![Carousel Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/carousel.gif)

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

![Flip Card Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/flipcard.gif)

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

![PinInput Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/pin.gif)

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

![Swipeable Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/swipeable.gif)

```tsx
import React from "react";
import { Text, View } from "react-native";
import Swipeable from "rn-utility-toolkit";
import { StarIcon } from "./icons";

export default function App() {
  return (
    <Swipeable
      containerStyle={{
        backgroundColor: "#fff",
      }}
      actionContainerStyle={{
        paddingHorizontal: 4,
      }}
      actions={[
        {
          icon: <StarIcon />,
          onPress: () => console.log("Star pressed"),
          containerStyle: { borderRadius: 50, padding: 10 },
          isOutlined: true,
          customHitSlop: 12,
          color: "#fff",
          useGradients: true,
          gradientColors: ["#ff4d4d", "#cc0000"],
          gradientStart: { x: 0, y: 0 },
          gradientEnd: { x: 1, y: 1 },
          isDisabled: false,
        },
      ]}
    >
      <View>
        <Text>Swipe me left to reveal action with all props</Text>
      </View>
    </Swipeable>
  );
}
```

- `Range Slider`

![Slider Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/slider.gif)

```tsx
import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  RangeSlider,
  type RangeSliderProps,
  type SingleSliderProps,
} from "rn-utility-toolkit";

export default function App() {
  const [singleValue, setSingleValue] = useState(10000);
  const [rangeValue, setRangeValue] = useState([5000, 30000]);

  return (
    <View>
      <RangeSlider
        value={singleValue}
        onChange={(val) => setSingleValue(val)}
        color="#333"
        min={0}
        max={50000}
        step={500}
        unit="USD"
        sliderWidth={320}
        thumbStyle={{
          backgroundColor: "white",
          borderWidth: 2,
        }}
        trackStyle={{ backgroundColor: "#eee" }}
        progressStyle={{ backgroundColor: "#333" }}
      />
      <RangeSlider
        isRange
        value={rangeValue}
        onChange={(val) => setRangeValue(val)}
        color="#333"
        min={0}
        max={50000}
        step={1000}
        unit="TND"
        sliderWidth={320}
        thumbStyle={{
          backgroundColor: "white",
          borderWidth: 2,
        }}
        trackStyle={{ backgroundColor: "#ddd" }}
        progressStyle={{ backgroundColor: "#333" }}
      />
    </View>
  );
}
```

- `Date Picker`

![Date Picker Preview](https://github.com/Dhia-Ben-Hamouda/rn-utility-toolkit/blob/main/src/assets/organisms/date.gif)

```tsx
import React, { useRef, useState } from "react";
import { View, } from "react-native";
import { 
  DatePicker, 
  type DatePickerRef, 
  type DatePickerBaseProps, 
  type SingleDatePickerProps,
  type RanngeDatePickerProps,
  type DateRangeValue
} from "rn-utility-toolkit";

export default function App() {
  const singleRef = useRef<DatePickerRef | null>(null);
  const rangeRef = useRef<DatePickerRef | null>(null);
  const [singleValue, setSingleValue] = useState<Date | null>(new Date());
  const [rangeValue, setRangeValue] = useState<DateRangeValue>([new Date(), null]);

  return (
    <View>
      <DatePicker
        mode="range"
        value={rangeValue}
        onChange={(range) => setRangeValue(range)}
      />
      <DatePicker
        ref={singleRef}
        mode="single"
        value={singleValue}
        onChange={(d) => setSingleValue(d)}
        label="Birthdate"
        labelStyle={{ color: "#333", fontSize: 14, fontWeight: "600" }}
        containerStyle={{ width: "95%", alignSelf: "center", marginTop: 12 }}
        inputContainerStyle={{ padding: 14, borderRadius: 10 }}
        placeholder="DD/MM/YYYY"
        placeholderStyle={{ color: "#9AA0A6" }}
        isArrowShown={true}
        arrowColor="#ff6a00"
        arrowSize={18}
        arrowContainerStyle={{ paddingHorizontal: 6, paddingVertical: 2 }}
        customArrowIcon={<Text style={{ fontSize: 12 }}>▼</Text>}
        customArrowRotation={180}
        isRequired={true}
        isError={false}
        errorMessage="Please select a valid date"
        errorMessageStyle={{ color: "crimson", fontSize: 12 }}
        onDatePickerOpened={() => console.log("single opened")}
        onDatePickerClosed={() => console.log("single closed")}
        bottomSheetModalProps={{ snapPoints: ["55%"], enablePanDownToClose: true }}
        cancelButtonProps={{
          isOutlined: true,
          textStyle: { fontWeight: "700" },
          containerStyle: { borderWidth: 1, paddingVertical: 12 },
        }}
        chooseDateButtonProps={{
          textStyle: { fontWeight: "700" },
          containerStyle: { paddingVertical: 12 },
        }}
        chooseYearButtonProps={{
          textStyle: { fontWeight: "700" },
          containerStyle: { paddingVertical: 12 },
        }}
        chooseMonthButtonProps={{
          textStyle: { fontWeight: "700" },
          containerStyle: { paddingVertical: 12 },
        }}
        cancelButtonText="Cancel"
        chooseDateButtonText="Choose date"
        chooseYearButtonText="Choose year"
        chooseMonthButtonText="Choose month"
        activeDateBackgroundColor="#0A84FF"
        activeDateTextColor="#FFFFFF"
        dateBackgroundColor="transparent"
        dateTextColor="#111"
        farDateTextColor="rgba(0,0,0,0.25)"
        farDateBackgroundColor="transparent"
        rangeDateBackgroundColor="rgba(10,132,255,0.12)"
        disabledDateTextColor="#ccc"
        customHeader={<></>}
        customFooter={<></>}
        showInput={true}
        showFarDates={true}
        minDate={new Date("2025-10-01")}
        maxDate={new Date("2025-06-01")}
      />
    </View>
  );
}
```

## 📚 Contributing

Issues and pull requests are welcome!  
Please open an issue first to discuss major changes.

---

Made with ❤️ by **Dhia Ben Hamouda**
