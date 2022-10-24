import {defineStore} from "pinia";
import {useFetch} from "#imports";
import {EventInterface} from "~/types/Event.interface";
import {CalendarInterface} from "~/types/Calendar.interface";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        weekInterval: { start: new Date(), end: new Date() },

        calendar: null,
        selectedEvent: {} as any,
    }),
    getters: {
        getCalendar: (state): CalendarInterface => state.calendar,
        getSelectedEvent: (state): EventInterface => state.selectedEvent,
        getEventById: (state) => (id: string): EventInterface => {
            return state.calendar?.events.find((event) => event.id === id)
        },
        getFollowingEvents: (state) => (id: string) => {},
        getEventsForWeek: (state) => (id: string) => {},
        getTotalHoursForWeek: (state) => (id: string) => {},
    },
    actions: {
        FETCH_CALENDAR: (state) => (personaId: string) => {
            const {data: content} = useFetch('/api/calendar');
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
