import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionStore } from './store/questions'
import { type Question as QuestionType } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Footer } from './Footer'

const getBackgroundColor = (info: QuestionType, index: number): string => {
  const { userSelectedAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // si ya selecciono pero la solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si esta es la solución correcta
  if (index === correctAnswer) return 'green'
  // si esta es la selección del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }): JSX.Element => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton disabled={info.userSelectedAnswer != null} onClick={createHandleClick(index)} sx={{ backgroundColor: getBackgroundColor(info, index) }}>
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export function Game (): JSX.Element {
  const questions = useQuestionStore((state) => state.questions)
  const currentQuestion = useQuestionStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion)
  const goPreviusQuestion = useQuestionStore((state) => state.goPreviusQuestion)

  const questionInfo = questions[currentQuestion]
  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviusQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIosIcon />
        </IconButton>

      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
