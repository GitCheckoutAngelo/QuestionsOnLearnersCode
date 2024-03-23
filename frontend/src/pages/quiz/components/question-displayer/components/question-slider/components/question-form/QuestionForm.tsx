import { useState, useEffect } from 'react'
import { Question } from '../../../../../../../../models/Quiz'
import { useUserSubmissionContext } from '../../../../../../../../contexts/UserSubmissionContext'
import { useQuizStatusContext } from '../../../../../../../../contexts/QuizContext'
import { CreateSubmission } from '../../../../../../../../dtos/submission/CreateSubmission'
import { QuizStatus } from '../../../../../../../../utils/enums/QuizStatus'
import { Colour } from '../../../../../../../../utils/colour/Colour'
import { Button, Box, Typography } from '@mui/material'
import { sx } from './styles'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { QuizType } from '../../../../../../../../utils/enums/QuizType'

interface QuestionFormProps {
  question: Question
  questionNum: number
  show: boolean
  numQuestions: number
}

export const QuestionForm = ({
  question,
  questionNum,
  show,
  numQuestions,
}: QuestionFormProps) => {
  const [chosenChoiceIds, setChosenChoiceIds] = useState<number[]>([])
  const [isMultiSelect] = useState<boolean>(false) // TO REMOVE
  const { setUserSubmission } = useUserSubmissionContext()
  const { quizStatus, quizType } = useQuizStatusContext()

  useEffect(
    () => handleSetQuestionAnswer(question._id, chosenChoiceIds),
    [chosenChoiceIds]
  )

  const handleSetQuestionAnswer = (questionId: number, choiceIds: number[]) => {
    setUserSubmission((prev: CreateSubmission | undefined) => {
      if (prev) {
        const questionAnswer = {
          questionId,
          choiceIds,
        }

        const newUserSubmission: CreateSubmission = { ...prev }
        newUserSubmission.answers[questionId] = questionAnswer

        return newUserSubmission
      } else {
        return prev
      }
    })
  }

  const renderChoices = () => {
    const quizIsFinished = quizStatus === QuizStatus.HAS_FINISHED

    return question.choices.map((choice, i) => {
      const isSelected = chosenChoiceIds.includes(choice._id)

      return (
        <Button
          key={choice._id}
          onClick={() => handleChoiceOnClick(choice._id)}
          variant={'text'}
          style={{ transition: `0.1s ease` }}
          disableRipple={quizIsFinished}
          sx={{
            width: '100%',
            minHeight: '4rem',
            textTransform: 'none',
            pointerEvents: quizIsFinished ? 'none' : 'auto',
            bgcolor: quizIsFinished
              ? choice.isCorrect || (quizType === QuizType.SURVEY && isSelected)
                ? '#FFD43B'
                : null
              : '#FFFFFF0D',
            color:
              quizIsFinished &&
              (choice.isCorrect || (quizType === QuizType.SURVEY && isSelected))
                ? Colour.Primary.L5
                : 'white',
            outline: `${isSelected ? 2 : 0}px solid #FFFFFF`,
            ':hover': {
              bgcolor: quizIsFinished ? null : '#FFFFFF1A',
            },
          }}
        >
          <Typography
            sx={{ width: '4rem', textAlign: 'center', fontSize: '1.2rem' }}
          >
            {`${String.fromCharCode(65 + i)}.`}
          </Typography>
          <Typography
            sx={{
              width: 'calc(100% - 5rem)',
              textAlign: 'start',
              fontSize: '1rem',
              fontWeight: '',
            }}
          >
            {choice.text}
          </Typography>
          <Box
            sx={{
              width: '4rem',
              textAlign: 'center',
              fontSize: '1.2rem',
              // outline: '1px solid white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {quizIsFinished && isSelected && quizType === QuizType.QLC ? (
              choice.isCorrect ? (
                <CheckCircleOutlineOutlinedIcon sx={{ fontSize: '2rem' }} />
              ) : (
                <CancelOutlinedIcon sx={{ fontSize: '2rem' }} />
              )
            ) : null}
          </Box>
        </Button>
      )
    })
  }

  const handleChoiceOnClick = (choiceId: number) => {
    if (quizStatus === QuizStatus.IN_PROGRESS) {
      setChosenChoiceIds((prev) => {
        if (isMultiSelect) {
          return prev.includes(choiceId)
            ? prev.filter((cid) => cid !== choiceId)
            : [...prev, choiceId]
        } else {
          return prev.includes(choiceId) ? [] : [choiceId]
        }
      })
    }
  }

  return (
    <Box
      sx={{
        ...sx.questionForm,
        width: `${100 / numQuestions}%`,
        opacity: show ? '1' : '0',
      }}
    >
      <Box sx={sx.questionFormContent}>
        <Box sx={sx.question}>
          <Typography sx={{ width: '3.75rem', fontSize: '1.2rem' }}>
            {`Q${questionNum}.`}
          </Typography>
          <Box flexDirection="column" sx={{ width: '100%' }}>
            {question.text.split('\n').map((line) => (
              <Typography
                sx={{ width: 'calc(100% - 3.75rem)', fontSize: '1.2rem' }}
              >
                {line}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={sx.choices}>{renderChoices()}</Box>
      </Box>
    </Box>
  )
}
