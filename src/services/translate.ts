import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types.d'


/*
Otros ejemplos de APIs para poder hacer la traducción:
Deepi API
Cohere API
*/
const apiKey = "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"

const configuration = new Configuration({apiKey})
const openai = new OpenAIApi(configuration)


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
    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'You are a AI that translate text. You receive a text from the User. Do not answere, just tralate the text. The original language is surronded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Hola mundo {{Español}} [[English]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Hello world'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'How are you? {{auto}} [[Deutsch]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Wie geht es dir?'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Bon dia, com estas? {{auto}} [[Español]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Buenos días, ¿cómo estas?'
        },
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `${text} {{${fromCode}}} [[${toCode}]]`
            }
        ]
    })


    return completion.data.choices[0].message?.content
}
