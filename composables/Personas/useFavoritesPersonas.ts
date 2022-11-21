import {IPersona} from "~/types/Persona.interface";

const useFavoritesPersonas = (action: 'add' | 'remove' | 'get' | 'initialize', persona?: IPersona): IPersona[] => {

    const getFavorites: IPersona[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    const addFavorite = (persona: IPersona): void => {
        const favorites = getFavorites;
        favorites.push(persona);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const removeFavorite = (persona: IPersona): void => {
        const favorites = getFavorites;
        const index = favorites.findIndex((p) => p.id === persona.id);
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const initializeFavorites = (): IPersona[] => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.length ? favorites : [];
    }

    const resetFavorites = (): void => {
        localStorage.removeItem('favorites');
    }

    if (!(getFavorites instanceof Error)) {
        switch (action) {
            case 'add':
                if (!!persona) addFavorite(persona);
                break;
            case 'remove':
                if (!!persona) removeFavorite(persona);
                break;
            case "initialize":
                console.log('initialize');
                initializeFavorites();
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