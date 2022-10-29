import {defineStore} from "pinia";
import data from "~/data/apicalendar.json"
import {IEvent} from "~/types/Event.interface";
import moment from "moment/moment";
import {IWeek} from "~/types/Week.interface";
import {useWeekInterval} from "~/composables/useWeekInterval";
import {IWeekInterval} from "~/types/WeekInterval.interface";
import {IDay} from "~/types/Day.interface";
import {EVENT_BLACKLIST_WORDS, HOURS} from "~/global.config";

interface CalendarStoreState {
    weekInterval: IWeekInterval;
    calendar: any;
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
        getSelectedEvent: (state: CalendarStoreState) => state.selectedEvent,
        getEventById: (state: CalendarStoreState) => (id: string): IEvent => {
            if (!id) return {} as IEvent
            return state.calendar.flatMap((week: IWeek) => week.days).flatMap((day: IDay) => day.events).find((event: IEvent) => event.id === id)
        },
        /** Retourne la liste des événements à venir **/
        getFollowingEvents: (state: CalendarStoreState) => (uuid: string): IEvent[] => {
            if (!uuid) return []
            const eventById = useCalendarStore().getEventById(uuid);
            if (!eventById) return [];
            return state.calendar.flatMap((week: IWeek) => week.days).flatMap((day: IDay) => day.events).filter((event: IEvent) => {
                return moment(event.start).isAfter(moment()) && event.title === eventById.title
            });
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
        /** Retourne le temps total de la semaine selectionnée **/
        getTotalHoursForWeek: (): string => {
            const events = useCalendarStore().getEventsForWeek;
            if (!events) return '0h';

            let totalHours = 0;
            let totalMinutes = 0;

            events.days.forEach((day: IDay) => {
                day.events.forEach((event: IEvent) => {
                    if (EVENT_BLACKLIST_WORDS.some((word: string) => event.title.includes(word))) return;
                    totalHours += moment(event.end).diff(moment(event.start), 'hours');
                    totalMinutes += moment(event.end).diff(moment(event.start), 'minutes') % 60;
                })
            })


            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes = totalMinutes % 60;

            return `${totalHours}h${totalMinutes ? ` ${totalMinutes}min` : ''}`
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
            const {data: fetchedCalendar} = data;
            this.calendar = fetchedCalendar;
        },
        SET_SELECTED_EVENT(event: IEvent): void {
            this.selectedEvent = event;
        },
    },
});
