"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextField;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const utils_1 = require("../../utils");
const DEFAULT_PASSWORD_ICONS_SIZE = 20;
const DEFAULT_PASSWORD_ICONS_COLOR = "#777";
function EyeIcon({ size = DEFAULT_PASSWORD_ICONS_SIZE, color = DEFAULT_PASSWORD_ICONS_COLOR, }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 576 512">
      <react_native_svg_1.Path fill={color} d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
    </react_native_svg_1.default>);
}
function EyeSlashIcon({ size = DEFAULT_PASSWORD_ICONS_SIZE, color = DEFAULT_PASSWORD_ICONS_COLOR, }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 640 512">
      <react_native_svg_1.Path fill={color} d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/>
    </react_native_svg_1.default>);
}
function TextField(_a) {
    var { value, onChange, containerStyle, inputContainerStyle, labelStyle, isRequired = false, startIcon, endIcon, isError, errorMessage, isPasswordField, label, showPasswordIcon, hidePasswordIcon } = _a, rest = __rest(_a, ["value", "onChange", "containerStyle", "inputContainerStyle", "labelStyle", "isRequired", "startIcon", "endIcon", "isError", "errorMessage", "isPasswordField", "label", "showPasswordIcon", "hidePasswordIcon"]);
    const [isPasswordHidden, setIsPasswordHidden] = (0, react_1.useState)(true);
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      {label && (<react_native_1.Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <react_native_1.Text style={[styles.star]}>*</react_native_1.Text>}{" "}
        </react_native_1.Text>)}
      <react_native_1.View style={[
            styles.inputContainer,
            inputContainerStyle,
            isError && { borderColor: "red" },
        ]}>
        {startIcon && <>{startIcon}</>}
        <react_native_1.TextInput value={value} onChangeText={newValue => {
            onChange && onChange(newValue);
        }} secureTextEntry={isPasswordField && isPasswordHidden} style={[styles.input]} {...rest}/>
        {endIcon && <react_native_1.View style={[styles.startIconContainer]}>{endIcon}</react_native_1.View>}
        {isPasswordField && (<react_native_1.Pressable hitSlop={{ bottom: 50, left: 50, top: 50, right: 50 }} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
            {isPasswordHidden ? (<>{showPasswordIcon !== null && showPasswordIcon !== void 0 ? showPasswordIcon : <EyeIcon color="rgba(0,0,0,.25)"/>}</>) : (<>
                {hidePasswordIcon !== null && hidePasswordIcon !== void 0 ? hidePasswordIcon : <EyeSlashIcon color="rgba(0,0,0,.25)"/>}
              </>)}
          </react_native_1.Pressable>)}
      </react_native_1.View>
      {isError && errorMessage && (<react_native_1.Text style={[styles.error]}>{errorMessage}</react_native_1.Text>)}
    </react_native_1.View>);
}
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
});
