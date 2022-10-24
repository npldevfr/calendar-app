import {defineStore} from "pinia";
import {useFetch} from "#imports";

export const usePersonaStore = defineStore('persona', {
    state: () => ({
        persona: null,
    }),
    getters: {
        getPersona: (state) => state.persona,
    },
    actions: {
        FETCH_PERSONA: (state) => {
            const {data: content} = useFetch('/api/persona');
        },
        SET_PERSONA(persona) {
            this.persona = persona;
        }
    }
});
