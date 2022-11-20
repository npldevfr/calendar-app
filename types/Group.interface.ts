import {IPersona} from "~/types/Persona.interface";

export interface IGroupe {
    category: 'Groupes' | 'Personnes';
    data: IPersona[];
}