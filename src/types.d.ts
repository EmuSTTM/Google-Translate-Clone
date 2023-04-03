import { type SUPPORTED_LANGUAGES} from "./constants"

export type Language = keyof typeof SUPPORTED_LANGUAGES

/*
Como TypeScript necesita especificar el tipo de parámetro/variable
que se va a utilizar siempre. Aquí vamos a determinar los tipos de todo.
*/ 

export interface State {
        fromLanguage: Language
        toLanguage: Language
        fromText: string
        result: string
        loading: boolean
}

export type Action = 
    | {type: 'SET_FROM_LANGUAGE', payload: Language}
    | {type: 'SET_TO_LANGUAGE', payload: Language}
    | {type: 'SET_FROM_TEXT', payload: string}
    | {type: 'SET_RESULT', payload: string}
    | {type: 'INTERCHANGE_LANGUAGES'}


export enum SectionType {
	From = 'from',
  To = 'to'
}