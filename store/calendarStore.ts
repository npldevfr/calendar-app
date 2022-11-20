import {defineStore} from "pinia";
import {IEvent} from "~/types/Event.interface";
import moment from "moment/moment";
import {IWeek} from "~/types/Week.interface";
import {useWeekInterval} from "~/composables/useWeekInterval";
import {IWeekInterval} from "~/types/WeekInterval.interface";
import {IDay} from "~/types/Day.interface";
import {DATE_FORMAT, EVENT_BLACKLIST_WORDS, HOURS} from "~/global.config";
import data from "~/store/apicalendar";

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
            const followingEvents = state.calendar.flatMap((week: IWeek) => week.days).flatMap((day: IDay) => day.events).filter((event: IEvent) => {
                return moment(event.start).isAfter(moment()) && event.title === eventById.title
            });

            const groupedEvents = followingEvents.reduce((acc, event) => {
                const date = moment(event.start, DATE_FORMAT).format('YYYY-MM-DD');
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(event);
                return acc;
            }, {});

            return Object.keys(groupedEvents).map((date) => {
                return {
                    date: date,
                    events: groupedEvents[date].sort((a, b) => moment(a.start).diff(moment(b.start)))
                }
            }).sort((a, b) => moment(a.date).diff(moment(b.date)))

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

                return groupedEventsByDates.map((day: IDay) => {
                    const mergedEvents = day.events.reduce((acc: IEvent[], event: IEvent) => {
                        const lastEvent = acc[acc.length - 1];
                        if (lastEvent && lastEvent.title === event.title && moment(event.start).diff(moment(lastEvent.end), 'hours') < 1) {
                            lastEvent.end = event.end;
                            return acc;
                        }
                        return [...acc, event];
                    }, []);
                    return {...day, events: mergedEvents}
                });
            }
        },
        /** Retourne le temps total de la semaine selectionnée **/
        getTotalHoursForWeek: (): string => {
            const events = useCalendarStore().getEventsForWeek;
            if (!events) return '0h';

            //count hours and minutes of all events and if name is near to a blacklisted word, don't count it
            const totalHours = events.days.flatMap((day: IDay) => day.events).reduce((acc: number, event: IEvent) => {
                if (EVENT_BLACKLIST_WORDS.some((word: string) => event.title.includes(word))) return acc;
                return acc + moment(event.end).diff(moment(event.start), 'hours', true);
            })

            return `${Math.floor(totalHours)}h${Math.round((totalHours % 1) * 60)}`
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
        FETCH_CALENDAR(personaId: string = ""): void {
            const fetchedCalendar = data;
            this.calendar = fetchedCalendar;
        },
        SET_WEEK_INTERVAL(weekInterval: IWeekInterval): void {
            this.weekInterval = weekInterval;
        },
        SET_SELECTED_EVENT(event?: IEvent): void {
            this.selectedEvent = event || {};
        },
    },
});