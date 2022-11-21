import {IPersona} from "~/types/Persona.interface";

const useFavoritesPersonas = ({
                                  action = 'get',
                                  persona
                              }: { action: 'add' | 'remove' | 'get', persona: IPersona }): IPersona[] => {

    const getFavorites: IPersona[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    const addFavorite = (persona: IPersona) => {
        const favorites = getFavorites;
        favorites.push(persona);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const removeFavorite = (persona: IPersona) => {
        const favorites = getFavorites;
        const index = favorites.findIndex((p) => p.id === persona.id);
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const resetFavorites = () => {
        localStorage.removeItem('favorites');
    }

    if (!(getFavorites instanceof Error)) {
        switch (action) {
            case 'add':
                addFavorite(persona);
                break;
            case 'remove':
                removeFavorite(persona);
                break;
            case 'get':
            default:
                return getFavorites;

        }
        return getFavorites;
    } else {
        console.error(getFavorites);
        resetFavorites();
        return [];
    }

}

export default useFavoritesPersonas;