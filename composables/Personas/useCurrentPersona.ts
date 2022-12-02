import {IPersona} from "~/types/Persona.interface";

const useCurrentPersona = (action: 'get' | 'reset' | 'set' | 'initialize', persona?: IPersona) => {

    const currentPersona: IPersona = JSON.parse(localStorage.getItem('edtCurrentPersona') || '{}');

    const setCurrentPersona = (persona: IPersona) => {
        localStorage.setItem('edtCurrentPersona', JSON.stringify(persona));
    }

    const resetCurrentPersona = () => {
        localStorage.removeItem('edtCurrentPersona');
    }

    const initializeCurrentPersona = () => {
        const currentPersona = JSON.parse(localStorage.getItem('edtCurrentPersona') || '{}');
        return currentPersona.id ? currentPersona : {};
    }

    if (!(currentPersona instanceof Error)) {
        switch (action) {
            case 'set':
                if (!!persona) setCurrentPersona(persona);
                break;
            case 'initialize':
                initializeCurrentPersona();
                break;
            case 'reset':
                resetCurrentPersona();
                break;
            case 'get':
            default:
                return currentPersona as IPersona;
        }
        return currentPersona;
    } else {
        console.error(currentPersona);
        resetCurrentPersona();
        return {};
    }

}

export default useCurrentPersona;