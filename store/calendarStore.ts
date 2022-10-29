import {defineStore} from "pinia";
import data from "~/data/apicalendar.json"
import {IEvent} from "~/types/Event.interface";
import moment from "moment/moment";
import {IWeek} from "~/types/Week.interface";
import {useWeekInterval} from "~/composables/useWeekInterval";
import {IWeekInterval} from "~/types/WeekInterval.interface";
import {IDay} from "~/types/Day.interface";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        weekInterval: {start: moment().startOf('isoWeek'), end: moment().endOf('isoWeek')} as IWeekInterval,
        calendar: [] as IWeek[],
        selectedEvent: {} as IEvent,
    }),
    getters: {
        getWeekInterval: (state): IWeekInterval => {
            return state.weekInterval
        },
        getSelectedEvent: (state): IEvent => state.selectedEvent,
        getEventById: (state) => (id: string): IEvent => {
            if (!id) return {} as IEvent
            return state.calendar.flatMap((week: IWeek) => week.days).flatMap((day: IDay) => day.events).find((event: IEvent) => event.id === id)
        },
        getFollowingEvents: (state) => {
            const eventById = useCalendarStore().getEventById('ed8762ba-f1ae-4ab0-bb32-45b4246988c7');
            if (!eventById) return [];
            // get only events that are after now and where title is same as eventById
            return state.calendar.flatMap((week: IWeek) => week.days).flatMap((day: IDay) => day.events).filter((event: IEvent) => {
                return moment(event.start).isAfter(moment()) && event.title === eventById.title
            });

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
