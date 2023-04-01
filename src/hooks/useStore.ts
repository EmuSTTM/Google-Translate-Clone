import { type State, type Action, type Language, type FromLanguage } from "../types";
import { useReducer } from "react";
import { AUTO_LANGUAGE } from "../constants";

//1. Creamos el initialState
const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

/*Cómo puede modificar el usuario los estados. Por ejemplo, 
cambiar el idioma, el idioma del estilo, el texto resultado, etc. */

/* Un reducer recibe dos cosas, un estado y una acción. El reducer 
generará nuevos estados. El useReducer recibe el reduce y el estado incial,
devolviendo el state. Y cada vez que el state cambia, se re-renderiza el componente.
Cada vez que tenemos una acción creamos o actualizamos un nuevo estado para que se
renderice.

*/

//2. Creamos el reducer
function reducer(state: State, action: Action) {
  // En TypeScript se deben especificar los tipos de parámetros

  /* payload es lo que vamos a pasar en cada acción. 
    Es la información que envía la acción para cambiar el estado
    */
  const { type } = action;

  // Es para cuando intercambiamos los idioms en el translate
  if (type === "INTERCHANGE_LANGUAGES") {
    // Lógica del estado dentro del reducer
    // porque lo evitamos en los componentes
    const loading = state.fromText !== '' 
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  // Cambiamos el idioma del que escribimos
  if (type === "SET_FROM_LANGUAGE") {
    if ( state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    };
  }

  // Cambiamos el idioma de destino
  if (type === "SET_TO_LANGUAGE") {
    if ( state.toLanguage === action.payload) return state
    const loading = state.fromText !== '' 

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    };
  }

  // Cada que cambiamos las palabras del recuadro de la izquierda
  if (type === "SET_FROM_TEXT") {
    
    const loading = state.fromText !== '' 
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
      

    };
  }

  // El resultado de la derecha
  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  // Si no contemplamos ningun type, devolvemos el mismo estado
  // Un reducer siempre debe devolver el state
  return state;
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  // Se deben dejar los dispatch de esta forma siempre
  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: Language) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setFromText,
    setToLanguage,
    setResult,
  };
}
