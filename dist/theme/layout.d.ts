import { DimensionValue } from "react-native";
export declare const layout: {
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
    readonly generateTop: (value: DimensionValue) => {
        top: DimensionValue;
    };
    readonly right0: {
        readonly right: 0;
    };
    readonly generateRight: (value: DimensionValue) => {
        right: DimensionValue;
    };
    readonly bottom0: {
        readonly bottom: 0;
    };
    readonly generateBottom: (value: DimensionValue) => {
        bottom: DimensionValue;
    };
    readonly left0: {
        readonly left: 0;
    };
    readonly generateLeft: (value: DimensionValue) => {
        left: DimensionValue;
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
    readonly generateHeight: (height: DimensionValue) => {
        height: DimensionValue;
    };
    readonly generateMinHeight: (minHeight: DimensionValue) => {
        minHeight: DimensionValue;
    };
    readonly generateMaxHeight: (maxHeight: DimensionValue) => {
        maxHeight: DimensionValue;
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
    readonly generateWidth: (width: DimensionValue) => {
        width: DimensionValue;
    };
    readonly generateMinWidth: (minWidth: DimensionValue) => {
        minWidth: DimensionValue;
    };
    readonly generateMaxWidth: (maxWidth: DimensionValue) => {
        maxWidth: DimensionValue;
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
