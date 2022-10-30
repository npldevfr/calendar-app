import {IEvent} from "~/types/Event.interface";

export interface IDay {
    date: Date | string;
    events: IEvent[];
}