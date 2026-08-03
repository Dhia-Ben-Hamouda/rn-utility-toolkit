"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CurrencyField;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const utils_1 = require("../../utils");
const DEFAULT_CURRENCY = "TND";
function CurrencyField(_a) {
    var { value, onChange, containerStyle, inputContainerStyle, labelStyle, isRequired = false, startIcon, isError, errorMessage, label, currency = DEFAULT_CURRENCY, currencyStyle } = _a, rest = __rest(_a, ["value", "onChange", "containerStyle", "inputContainerStyle", "labelStyle", "isRequired", "startIcon", "isError", "errorMessage", "label", "currency", "currencyStyle"]);
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      {label && (<react_native_1.Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <react_native_1.Text style={styles.star}>*</react_native_1.Text>}
        </react_native_1.Text>)}
      <react_native_1.View style={[
            styles.inputContainer,
            inputContainerStyle,
            isError && { borderColor: "red" },
        ]}>
        {startIcon && (<react_native_1.View style={styles.startIconContainer}>{startIcon}</react_native_1.View>)}
        <react_native_1.TextInput style={[styles.input]} keyboardType="number-pad" value={formatWithSpaces(value)} onChangeText={(text) => {
            var _a;
            let cleaned = text.replace(/[^0-9.,]/g, "");
            cleaned = cleaned.replace(/,/g, ".");
            const parts = cleaned.split(".");
            if (parts.length > 2) {
                cleaned = parts[0] + "." + parts.slice(1).join("");
            }
            if (((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.length) > 2) {
                cleaned = parts[0] + "." + parts[1].slice(0, 2);
            }
            onChange && onChange(cleaned);
        }} {...rest}/>
        <react_native_1.Text style={[styles.currency, currencyStyle]}>{currency}</react_native_1.Text>
      </react_native_1.View>
      {isError && <react_native_1.Text style={[styles.error]}>{errorMessage}</react_native_1.Text>}
    </react_native_1.View>);
}
const formatWithSpaces = (value) => {
    if (!value) {
        return "";
    }
    const str = String(value);
    // split by first . or ,
    const parts = str.split(/[.,]/);
    let integerPart = parts[0].replace(/\D/g, "");
    let decimalPart = parts[1] !== undefined ? parts[1].replace(/\D/g, "") : undefined;
    // format integer part with spaces
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // explicitly handle if user typed ending . or ,
    if (decimalPart !== undefined) {
        return `${integerPart}.${decimalPart}`;
    }
    else if (/[.,]$/.test(str)) {
        return `${integerPart}.`;
    }
    else {
        return integerPart;
    }
};
const styles = react_native_1.StyleSheet.create({
    container: {
        gap: 8,
    },
    input: {
        flex: 1,
        height: "100%",
    },
    inputContainer: {
        borderRadius: 8,
        padding: utils_1.isIos ? 16 : 12,
        paddingVertical: utils_1.isIos ? 16 : 4,
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
