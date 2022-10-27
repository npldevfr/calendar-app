import {defineStore} from "pinia";
import {useFetch} from "#imports";
import {IEvent} from "~/types/Event.interface";
import {ICalendar} from "~/types/Calendar.interface";
import moment from "moment/moment";
import {EVENT_BLACKLIST_WORDS} from "~/global.config";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        weekInterval: {start: new Date(), end: new Date()} as { start: Date, end: Date },
        calendar: null as ICalendar | null,
        selectedEvent: {} as IEvent,
    }),
    getters: {
        getCalendar: (state): ICalendar => state.calendar,
        getSelectedEvent: (state): IEvent => state.selectedEvent,
        getEventById: (state) => (id: string): IEvent => {
            return state.calendar?.events.find((event) => event.id === id)
        },
        getFollowingEvents: (state) => (id: string): IEvent[] => {
            return [];
        },
        getEventsForWeek: (state) => (id: string): IEvent[] => {
            return [];
        },
        getTotalHoursForWeek: (state) => (id: string): string => {
            const events = [];
            let totalHours = 0;
            let totalMinutes = 0;

            events.forEach(event => {
                event.event.forEach(event => {
                    if (!EVENT_BLACKLIST_WORDS.some(word => event.title.includes(word))) {
                        totalHours += moment(event.end).diff(moment(event.start), 'hours');
                        totalMinutes += moment(event.end).diff(moment(event.start), 'minutes');
                    }
                })
            })
            return `${totalHours}h${totalMinutes % 60 === 0 ? '' : totalMinutes % 60}`
        },
    },
    actions: {
        FETCH_CALENDAR(personaId: string = "") {
            console.log('FETCH_CALENDAR', personaId)
            const {data: data} = useFetch('~/data/apicalendar.json');
            console.log('data', data)
            this.calendar = data;
        },
        SET_CALENDAR(calendar) {
            this.calendar = calendar;
        },
        SET_SELECTED_EVENT(event) {
            this.selectedEvent = event;
        },
        SET_WEEK_INTERVAL(start, end) {
            this.weekInterval = {start, end};
        },
    },
});
