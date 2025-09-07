import React, { PropsWithChildren, SetStateAction } from "react";
import {
  Modal as NativeModal,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";

interface IModal extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  overlayStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Modal({
  isOpen,
  setIsOpen,
  containerStyle,
  overlayStyle,
  children,
}: IModal) {
  return (
    <>
      <NativeModal transparent animationType="fade" visible={isOpen}>
        <Pressable
          onPress={() => {
            if (Platform.OS === "android") {
              setIsOpen && setIsOpen(false);
            }
          }}
        >
          <Pressable
            onPress={() => {
              if (Platform.OS === "ios") {
                setIsOpen && setIsOpen(false);
              }
            }}
            style={[styles.overlay, overlayStyle]}
          >
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
              }}
              style={[styles.container, containerStyle]}
            >
              {children}
            </Pressable>
          </Pressable>
        </Pressable>
      </NativeModal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    width: 300,
    minHeight: 200,
    borderRadius: 7,
  },
});
