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
      activityIndicatorColor="#ff0"
      pendingActionBackgroundColor="#aaa"
      useGradients={true}
      gradientColors={["#ff7e5f", "#feb47b"]}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 1, y: 0 }}
    >
      Click Me
    </Button>
  );
}
```

- `Checkbox`

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
      color="#6200ee"
      checkColor="#fff"
      customCheckIcon={<CheckIcon />}
      containerStyle={{ marginBottom: 16 }}
      boxStyle={{ borderRadius: 6 }}
      labelStyle={{ fontSize: 18, color: "#6200ee" }}
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
      color="#6200ee"
    />
  );
}
```

- `RadioButton`

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
      labelStyle={{ fontSize: 18, color: "#6200ee" }}
      containerStyle={{ marginBottom: 16 }}
      radioContainerStyle={{ width: 24, height: 24 }}
      color="#6200ee"
      customDotSize={12}
    />
  );
}
```

- `Switch`

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
      activeSwitchColor="#6200ee"
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
      activeChipBackgroundColor="#6200ee"
      chipBackgroundColor="#e0e0e0"
      activeChipTextColor="#fff"
      chipTextColor="#333"
    />
  );
}
```

- `Modal`

```tsx

```

- `ProgressBar`

```tsx

```

- `Select`

```tsx

```

- `Tabs`

```tsx

```

### 🔹 Organisms

Complex components composed of atoms and molecules.

- `Accordion`

```tsx

```

- `Carousel`

```tsx

```

- `FlipCard`

```tsx

```

- `PinInput`

```tsx

```

- `Swipeable`

```tsx

```

## 📚 Contributing

Issues and pull requests are welcome!  
Please open an issue first to discuss major changes.

---

Made with ❤️ by **Dhia Ben Hamouda**
