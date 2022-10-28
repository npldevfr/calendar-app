import {defineStore} from "pinia";
import data from "~/data/apicalendar.json"
import {IEvent} from "~/types/Event.interface";
import moment from "moment/moment";
import {EVENT_BLACKLIST_WORDS} from "~/global.config";
import {IWeek} from "~/types/Week.interface";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        weekInterval: {start: moment().startOf('isoWeek'), end: moment().endOf('isoWeek') as moment.Moment},
        calendar: [] as IWeek[],
        selectedEvent: {} as IEvent,
    }),
    getters: {
        getWeekInterval: (state): { start: moment.Moment, end: moment.Moment } => {
            return state.weekInterval
        },
        getSelectedEvent: (state): IEvent => state.selectedEvent,
        getEventById: (state) => (id: string): IEvent => {
            return {} as IEvent
            // return state.calendar?.find((week: IWeek) => week.events.find((event: IEvent) => event.id === id))?.events.find((event: IEvent) => event.id === id) as IEvent
        },
        getFollowingEvents: (state) => (id: string) => {
            const weeks = state.calendar;
            return true;
        },
        getEventsForWeek: (state): IWeek[] => {
            const weeks = state.calendar;
            const {start, end} = state.weekInterval;
            if (!weeks) return [];

            return weeks.filter((week: IWeek) => {
                return moment(week.firstDayOfWeek).isBetween(start, end, null, '[]')
            })

        },
        getTotalHoursForWeek: (state): string => {
            return '999h'
            // const events = useCalendarStore();
            // let totalHours = 0;
            // let totalMinutes = 0;
            //
            // events.getEventsForWeek().forEach(event => {
            //     event.event.forEach(event => {
            //         if (!EVENT_BLACKLIST_WORDS.some(word => event.title.includes(word))) {
            //             totalHours += moment(event.end).diff(moment(event.start), 'hours');
            //             totalMinutes += moment(event.end).diff(moment(event.start), 'minutes');
            //         }
            //     })
            // })
            // return `${totalHours}h${totalMinutes % 60 === 0 ? '' : totalMinutes % 60}`
        },
    },
    actions: {
        GO_BACK_TO_TODAY(): void {
            this.weekInterval = {
                start: moment().startOf('isoWeek'),
                end: moment().endOf('isoWeek')
            }
        },
        FETCH_CALENDAR(personaId: string = ""): void {
            const {data: fetchedCalendar} = data;
            this.calendar = fetchedCalendar;
        },
        SET_SELECTED_EVENT(event: IEvent): void {
            this.selectedEvent = event;
        },
        SET_WEEK_INTERVAL(start: moment.Moment, end: moment.Moment): void {
            this.weekInterval = {start, end};
        },
    },
});
