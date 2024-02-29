import { Question } from '../types'

export const getAllQuestions = async (limit: number): Promise<Question[]> => {
  const res = await fetch('http://localhost:5173/data.json')
  const data = await res.json()
  return data
}
