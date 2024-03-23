import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import CodeEditor from './components/code-editor/CodeEditor'
import QuestionDisplayer from './components/question-displayer/QuestionDisplayer'
import { Quiz } from '../../models/Quiz'
import { sx } from './styles'
import { useParams } from 'react-router-dom'
import { getQuizByIdAsync, insertQuizSubmissionAsync } from '../../api/quiz'
import { CreateSubmission } from '../../dtos/submission/CreateSubmission'
import { UserSubmissionContext } from '../../contexts/UserSubmissionContext'
import { QuizStatus } from '../../utils/enums/QuizStatus'
import { QuizContext } from '../../contexts/QuizContext'
import { QuizType } from '../../utils/enums/QuizType'

const QuizPage = () => {
  const { id: quizId } = useParams()
  console.log(quizId)
  const [quiz, setQuiz] = useState<Quiz>()
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(
    QuizStatus.NOT_STARTED
  )
  const quizType = QuizType.QLC
  const [userSubmission, setUserSubmission] = useState<CreateSubmission>()
  const submissionMethod = insertQuizSubmissionAsync

  // initialize quiz based on id specified in path param
  useEffect(() => {
    if (quizId) {
      const handleGetQuizByIdAsync = async () => {
        const q: Quiz | null = await getQuizByIdAsync(quizId)
        if (q) setQuiz(q)
      }
      handleGetQuizByIdAsync()
    }
  }, [])

  // initialize user submission
  useEffect(() => {
    if (quizId && quiz) {
      setUserSubmission((prev) => {
        if (prev) {
          return prev
        } else {
          const defaultUserSubmission = {
            quizId: quizId,
            answers: [
              ...quiz.questions.map((question) => {
                const defaultQuestionAnswer = {
                  questionId: question._id,
                  choiceIds: [],
                }

                return defaultQuestionAnswer
              }),
            ],
          }
          return defaultUserSubmission
        }
      })
    }
  }, [quizId, quiz])

  return (
    <QuizContext.Provider value={{ quizStatus, setQuizStatus, quizType }}>
      <Box sx={sx.quiz}>
        <Box sx={sx.displayerContainer}>
          <UserSubmissionContext.Provider
            value={{ userSubmission, setUserSubmission, submissionMethod }}
          >
            <QuestionDisplayer 
              questions={quiz?.questions} 
              isQlcQuiz={true}
              />
          </UserSubmissionContext.Provider>
        </Box>
        <Box sx={sx.editorContainer}>
          {quiz && quizStatus !== QuizStatus.NOT_STARTED && quiz.programId && (
            <CodeEditor programId={quiz.programId} />
          )}
        </Box>
      </Box>
    </QuizContext.Provider>
  )
}

export default QuizPage
