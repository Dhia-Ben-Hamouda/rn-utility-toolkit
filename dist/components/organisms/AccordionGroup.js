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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccordionGroup;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const Accordion_1 = __importDefault(require("../molecules/Accordion"));
function AccordionGroup({ data, defaultOpenIndex = null, containerStyle, itemContainerStyle, separatorStyle, titleStyle, headerStyle, allowMultiple = false, }) {
    const [openIndexes, setOpenIndexes] = (0, react_1.useState)(defaultOpenIndex !== null ? [defaultOpenIndex] : []);
    const isItemOpen = (index) => openIndexes === null || openIndexes === void 0 ? void 0 : openIndexes.includes(index);
    const handleToggle = (index, nextIsExpanded) => {
        if (allowMultiple) {
            setOpenIndexes((prev) => nextIsExpanded
                ? [...prev, index]
                : prev.filter((openIndex) => openIndex !== index));
            return;
        }
        setOpenIndexes(nextIsExpanded ? [index] : []);
    };
    return (<react_native_1.View style={[styles.groupContainer, containerStyle]}>
      {data === null || data === void 0 ? void 0 : data.map((item, index) => {
            const { key, content, containerStyle: accordionContainerStyle, headerStyle: accordionHeaderStyle, titleStyle: accordionTitleStyle } = item, accordionProps = __rest(item, ["key", "content", "containerStyle", "headerStyle", "titleStyle"]);
            const showSeparator = index < (data === null || data === void 0 ? void 0 : data.length) - 1 && !isItemOpen(index);
            return (<react_native_1.View key={key !== null && key !== void 0 ? key : String(index)} style={itemContainerStyle}>
            <Accordion_1.default {...accordionProps} isExpanded={isItemOpen(index)} onToggle={(next) => handleToggle(index, next)} useOppositeArrowIcons containerStyle={[styles.itemContainer, accordionContainerStyle]} headerStyle={[styles.header, headerStyle, accordionHeaderStyle]} titleStyle={[styles.title, titleStyle, accordionTitleStyle]} contentContainerStyle={[
                    styles.contentContainer,
                    accordionProps.contentContainerStyle,
                ]}>
              {content}
            </Accordion_1.default>

            {showSeparator ? (<react_native_1.View style={[styles.separator, separatorStyle]}/>) : null}
          </react_native_1.View>);
        })}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    groupContainer: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e7e7e7",
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    itemContainer: {
        borderRadius: 0,
    },
    header: {
        backgroundColor: "#fff",
    },
    title: {
        color: "#3d3d3d",
        fontWeight: "500",
    },
    contentContainer: {
        backgroundColor: "#fff",
    },
    separator: {
        marginHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#ececec",
        borderStyle: "dashed",
    },
});
