"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextGroup;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function TextGroup({ title, description, end = false, horizontal = false, containerStyle, descriptionStyle, titleStyle, }) {
    return (<react_native_1.View style={[
            styles.container,
            end && styles.containerEnd,
            horizontal && styles.horizontal,
            containerStyle,
        ]}>
      <react_native_1.Text style={[styles.title, titleStyle]}>{title}</react_native_1.Text>
      <react_native_1.Text style={[styles.description, descriptionStyle]}>{description}</react_native_1.Text>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        gap: 4,
        alignSelf: 'flex-start',
    },
    containerEnd: {
        alignItems: 'flex-end',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    description: {
        fontSize: 14,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '100%',
    },
});
