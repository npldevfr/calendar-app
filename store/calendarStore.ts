import {defineStore} from "pinia";
import {useFetch} from "#imports";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        calendar: null,
    }),
    getters: {
        fetchCalendar: (state) => {
            const { data: content } = useFetch('/api/calendar');
        },
        getCalendar: (state) => {
            return state.calendar
        }
    },
    actions: {
        setCalendar(calendar) {
            this.calendar = calendar;
        }
    },
});
