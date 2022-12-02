import {defineStore} from "pinia";

const EVENT_STORAGE_KEY = 'edtEventColor';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        eventColor: '#162f9d',
    }),
    getters: {
        getEventColor: (state) => state.eventColor,
    },
    actions: {
        REFRESH_EVENT_COLOR: () => {
            const themeStore = useThemeStore();
            const eventColor = localStorage.getItem(EVENT_STORAGE_KEY);
            if (eventColor) {
                themeStore.SET_EVENT_COLOR(eventColor);
            }
        },
        SET_EVENT_COLOR: (color: string) => {
            localStorage.setItem(EVENT_STORAGE_KEY, color);
            useThemeStore().eventColor = color;
        },
    }
});
