import { Form } from 'react-bootstrap'
import { SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type Language } from '../types.d'


// interface Props {
//     onChange: (language: Language) => void // void significa nada 
// }

type Props = 
    | { type: SectionType, value: Language, onChange: (language: Language) => void}


export const LanguageSelector = (
    { onChange, type, value } : Props
    ) => {
		
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return(
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange}
				value={value}>
					
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}