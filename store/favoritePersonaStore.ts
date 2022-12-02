import {defineStore} from "pinia";
import {IPersona} from "~/types/Persona.interface";

const LOCAL_STORAGE_KEY = 'edtFavoritePersona';
export const useFavoritePersonaStore = defineStore('favorite-persona-store', {
    state: () => ({
        favoritePersona: [] as IPersona[],
    }),
    getters: {
        getFavoritePersona: (state) => state.favoritePersona,
        getIsFavorite: (state) => (persona: IPersona) => {
            return state.favoritePersona.some((p) => p.id === persona.id);
        }
    },
    actions: {
        REFRESH_FAVORITE_PERSONAS() {
            this.favoritePersona = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        },
        SET_FAVORITE_PERSONAS(favoritePersona: IPersona[]) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoritePersona));
            this.favoritePersona = favoritePersona;
        },
        ADD_FAVORITE_PERSONA(persona: IPersona) {
            const favoritePersona = this.favoritePersona;
            if (!favoritePersona.includes(persona)) {
                favoritePersona.push(persona);
                this.SET_FAVORITE_PERSONAS(favoritePersona);
            }

        },
        REMOVE_FAVORITE_PERSONA(persona: IPersona) {
            const favoritePersona = this.favoritePersona;
            const index = favoritePersona.indexOf(persona);
            favoritePersona.splice(index, 1);
            this.SET_FAVORITE_PERSONAS(favoritePersona);
        }
    }
});
