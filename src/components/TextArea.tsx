import {Form} from 'react-bootstrap';
import { FromLanguage, SectionType } from '../types.d';

interface Props {
    type: SectionType
    placeholder: string
    loading?: boolean
    onChange: (value: string) => void
    value: string
    
}

const commonStyles =  {  border:0, height: '200px', resize: 'none'}

const getPlaceHolders = ({type, loading} : {type:SectionType, loading?:boolean}) =>{
    if (type === SectionType.From) return 'Introducir Texto'
    if (loading === true) return 'Cargando...'
    return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange}: Props) => {
    const styles = type == SectionType.From 
    ? commonStyles 
    : {... commonStyles, background: "#f5f5f5"}


    const handleChange  = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }
    return (
        <Form.Control 
        autoFocus={type === SectionType.From}
        as='textarea'
        placeholder={getPlaceHolders({type,loading})}
        style={styles}
        disabled = {type === SectionType.To}
        value={value}
        onChange={handleChange}
      />
    )
}