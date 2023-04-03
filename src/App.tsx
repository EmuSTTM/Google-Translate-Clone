import './App.css'

import { useEffect } from 'react'
import { Container, Row, Col, Button,  Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { ArrowsIcon } from './components/Icons'
import { ClipboardIcon } from './components/Icons'
import { SpeakerIcon } from './components/Icons'
import { TextArea } from './components/TextArea'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'



//3. Usamos el hook useReducer
function App() {
  const { 
    fromLanguage,
    toLanguage,
    setFromLanguage, 
    setToLanguage,
    interchangeLanguages,
    fromText, 
    result,
    setFromText, 
    setResult,
    loading } = useStore()

    const debouncedFromText = useDebounce(fromText)

    const handleClipBoard = () => {
      navigator.clipboard.writeText(result).catch(()=> {})
    }

    const handleSpeakBoard = () => {
      // Es la web speeeck de google
      const utterance = new SpeechSynthesisUtterance(result);
      utterance.lang = toLanguage
      speechSynthesis.speak(utterance)
    }

    useEffect(()=>{
      if (debouncedFromText == '') return

      translate({fromLanguage, toLanguage, text: debouncedFromText})
      .then( result => {
        if(result == null ) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
    }, [debouncedFromText, fromLanguage, toLanguage])
 
  return (
    <Container fluid  className="App">
      <h2>Google Translate</h2>

      <Row>
        <Col>
        {/* El stack sería algo parecido a un flex, y el gap es el espacio entre los items */}
        <Stack gap={2}> 
          <LanguageSelector 
          type={SectionType.From}
          value={fromLanguage}
          onChange={setFromLanguage}/>
          <TextArea  
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
            
          />
          </Stack>
        </Col>

        <Col xs='auto'>
        <Button variant="link" onClick={interchangeLanguages}>
          <ArrowsIcon />
        </Button>
        </Col>

        <Col>
        <Stack gap={2}> 
          <LanguageSelector 
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage} />
          <div style={{position: 'relative'}}>

          <TextArea   
            loading={loading}
            type={SectionType.To}
            value={result}
            onChange={setResult}
          />
          <div style={{position: 'absolute', left: 0, bottom: 0, display:'flex'}}>
          <Button variant='link' 
          onClick={handleClipBoard}>
            <ClipboardIcon />
          </Button>
          <Button variant="link"
          onClick={handleSpeakBoard}>
            <SpeakerIcon />
          </Button>
          </div>
          </div>
          
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
