import React, { PropsWithChildren, SetStateAction } from "react";
import {
  ModalProps,
  Modal as NativeModal,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";

interface IModal extends PropsWithChildren, ModalProps {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  isOpen,
  setIsOpen,
  children,
  ...rest
}: IModal) {
  return (
    <>
      <NativeModal transparent animationType="fade" visible={isOpen} {...rest}>
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
            style={styles.overlay}
          >
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
              }}
              style={styles.container}
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
