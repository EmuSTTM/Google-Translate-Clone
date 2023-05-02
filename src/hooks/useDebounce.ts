
/*
Este debounce sirve para que no se hagan constantes 
llamadas a la API, ya que antes de esto se la llamaba cada
vez que tipeabamos una letra
*/

import { useState, useEffect, useContext } from 'react'
// Un debounce es un valor que espera un tiempo antes de ser llamado
// El useDebouce va a utilizar el Tipo/Type/T como parámetro. Ejemplo: useDebounce<string>('Hello', 500)
export function useDebounce<T>(value: T, delay = 800) {
    const [debouncedValue, setDebouncedValue] = useState(value)

//Se ejecuta siempre, cada vez que hay un cambio, de forma sincrona
    useEffect(()=>{
        // Se reiniciará cada vez que se re-ejecute
        const timer = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)
        // Si no se llega a cumplir el timer antes de la
        // re-ejecución, retorna el clear igualmente
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue;
}

/*
Linea de tiempo de cómo se comporta el usuario:

0ms -> user type - 'h'
    UseEffect ... - L16
150ms -> user type - 'he'
    clear useEffect - L19
    useEffect ...
650ms -> setDebouncedValue('he') -> L17


*/


