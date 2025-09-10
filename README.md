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

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "rn-utility-toolkit";
import { HomeIcon } from "./icons";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Example with all props */}
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
        activityIndicatorColor="#ff0"
        pendingActionBackgroundColor="#aaa"
        useGradients={true}
        gradientColors={["#ff7e5f", "#feb47b"]}
        gradientStart={{ x: 0, y: 0 }}
        gradientEnd={{ x: 1, y: 0 }}
      >
        Click Me
      </Button>

      {/* Outlined button example */}
      <Button isOutlined onPress={() => console.log("Outlined Button pressed")}>
        Outlined
      </Button>

      {/* Loading state example */}
      <Button isLoading activityIndicatorColor="#0f0" onPress={() => {}}>
        Loading...
      </Button>

      {/* Disabled example */}
      <Button isDisabled onPress={() => {}}>
        Disabled
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
```

- `Checkbox`

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "rn-utility-toolkit";
import { CheckIcon } from "./icons";

export default function App() {
  const [checked, setChecked] = useState(false);
  const [customChecked, setCustomChecked] = useState(true);

  return (
    <View style={styles.container}>
      {/* Example with all props */}
      <Checkbox
        isChecked={checked}
        onChange={(value) => setChecked(value)}
        size={28}
        label="Accept Terms & Conditions"
        color="#6200ee"
        checkColor="#fff"
        customCheckIcon={<CheckIcon />}
        containerStyle={{ marginBottom: 16 }}
        boxStyle={{ borderRadius: 6 }}
        labelStyle={{ fontSize: 18, color: "#6200ee" }}
      />

      {/* Default usage */}
      <Checkbox
        isChecked={customChecked}
        onChange={setCustomChecked}
        label="Default Checkbox"
      />

      {/* Small checkbox without label */}
      <Checkbox isChecked={false} onChange={() => {}} size={16} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
```

- `Divider`

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Divider from "rn-utility-toolkit";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Default divider */}
      <Divider />

      {/* Custom styled divider */}
      <Divider
        dividerStyle={{
          backgroundColor: "#6200ee",
          height: 4,
          marginVertical: 16,
          borderRadius: 2,
        }}
      />

      {/* Thin, light divider */}
      <Divider
        dividerStyle={{
          backgroundColor: "#ccc",
          height: 1,
          marginTop: 8,
          marginBottom: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
```

- `IconButton`

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "rn-utility-toolkit";
import { StarIcon } from "./icons";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Default icon button */}
      <IconButton
        icon={<StarIcon />}
        onPress={() => console.log("Default Icon Button pressed")}
      />

      {/* Custom color */}
      <IconButton
        icon={<StarIcon />}
        color="#6200ee"
        onPress={() => console.log("Purple button pressed")}
        containerStyle={{ marginTop: 16 }}
      />

      {/* Outlined style */}
      <IconButton
        icon={<StarIcon />}
        isOutlined
        color="#6200ee"
        onPress={() => console.log("Outlined button pressed")}
        containerStyle={{ marginTop: 16 }}
      />

      {/* Custom size and hitSlop */}
      <IconButton
        icon={<StarIcon />}
        color="green"
        customHitSlop={20}
        containerStyle={{
          width: 60,
          height: 60,
          borderRadius: 30,
          marginTop: 16,
        }}
        onPress={() => console.log("Large button pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
```

- `RadioButton`

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RadioButton from "rn-utility-toolkit";

export default function App() {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <View style={styles.container}>
      {/* Example with all props */}
      <RadioButton
        label="Option 1"
        value="option1"
        activeValue={selectedValue}
        onChange={(val) => setSelectedValue(val)}
        labelStyle={{ fontSize: 18, color: "#6200ee" }}
        containerStyle={{ marginBottom: 16 }}
        radioContainerStyle={{ width: 24, height: 24 }}
        color="#6200ee"
        customDotSize={12}
      />

      <RadioButton
        label="Option 2"
        value="option2"
        activeValue={selectedValue}
        onChange={(val) => setSelectedValue(val)}
        color="green"
        customDotSize={8}
      />

      <RadioButton
        label="Option 3"
        value="option3"
        activeValue={selectedValue}
        onChange={(val) => setSelectedValue(val)}
        color="red"
        customDotSize={14}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
```

- `Switch`

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Switch from "rn-utility-toolkit";

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDisabledSwitch, setIsDisabledSwitch] = useState(true);

  return (
    <View style={styles.container}>
      {/* Example with all props */}
      <Switch
        value={isEnabled}
        onChange={(val) => setIsEnabled(val)}
        containerStyle={{ width: 60, height: 30, padding: 5 }}
        thumbStyle={{ width: 20, height: 20, backgroundColor: "#fff" }}
        customThumbTranslation={28}
        activeSwitchColor="#6200ee"
        inactiveSwitchColor="#bbb"
        isDisabled={false}
        disabledSwitchColor="#999"
      />

      {/* Default usage */}
      <Switch value={isEnabled} onChange={setIsEnabled} />

      {/* Custom colors */}
      <Switch
        value={isEnabled}
        onChange={setIsEnabled}
        activeSwitchColor="green"
        inactiveSwitchColor="red"
        containerStyle={{ marginTop: 20 }}
      />

      {/* Disabled switch */}
      <Switch
        value={isDisabledSwitch}
        onChange={setIsDisabledSwitch}
        isDisabled
        disabledSwitchColor="#666"
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
    gap: 20,
  },
});
```

### 🔹 Molecules

Groups of atoms combined together.

- `Chip`
- `Modal`
- `ProgressBar`
- `Select`
- `Tabs`

### 🔹 Organisms

Complex components composed of atoms and molecules.

- `Accordion`
- `Carousel`
- `FlipCard`
- `PinInput`
- `Swipeable`

## 📚 Contributing

Issues and pull requests are welcome!  
Please open an issue first to discuss major changes.

---

Made with ❤️ by **Dhia Ben Hamouda**
