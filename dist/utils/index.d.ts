export declare function hexToRgba(hex: string, opacity: number): string;
export declare function generateInsets(value: number): {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare function generateShadow(shadowColor?: string, shadowOffset?: {
    height: number;
    width: number;
}, shadowOpacity?: number, shadowRadius?: number, elevation?: number): {
    shadowColor: string;
    shadowOffset: {
        height: number;
        width: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation?: undefined;
} | {
    elevation: number;
    shadowColor?: undefined;
    shadowOffset?: undefined;
    shadowOpacity?: undefined;
    shadowRadius?: undefined;
} | undefined;
export declare function capitalize(value?: string): string;
export declare function formatAmountByCurrency(amount: number, currency?: string, isCurrencyLeftPositioned?: boolean): string;
export declare const SCREEN_WIDTH: number;
export declare const SCREEN_HEIGHT: number;
export declare const isIos: boolean;
export declare const isAndroid: boolean;
