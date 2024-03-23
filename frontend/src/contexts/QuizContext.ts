import { createContext, useContext } from 'react'
import { QuizStatus } from '../utils/enums/QuizStatus'
import { QuizType } from '../utils/enums/QuizType'

interface QuizContextType {
  quizStatus: QuizStatus
  setQuizStatus: (quizStatus: QuizStatus) => void
  quizType: QuizType
}

const defaultQuizContext = {
  quizStatus: QuizStatus.NOT_STARTED,
  setQuizStatus: (quizStatus: QuizStatus) => { console.log(quizStatus) },
  quizType: QuizType.QLC,
}

export const QuizContext = createContext<QuizContextType>(defaultQuizContext)
export const useQuizStatusContext = () => useContext(QuizContext)
