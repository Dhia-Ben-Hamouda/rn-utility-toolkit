import React, { ReactNode, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import avatar from "../../assets/molecules/avatar.png";
import Svg, { Path } from "react-native-svg";
import ImagePicker from "react-native-image-crop-picker";

const Pen = (props: any) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.11072 1.63888L7.36101 3.88927L2.4746 8.77589L0.468284 8.99738C0.199697 9.02709 -0.0272303 8.79997 0.00265177 8.53138L0.225888 6.52357L5.11072 1.63888ZM8.75281 1.30384L7.69622 0.247196C7.36664 -0.0823988 6.8321 -0.0823988 6.50252 0.247196L5.5085 1.24126L7.7588 3.49164L8.75281 2.49759C9.0824 2.16781 9.0824 1.63343 8.75281 1.30384Z"
      fill="white"
    />
  </Svg>
);

const DEFAULT_AVATAR_SIZE = 125;

interface IAvatarPickerValue {
  uri: string;
  filename?: string;
  mime?: string;
}

interface IAvatarPicker {
  value: IAvatarPickerValue | null;
  onChange?: (newValue: IAvatarPickerValue) => void;
  size?: number;
  customAvatar?: ImageSourcePropType;
  customEditIcon?: ReactNode;
  avatarStyle?: ImageStyle;
  editContainerStyle?: StyleProp<ViewStyle>;
}

export default function AvatarPicker({
  customEditIcon = <Pen />,
  value,
  onChange = () => {},
  size = DEFAULT_AVATAR_SIZE,
  customAvatar = avatar,
  avatarStyle,
  editContainerStyle,
}: IAvatarPicker) {
  const [currentValue, setCurrentValue] = useState<IAvatarPickerValue | null>(
    null
  );

  const handleUpdate = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 250,
        height: 250,
        cropping: true,
      });

      const newValue = {
        filename: image?.filename as string,
        mime: image?.mime,
        uri: image?.path,
      };

      setCurrentValue(newValue);
      onChange && onChange(newValue);
    } catch (error: any) {
      if (error?.code === "E_PICKER_CANCELLED") {
        return;
      }
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {!currentValue && !value && (
        <Image
          resizeMode="cover"
          style={[
            styles.avatarContainer,
            { width: size, height: size },
            avatarStyle,
          ]}
          source={customAvatar}
        />
      )}
      {currentValue && !value && (
        <Image
          resizeMode="cover"
          style={[
            styles.avatarContainer,
            { width: size, height: size },
            avatarStyle,
          ]}
          source={{ uri: currentValue?.uri }}
        />
      )}
      {!currentValue && value && (
        <Image
          resizeMode="cover"
          style={[
            styles.avatarContainer,
            { width: size, height: size },
            avatarStyle,
          ]}
          source={value}
        />
      )}
      {currentValue && value && (
        <Image
          resizeMode="cover"
          style={[
            styles.avatarContainer,
            { width: size, height: size },
            avatarStyle,
          ]}
          source={value}
        />
      )}
      <TouchableOpacity
        onPress={handleUpdate}
        style={[styles.editContainer, editContainerStyle]}
      >
        {customEditIcon}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  editContainer: {
    backgroundColor: "#555",
    width: 36,
    height: 36,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    right: -13,
    bottom: -13,
    borderWidth: 4,
    borderColor: "white",
  },
  avatarContainer: {
    borderRadius: 16,
  },
});
