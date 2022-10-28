import moment from "moment";
import {IWeekInterval} from "~/types/WeekInterval.interface";

/**
 * @description This is a custom hook that returns the current week interval
 * @param action
 * @param weekInterval
 * @return {IWeekInterval}
 */
export const useWeekInterval = (action: 'previous' | 'next' | 'now' = 'now', weekInterval?: IWeekInterval) => {

    // Si on a pas de weekInterval en paramètre, on prend la semaine actuelle
    let {start, end}: IWeekInterval = weekInterval || {
        start: moment().startOf('isoWeek'),
        end: moment().endOf('isoWeek')
    };

    console.log(start, end)
    switch (action) {
        case 'previous':
            start = start.subtract(1, 'week');
            end = end.subtract(1, 'week');
            break;
        case 'next':
            start = start.add(1, 'week');
            end = end.add(1, 'week');
            break;
        default:
        case 'now':
            break;
    }

    return {start, end}
}
