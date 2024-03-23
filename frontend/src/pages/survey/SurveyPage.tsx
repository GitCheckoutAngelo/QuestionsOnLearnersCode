import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { sx } from './styles'
import { useParams } from 'react-router-dom'
import { CreateSubmission } from '../../dtos/submission/CreateSubmission'
import { UserSubmissionContext } from '../../contexts/UserSubmissionContext'
import { QuizStatus } from '../../utils/enums/QuizStatus'
import { QuizContext } from '../../contexts/QuizContext'
import { insertSurveySubmissionAsync } from '../../api/survey'
import QuestionDisplayer from '../quiz/components/question-displayer/QuestionDisplayer'
import { QuizType } from '../../utils/enums/QuizType'

const surveyQuestions = [
  {
    _id: 0,
    text: 'Have you used this tool before?',
    choices: [
      {
        _id: 0,
        text: 'Yes',
      },
      {
        _id: 1,
        text: 'No',
      },
    ],
  },
  {
    _id: 1,
    text: 'How much experience did you have with programming before starting this course?',
    choices: [
      {
        _id: 0,
        text: '0-1 hours',
      },
      {
        _id: 1,
        text: '1-10 hours',
      },
      {
        _id: 2,
        text: '10-100 hours',
      },
      {
        _id: 3,
        text: '100 to 1000 hours',
      },
      {
        _id: 4,
        text: 'More than 1000 hours',
      },
    ],
  },
  {
    _id: 2,
    text: 'How much do you agree with the following statement: "I found the application intuitive and easy to use."',
    choices: [
      {
        _id: 0,
        text: 'Strongly Disagree',
      },
      {
        _id: 1,
        text: 'Moderately Disagree',
      },
      {
        _id: 2,
        text: 'Neutral',
      },
      {
        _id: 3,
        text: 'Moderately Agree',
      },
      {
        _id: 4,
        text: 'Strongly Agree',
      },
    ],
  },
  {
    _id: 3,
    text: 'How much do you agree with the following statement: "I found the wording of the questions posed by this tool was clear and easy to understand."',
    choices: [
      {
        _id: 0,
        text: 'Strongly Disagree',
      },
      {
        _id: 1,
        text: 'Moderately Disagree',
      },
      {
        _id: 2,
        text: 'Neutral',
      },
      {
        _id: 3,
        text: 'Moderately Agree',
      },
      {
        _id: 4,
        text: 'Strongly Agree',
      },
    ],
  },
  {
    _id: 4,
    text: 'How much do you agree with the following statement: "I found it easy to correctly answer the questions."',
    choices: [
      {
        _id: 0,
        text: 'Strongly Disagree',
      },
      {
        _id: 1,
        text: 'Moderately Disagree',
      },
      {
        _id: 2,
        text: 'Neutral',
      },
      {
        _id: 3,
        text: 'Moderately Agree',
      },
      {
        _id: 4,
        text: 'Strongly Agree',
      },
    ],
  },
  {
    _id: 5,
    text: 'How much do you agree with the following statement: "I found answering the questions to be beneficial to my understanding of programming."',
    choices: [
      {
        _id: 0,
        text: 'Strongly Disagree',
      },
      {
        _id: 1,
        text: 'Moderately Disagree',
      },
      {
        _id: 2,
        text: 'Neutral',
      },
      {
        _id: 3,
        text: 'Moderately Agree',
      },
      {
        _id: 4,
        text: 'Strongly Agree',
      },
    ],
  },
]

const quiz = {
  _id: '1',
  questions: surveyQuestions,
}

const SurveyPage = () => {
  const { id: quizId } = useParams()
  console.log(quizId)
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(
    QuizStatus.IN_PROGRESS
  )
  const quizType = QuizType.SURVEY
  const [userSubmission, setUserSubmission] = useState<CreateSubmission>()
  const submissionMethod = insertSurveySubmissionAsync

  console.log(userSubmission)

  // initialize user submission
  useEffect(() => {
    if (quiz) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUserSubmission((prev: any) => {
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
  }, [quiz])

  return (
    <QuizContext.Provider value={{ quizStatus, setQuizStatus, quizType }}>
      <Box sx={sx.quiz}>
        <Box sx={sx.displayerContainer}>
          <UserSubmissionContext.Provider
            value={{ userSubmission, setUserSubmission, submissionMethod }}
          >
            <QuestionDisplayer questions={quiz.questions} isQlcQuiz={false} />
          </UserSubmissionContext.Provider>
        </Box>
      </Box>
    </QuizContext.Provider>
  )
}

export default SurveyPage
