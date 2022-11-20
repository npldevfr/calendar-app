import {defineStore} from "pinia";
import {useFetch} from "#imports";
import {useNuxtApp, useRuntimeConfig} from "#app";
import {IPersona} from "~/types/Persona.interface";
import {IGroupe} from "~/types/Group";

export const usePersonaStore = defineStore('persona', {
    state: () => ({
        personas: [] as IGroupe[],
        selectedPersona: {} as any,
    }),
    getters: {
        getPersonas: (state) => state.personas,
    },
    actions: {
        FETCH_PERSONAS: async () => {
            const personaStore = usePersonaStore();
            const {data: groups} = await useFetch(useRuntimeConfig().public.apiBaseUrl + '/groups', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })

            personaStore.SET_PERSONAS(groups.value);
        },
        SET_PERSONAS(personas: IGroupe[]) {
            this.personas = personas;
        }
    }
});
