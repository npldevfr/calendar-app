export interface EventInterface {
    id: string;
    title: string;
    start: Date | string;
    end: Date | string;
    allDay: boolean;
    extendedProps: {

        /** @Informations **/
        location: string;
        fullDescription: string | null;

        /** @Props **/
        props: {
            description: string;
            teacher: string;
        }
    }
}