import { type FromLanguage, type Language } from '../types.d'



export async function translate ({
    fromLanguage,
    toLanguage,
    text
} : {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string,
}) {
    if (fromLanguage === toLanguage) return text;
    if (text === '') return null;
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`)
        const data = await res.json()
    // console.log(data)   
    return data.responseData.translatedText
}
// https://api.mymemory.translated.net/get?q=Hola,%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F&langpair=es|en