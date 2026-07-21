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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AvatarPicker;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const avatar_png_1 = __importDefault(require("../../assets/molecules/avatar.png"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_image_crop_picker_1 = __importDefault(require("react-native-image-crop-picker"));
const Pen = (props) => (<react_native_svg_1.default width={10} height={10} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <react_native_svg_1.Path d="M5.11072 1.63888L7.36101 3.88927L2.4746 8.77589L0.468284 8.99738C0.199697 9.02709 -0.0272303 8.79997 0.00265177 8.53138L0.225888 6.52357L5.11072 1.63888ZM8.75281 1.30384L7.69622 0.247196C7.36664 -0.0823988 6.8321 -0.0823988 6.50252 0.247196L5.5085 1.24126L7.7588 3.49164L8.75281 2.49759C9.0824 2.16781 9.0824 1.63343 8.75281 1.30384Z" fill="white"/>
  </react_native_svg_1.default>);
const DEFAULT_AVATAR_SIZE = 125;
function AvatarPicker({ customEditIcon = <Pen />, value, onChange = () => { }, size = DEFAULT_AVATAR_SIZE, customAvatar = avatar_png_1.default, avatarStyle, editContainerStyle, }) {
    const [currentValue, setCurrentValue] = (0, react_1.useState)(null);
    const handleUpdate = () => {
        react_native_image_crop_picker_1.default.openPicker({
            width: 250,
            height: 250,
            cropping: true,
        }).then((image) => {
            const newValue = {
                filename: image === null || image === void 0 ? void 0 : image.filename,
                mime: image === null || image === void 0 ? void 0 : image.mime,
                uri: image === null || image === void 0 ? void 0 : image.path,
            };
            setCurrentValue(newValue);
            onChange && onChange(newValue);
        });
    };
    return (<react_native_1.View style={[styles.container, { width: size, height: size }]}>
      {!currentValue && !value && (<react_native_1.Image resizeMode="cover" style={[
                styles.avatarContainer,
                { width: size, height: size },
                avatarStyle,
            ]} source={customAvatar}/>)}
      {currentValue && !value && (<react_native_1.Image resizeMode="cover" style={[
                styles.avatarContainer,
                { width: size, height: size },
                avatarStyle,
            ]} source={{ uri: currentValue === null || currentValue === void 0 ? void 0 : currentValue.uri }}/>)}
      {!currentValue && value && (<react_native_1.Image resizeMode="cover" style={[
                styles.avatarContainer,
                { width: size, height: size },
                avatarStyle,
            ]} source={value}/>)}
      {currentValue && value && (<react_native_1.Image resizeMode="cover" style={[
                styles.avatarContainer,
                { width: size, height: size },
                avatarStyle,
            ]} source={value}/>)}
      <react_native_1.TouchableOpacity onPress={handleUpdate} style={[styles.editContainer, editContainerStyle]}>
        {customEditIcon}
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
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
