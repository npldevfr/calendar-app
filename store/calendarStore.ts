import {defineStore} from "pinia";
import {useFetch} from "#imports";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        calendar: null,
        selectedEvent: {} as any,
    }),
    getters: {
        getCalendar: (state) => {
            return state.calendar
        },
        getSelectedEvent: (state) => state.selectedEvent,
    },
    actions: {
        FETCH_CALENDAR: (state) => {
            const {data: content} = useFetch('/api/calendar');
        },
        setCalendar(calendar) {
            this.calendar = calendar;
        }
    },
});
