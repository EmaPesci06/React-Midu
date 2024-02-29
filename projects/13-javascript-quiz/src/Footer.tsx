import { Button } from '@mui/material'
import { useQuestionData } from './hooks/useQuestionData'
import { useQuestionStore } from './store/questions'

export function Footer (): JSX.Element {
  const { correct, incorrect, unanswered } = useQuestionData()

  const reset = useQuestionStore(state => state.reset)

  return (
    <footer>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button variant='contained' color='primary' onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}
