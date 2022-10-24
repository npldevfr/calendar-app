import {defineStore} from "pinia";
import {useFetch} from "#imports";

export const usePersonaStore = defineStore('persona', {
    state: () => ({
        personas: null,
        selectedPersona: {} as any,
    }),
    getters: {
        getPersonas: (state) => state.personas,
    },
    actions: {
        FETCH_PERSONAS: (state) => {
            const personaStore = usePersonaStore();
            const {data: content} = useFetch('/api/personas');
            personaStore.SET_PERSONAS(content);
        },
        SET_PERSONAS(personas) {
            this.personas = personas;
        }
    }
});
