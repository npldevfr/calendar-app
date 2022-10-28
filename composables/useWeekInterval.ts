import moment from "moment";
import {IWeekInterval} from "~/types/WeekInterval.interface";

/**
 * @description This is a custom hook that returns the current week interval
 * @param delta
 * @param weekInterval
 * @return {IWeekInterval}
 */
export const useWeekInterval = (delta: number = 0, weekInterval?: IWeekInterval) => {

    // Si on a pas de weekInterval en paramètre, on prend la semaine actuelle
    const {start, end} = weekInterval || {
        start: moment().startOf('isoWeek'),
        end: moment().endOf('isoWeek') as moment.Moment
    };

    // Si delta est négatif, on va à la semaine -n
    if (delta < 0) {
        return {
            start: start.subtract(Math.abs(delta), 'week'),
            end: end.subtract(Math.abs(delta), 'week')
        }
    }

    // Si delta est positif, on va à la semaine +n
    if (delta > 0) {
        return {
            start: start.add(delta, 'week'),
            end: end.add(delta, 'week')
        }
    }

    return {start, end}
}
