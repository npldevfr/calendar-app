import moment from "moment";
import {IWeekInterval} from "~/types/WeekInterval.interface";

export const useFindWeekInterval = (date: any): IWeekInterval => {

    const start = moment(date).startOf('isoWeek');
    const end = moment(date).endOf('isoWeek');

    return {start, end}

}