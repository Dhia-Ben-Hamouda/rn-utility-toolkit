export default function useTheme(): {
    gutters: import("..").Gutters;
    sizes: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 22, 24, 25, 30, 32, 36, 38, 42, 48, 50, 56, 57, 60, 61, 64, 80, 100, 120, 150];
    layout: {
        readonly row: {
            readonly flexDirection: "row";
        };
        readonly col: {
            readonly flexDirection: "column";
        };
        readonly justifyStart: {
            readonly justifyContent: "flex-start";
        };
        readonly justifyCenter: {
            readonly justifyContent: "center";
        };
        readonly justifyEnd: {
            readonly justifyContent: "flex-end";
        };
        readonly justifyBetween: {
            readonly justifyContent: "space-between";
        };
        readonly justifyAround: {
            readonly justifyContent: "space-around";
        };
        readonly justifyEvenly: {
            readonly justifyContent: "space-evenly";
        };
        readonly itemsStart: {
            readonly alignItems: "flex-start";
        };
        readonly itemsCenter: {
            readonly alignItems: "center";
        };
        readonly itemsEnd: {
            readonly alignItems: "flex-end";
        };
        readonly itemsStretch: {
            readonly alignItems: "stretch";
        };
        readonly itemsBaseline: {
            readonly alignItems: "baseline";
        };
        readonly selfStart: {
            readonly alignSelf: "flex-start";
        };
        readonly selfCenter: {
            readonly alignSelf: "center";
        };
        readonly selfEnd: {
            readonly alignSelf: "flex-end";
        };
        readonly selfStretch: {
            readonly alignSelf: "stretch";
        };
        readonly wrap: {
            readonly flexWrap: "wrap";
        };
        readonly noWrap: {
            readonly flexWrap: "nowrap";
        };
        readonly center: {
            readonly justifyContent: "center";
            readonly alignItems: "center";
        };
        readonly absolute: {
            readonly position: "absolute";
        };
        readonly relative: {
            readonly position: "relative";
        };
        readonly z0: {
            readonly zIndex: 0;
        };
        readonly z1: {
            readonly zIndex: 1;
        };
        readonly z10: {
            readonly zIndex: 10;
        };
        readonly z100: {
            readonly zIndex: 100;
        };
        readonly z1000: {
            readonly zIndex: 1000;
        };
        readonly generateIndex: (value: number) => {
            zIndex: number;
        };
        readonly top0: {
            readonly top: 0;
        };
        readonly generateTop: (value: import("react-native").DimensionValue) => {
            top: import("react-native").DimensionValue;
        };
        readonly right0: {
            readonly right: 0;
        };
        readonly generateRight: (value: import("react-native").DimensionValue) => {
            right: import("react-native").DimensionValue;
        };
        readonly bottom0: {
            readonly bottom: 0;
        };
        readonly generateBottom: (value: import("react-native").DimensionValue) => {
            bottom: import("react-native").DimensionValue;
        };
        readonly left0: {
            readonly left: 0;
        };
        readonly generateLeft: (value: import("react-native").DimensionValue) => {
            left: import("react-native").DimensionValue;
        };
        readonly w10Percent: {
            readonly width: "10%";
        };
        readonly w20Percent: {
            readonly width: "20%";
        };
        readonly w30Percent: {
            readonly width: "30%";
        };
        readonly w40Percent: {
            readonly width: "40%";
        };
        readonly w50Percent: {
            readonly width: "50%";
        };
        readonly w60Percent: {
            readonly width: "60%";
        };
        readonly w70Percent: {
            readonly width: "70%";
        };
        readonly w80Percent: {
            readonly width: "80%";
        };
        readonly w90Percent: {
            readonly width: "90%";
        };
        readonly w100Percent: {
            readonly width: "100%";
        };
        readonly wScreen: {
            readonly width: number;
        };
        readonly generateHeight: (height: import("react-native").DimensionValue) => {
            height: import("react-native").DimensionValue;
        };
        readonly generateMinHeight: (minHeight: import("react-native").DimensionValue) => {
            minHeight: import("react-native").DimensionValue;
        };
        readonly generateMaxHeight: (maxHeight: import("react-native").DimensionValue) => {
            maxHeight: import("react-native").DimensionValue;
        };
        readonly h10Percent: {
            readonly height: "10%";
        };
        readonly h20Percent: {
            readonly height: "20%";
        };
        readonly h30Percent: {
            readonly height: "30%";
        };
        readonly h40Percent: {
            readonly height: "40%";
        };
        readonly h50Percent: {
            readonly height: "50%";
        };
        readonly h60Percent: {
            readonly height: "60%";
        };
        readonly h70Percent: {
            readonly height: "70%";
        };
        readonly h80Percent: {
            readonly height: "80%";
        };
        readonly h90Percent: {
            readonly height: "90%";
        };
        readonly h100Percent: {
            readonly height: "100%";
        };
        readonly hScreen: {
            readonly height: number;
        };
        readonly generateWidth: (width: import("react-native").DimensionValue) => {
            width: import("react-native").DimensionValue;
        };
        readonly generateMinWidth: (minWidth: import("react-native").DimensionValue) => {
            minWidth: import("react-native").DimensionValue;
        };
        readonly generateMaxWidth: (maxWidth: import("react-native").DimensionValue) => {
            maxWidth: import("react-native").DimensionValue;
        };
        readonly overflowHidden: {
            readonly overflow: "hidden";
        };
        readonly overflowVisible: {
            readonly overflow: "visible";
        };
        readonly flex_1: {
            readonly flex: 1;
        };
        readonly flexGrow: {
            readonly flexGrow: 1;
        };
        readonly halfFlex: {
            readonly flex: 0.5;
        };
        readonly generateFlex: (value: number) => {
            flex: number;
        };
        readonly generateTranslateX: (value: number | `${number}%`) => {
            transform: {
                translateX: number | `${number}%`;
            }[];
        };
        readonly generateTranslateY: (value: number | `${number}%`) => {
            transform: {
                translateY: number | `${number}%`;
            }[];
        };
        readonly generateScale: (value: number) => {
            transform: {
                scale: number;
            }[];
        };
        readonly generateScaleX: (value: number) => {
            transform: {
                scaleX: number;
            }[];
        };
        readonly generateScaleY: (value: number) => {
            transform: {
                scaleY: number;
            }[];
        };
        readonly generateRotate: (angle: number) => {
            transform: {
                rotate: string;
            }[];
        };
        readonly generateRotateZ: (angle: number) => {
            transform: {
                rotateZ: string;
            }[];
        };
        readonly generateRotateY: (angle: number) => {
            transform: {
                rotateY: string;
            }[];
        };
        readonly generateSkewX: (angle: number) => {
            transform: {
                skewX: string;
            }[];
        };
        readonly generateSkewY: (angle: number) => {
            transform: {
                skewY: string;
            }[];
        };
    };
    fonts: import("..").Fonts;
    borders: import("..").Borders;
    colors: {
        readonly yellow: "#D4D467";
        readonly green: "#4AA589";
        readonly lighterGreen: "#4E8F7A";
        readonly orange: "#F4772C";
        readonly purple: "#5E3F99";
        readonly red: "#ff0000";
        readonly darkGreen: "#22504C";
        readonly lightGreen: "#C3F0E9";
        readonly white: "#ffffff";
        readonly black: "#000000";
        readonly gray700: "#333333";
        readonly gray500: "#555555";
        readonly gray300: "#777777";
        readonly gray50: "#cccccc";
        readonly gray100: "#e4e4e4";
        readonly gray20: "#F0F0F0";
        readonly gray10: "#f4f4f4";
        readonly lightGray: "#f8f8f8";
        readonly transparent: "transparent";
    };
    backgrounds: import("..").Backgrounds;
    gaps: import("..").Gaps;
};
