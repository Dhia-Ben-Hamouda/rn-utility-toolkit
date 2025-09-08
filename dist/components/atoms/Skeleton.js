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
exports.default = Skeleton;
const react_1 = __importDefault(require("react"));
const react_native_skeleton_placeholder_1 = __importDefault(require("react-native-skeleton-placeholder"));
function Skeleton(_a) {
    var { contentStyle } = _a, rest = __rest(_a, ["contentStyle"]);
    return (<react_native_skeleton_placeholder_1.default {...rest}>
      <react_native_skeleton_placeholder_1.default.Item {...contentStyle}/>
    </react_native_skeleton_placeholder_1.default>);
}
