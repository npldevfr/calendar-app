import {defineStore} from "pinia";
import {useFetch} from "#imports";
import {useRuntimeConfig} from "#app";
import {IGroupe} from "~/types/Group.interface";

export const usePersonaStore = defineStore('persona', {
    state: () => ({
        personas: [] as IGroupe[],
        selectedPersona: {} as any,
    }),
    getters: {
        getPersonas: (state) => state.personas,
        getPersonaById: (state) => (id: string) => state.personas.flatMap((persona) => persona.data).find((group) => group.group_id === id),
    },
    actions: {
        FETCH_PERSONAS: async () => {
            const personaStore = usePersonaStore();
            const {data: groups} = await useFetch(useRuntimeConfig().public.API_BASE_URL + '/groups', {
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
