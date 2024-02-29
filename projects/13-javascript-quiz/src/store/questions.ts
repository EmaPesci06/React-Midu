import { create } from 'zustand'
import { type Question } from '../types.d'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
import { getAllQuestions } from '../services/questions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviusQuestion: () => void
}

export const useQuestionStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const data = await getAllQuestions(limit)

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)

      set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectUserAnwser = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnwser) confetti()
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnwser,
        userSelectedAnswer: answerIndex
      }
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPreviusQuestion: () => {
      const { currentQuestion } = get()
      const previusQuestion = currentQuestion - 1

      if (previusQuestion >= 0) {
        set({ currentQuestion: previusQuestion })
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, {
  name: 'questions'
}))
