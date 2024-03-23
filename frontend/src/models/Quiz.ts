import { QuestionType } from '../utils/enums/QuestionType'

// TO DELETE
export interface QuizV0 {
  _id: number
  questionIds: number[]
  programFileId: number
}

interface Choice {
  _id: number
  text: string
  isCorrect?: boolean
}

export interface Question {
  _id: number
  type?: QuestionType
  text: string
  choices: Choice[]
}

export interface Quiz {
  _id: string
  programId?: string
  questions: Question[]
}
