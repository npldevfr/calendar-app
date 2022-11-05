import {defineStore} from "pinia";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [] as string[],
    }),
    getters: {
        getNotifications: (state): string[] => state.notifications,
    },
    actions: {
        ADD_NOTIFICATION(notification: string) {
            this.notifications.push(notification);
            setTimeout(() => {
                this.notifications.shift();
            }, 3000);
        }
    }
});
