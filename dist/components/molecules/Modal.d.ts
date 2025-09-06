import React, { PropsWithChildren, SetStateAction } from "react";
import { ModalProps } from "react-native";
interface IModal extends PropsWithChildren, ModalProps {
    isOpen: boolean;
    setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
}
export default function Modal({ isOpen, setIsOpen, children, ...rest }: IModal): React.JSX.Element;
export {};
