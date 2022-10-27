import {IDay} from "~/types/Day.interface";

export interface IWeek {
    firstDayOfWeek: Date;
    days: IDay[];
}