import {defineStore} from "pinia";
import {IEvent} from "~/types/Event.interface";
import moment from "moment/moment";
import {IWeek} from "~/types/Week.interface";
import {useWeekInterval} from "~/composables/useWeekInterval";
import {IWeekInterval} from "~/types/WeekInterval.interface";
import {IDay} from "~/types/Day.interface";
import {DATE_FORMAT, EVENT_BLACKLIST_WORDS, HOURS} from "~/global.config";
import data from "~/store/apicalendar";
import {useFetch} from "#imports";
import {useRuntimeConfig} from "#app";
import useCurrentPersona from "~/composables/Personas/useCurrentPersona";
import useLastUpdate from "~/composables/useLastUpdate";

interface CalendarStoreState {
    weekInterval: IWeekInterval;
    calendar: IWeek[];
    selectedEvent: IEvent | {};
}

export const useCalendarStore = defineStore('calendar', {
    state: (): CalendarStoreState => ({
        weekInterval: {start: moment().startOf('isoWeek'), end: moment().endOf('isoWeek')} as IWeekInterval,
        calendar: [] as IWeek[],
        selectedEvent: {} as IEvent,
    }),
    getters: {
        getWeekInterval: (state: CalendarStoreState): IWeekInterval => {
            return state.weekInterval
        },
        getCalendar: (state: CalendarStoreState): IWeek[] => {
            return state.calendar
        },
        getSelectedEvent: (state: CalendarStoreState) => state.selectedEvent,
        getEventById: (state: CalendarStoreState) => (id: string): IEvent => {
            if (!id) return {} as IEvent

            const event = state.calendar
                .map((week: IWeek) => week.days)
                .flat()
                .map((day: IDay) => day.events)
                .flat()
                .find((event: IEvent) => event.id === id)

            return (event || {}) as IEvent
        },
        /** Retourne la liste des événements à venir **/
        getFollowingEvents: (state: CalendarStoreState) => (uuid: string) => {
            if (!uuid) return []
            const eventById = useCalendarStore().getEventById(uuid);
            if (!eventById) return [];


            const followingEvents = useCalendarStore().getCalendar
                .map((week: IWeek) => week.days)
                .flat()
                .map((day: IDay) => day.events)
                .flat()
                .filter((event: IEvent) => {
                    const isSameTitle = event.title === eventById.title;
                    const isAfter = moment(event.start).isAfter(moment());
                    return isSameTitle && isAfter;
                })


            const newFollows = followingEvents.map((event: IEvent) => {
                return {
                    ...event,
                    startDay: moment(event.start).format('DD/MM/YYYY'),
                    endDay: moment(event.end).format('DD/MM/YYYY'),
                }
            })

            const groupBy = (array: any[], key: string) => {
                return array.reduce((result: any, currentValue: any) => {
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                        currentValue
                    );
                    return result;
                }, {});
            }

            const groupedByDay = groupBy(newFollows, 'startDay');

            return Object.keys(groupedByDay).map((day: string) => {
                return {
                    day,
                    events: groupedByDay[day]
                }
            }, [])



        },
        /** Retourne la liste des événements pour la semaine selectionnée **/
        getEventsForWeek: (state: CalendarStoreState) => {
            const weeks = state.calendar;
            const {start, end} = state.weekInterval;
            if (!weeks) return [];

            return weeks.filter((week: IWeek) => {
                return moment(week.firstDayOfWeek).isBetween(start, end, null, '[]')
            })[0]
        },
        getCalendarHours: (): string[] => {
            return HOURS;
        },
        getDatesInWeek: (state: CalendarStoreState) => {
            const {start, end} = state.weekInterval;
            const dates = [];
            for (let m = moment(start); m.isBefore(end); m.add(1, 'days')) {
                dates.push(m.format('YYYY-MM-DD'));
            }
            return dates;
        },
        getFormatEventByWeek: () => {
            const events = useCalendarStore().getEventsForWeek;
            const dates = useCalendarStore().getDatesInWeek;

            if (!events) {
                return dates.map((date: string) => {
                    return {
                        date,
                        events: []
                    }
                })
            } else {


                const groupedEventsByDates = dates.map((date: string) => {
                    return {
                        date,
                        events: events.days.find((day: IDay) => day.date === date)?.events || []
                    }
                })

                // merge events with same title with end and start date < 30 minutes
                const mergedEvents = groupedEventsByDates.map((day: IDay) => {
                    const events = day.events;
                    const mergedEvents = events.reduce((acc: IEvent[], current: IEvent) => {
                        const last = acc[acc.length - 1];
                        if (last && last.title === current.title && moment(last.end).diff(moment(current.start), 'minutes') < 30) {
                            last.end = current.end;
                            return acc;
                        } else {
                            return acc.concat([current]);
                        }
                    }, []);

                    return {
                        ...day,
                        events: mergedEvents
                    }
                })

                return mergedEvents;
            }
        },
        /** Retourne le temps total de la semaine selectionnée **/
        getTotalHoursForWeek: (): string => {
            const events = useCalendarStore().getFormatEventByWeek;
            if (!events) return '0h';

            let totalMinutes = 0;
            const blackList = EVENT_BLACKLIST_WORDS;

            events.forEach((day: IDay) => {
                day.events.forEach((event: IEvent) => {
                    if (!blackList.some((word: string) => event.title.toLowerCase().includes(word.toLowerCase()))) {
                        totalMinutes += moment(event.end).diff(moment(event.start), 'minutes');
                    }
                })
            });


            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours}h${minutes ? minutes : ''}`;

        },
    },
    actions: {
        GO_BACK_TO_TODAY(): void {
            this.weekInterval = useWeekInterval();
        },
        PREVIOUS_WEEK(): void {
            this.weekInterval = useWeekInterval('previous', this.weekInterval);
        },
        NEXT_WEEK(): void {
            this.weekInterval = useWeekInterval('next', this.weekInterval);
        },
        async FETCH_CALENDAR(groupId: string): Promise<void> {
            this.calendar = [] as IWeek[];
            // const {group_id} = useCurrentPersona('get');
            if (!groupId) return;
            const {data: events} = await useFetch(useRuntimeConfig().public.API_BASE_URL + `/events-by-group/${groupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
            useLastUpdate('update');
            const {data} = events.value;
            this.calendar = data;
        },
        SET_WEEK_INTERVAL(weekInterval: IWeekInterval): void {
            this.weekInterval = weekInterval;
        },
        SET_SELECTED_EVENT(event?: IEvent): void {
            this.selectedEvent = event || {};
        },
    },
});