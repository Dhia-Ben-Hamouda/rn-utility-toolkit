import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { isIos } from "../../utils";

const DEFAULT_CURRENCY = "TND";

interface ICurrencyField extends Omit<TextInputProps, "value" | "onChange"> {
  value: string;
  onChange: (newValue: string) => void;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  startIcon?: React.ReactNode;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  currency?: string;
  currencyStyle?: StyleProp<TextStyle>;
}

export default function CurrencyField({
  value,
  onChange,
  containerStyle,
  inputContainerStyle,
  labelStyle,
  isRequired = false,
  startIcon,
  isError,
  errorMessage,
  label,
  currency = DEFAULT_CURRENCY,
  currencyStyle,
  ...rest
}: ICurrencyField) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text style={styles.star}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          isError && { borderColor: "red" },
        ]}
      >
        {startIcon && (
          <View style={styles.startIconContainer}>{startIcon}</View>
        )}
        <TextInput
          style={[styles.input]}
          keyboardType="number-pad"
          value={formatWithSpaces(value)}
          onChangeText={(text) => {
            let cleaned = text.replace(/[^0-9.,]/g, "");
            cleaned = cleaned.replace(/,/g, ".");

            const parts = cleaned.split(".");
            if (parts.length > 2) {
              cleaned = parts[0] + "." + parts.slice(1).join("");
            }

            if (parts[1]?.length > 2) {
              cleaned = parts[0] + "." + parts[1].slice(0, 2);
            }

            onChange && onChange(cleaned);
          }}
          {...rest}
        />
        <Text style={[styles.currency, currencyStyle]}>{currency}</Text>
      </View>
      {isError && <Text style={[styles.error]}>{errorMessage}</Text>}
    </View>
  );
}

const formatWithSpaces = (value: string | number) => {
  if (!value) {
    return "";
  }

  const str = String(value);

  // split by first . or ,
  const parts = str.split(/[.,]/);
  let integerPart = parts[0].replace(/\D/g, "");
  let decimalPart =
    parts[1] !== undefined ? parts[1].replace(/\D/g, "") : undefined;

  // format integer part with spaces
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // explicitly handle if user typed ending . or ,
  if (decimalPart !== undefined) {
    return `${integerPart}.${decimalPart}`;
  } else if (/[.,]$/.test(str)) {
    return `${integerPart}.`;
  } else {
    return integerPart;
  }
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  inputContainer: {
    borderRadius: 8,
    padding: isIos ? 16 : 12,
    paddingVertical: isIos ? 16 : 4,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.25)",
  },
  label: {},
  error: {
    color: "red",
    fontSize: 12,
    marginStart: 8,
  },
  startIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    color: "red",
  },
  currency: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
});
