import { Languages } from "../../utils";
import React from "react";
export interface IChartCategory {
    name: string;
    color: string;
}
export interface IBar {
    id: number;
    firstCategoryValue: number;
    secondCategoryValue: number;
    date: Date;
}
export interface IBarChartRef {
    removeSelectedBarId: () => void;
}
interface IBarChart {
    categories: IChartCategory[];
    data: IBar[];
    language?: Languages;
}
declare const _default: React.ForwardRefExoticComponent<IBarChart & React.RefAttributes<unknown>>;
export default _default;
