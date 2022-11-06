import {defineStore} from "pinia";
import {useFetch} from "#imports";
import {useRuntimeConfig} from "#app";

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
            const {data: content} = useFetch(useRuntimeConfig().API_BASE_URL + '/groups', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            console.log(content);
            personaStore.SET_PERSONAS(content);
        },
        SET_PERSONAS(personas) {
            this.personas = personas;
        }
    }
});
