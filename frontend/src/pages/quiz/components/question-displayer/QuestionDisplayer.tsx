import {} from 'react'
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Link } from 'react-router-dom'
import { Question } from '../../../../models/Quiz'
import { sx } from './styles'
import { QuestionSlider } from './components/question-slider/QuestionSlider'
import QuizIcon from '@mui/icons-material/Quiz'
import { Colour } from '../../../../utils/colour/Colour'
import { useQuizStatusContext } from '../../../../contexts/QuizContext'
import { QuizStatus } from '../../../../utils/enums/QuizStatus'

interface QuestionDisplayerProps {
  questions: Question[] | undefined
  isQlcQuiz: boolean
}

const QuestionDisplayer = ({
  questions,
  isQlcQuiz,
}: QuestionDisplayerProps) => {
  const { quizStatus, setQuizStatus } = useQuizStatusContext()

  const handleStartQuiz = () => {
    setQuizStatus(QuizStatus.IN_PROGRESS)
  }

  return (
    <Box sx={sx.questionDisplayer} data-aos="fade-right">
      <Box sx={sx.leaveQuiz}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            color: 'white',
          }}
        >
          <KeyboardBackspaceIcon sx={{ width: '2rem', fontSize: '2rem' }} />
          <Typography sx={{ fontSize: '1.2rem' }}>
            Leave {isQlcQuiz ? 'quiz' : 'survey'}
          </Typography>
        </Link>
      </Box>
      {questions ? (
        quizStatus !== QuizStatus.NOT_STARTED ? (
          <QuestionSlider questions={questions} isQlcQuiz={isQlcQuiz} />
        ) : (
          <StartConfirmation handleStartQuiz={handleStartQuiz} />
        )
      ) : (
        <Loading />
      )}
    </Box>
  )
}

interface StartConfirmationProps {
  handleStartQuiz: () => void
}

const StartConfirmation = ({ handleStartQuiz }: StartConfirmationProps) => {
  return (
    <Box
      sx={{
        outline: 'px solid white',
        width: '100%',
        height: 'calc(100% - 8rem)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        pt: '8rem',
      }}
    >
      <Card
        data-aos="zoom-in"
        sx={{
          height: '18rem',
          width: '26rem',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '1.5rem',
        }}
      >
        <QuizIcon sx={{ fontSize: '3rem', color: Colour.Secondary.L0 }} />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '0.2rem',
          }}
        >
          <Typography variant="h5" style={{ fontWeight: '500' }}>
            Ready to start?
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: '400' }}>
            This quiz is not timed.
          </Typography>
        </Box>
        <Button variant="contained" onClick={handleStartQuiz}>
          Start Quiz
        </Button>
      </Card>
    </Box>
  )
}

const Loading = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <CircularProgress size={80} color="inherit" />
      <Typography sx={{ fontSize: '1.2rem' }}>Loading quiz...</Typography>
    </Box>
  )
}

export default QuestionDisplayer
