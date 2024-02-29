import { Button } from '@mui/material'
import { useQuestionStore } from './store/questions'

const LIMIT_QUESTIONS = 10

export function Start (): JSX.Element {
  const fetchQustions = useQuestionStore((state) => state.fetchQuestions)

  const handleClick = (): void => {
    fetchQustions(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      ¡Comenzar!
    </Button>
  )
}
