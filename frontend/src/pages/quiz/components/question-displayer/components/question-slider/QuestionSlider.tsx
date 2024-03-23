import { Box } from '@mui/system'
import { Question } from '../../../../../../models/Quiz'
import { sx } from './styles'
import { Button, Typography, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserSubmissionContext } from '../../../../../../contexts/UserSubmissionContext'
import { useQuizStatusContext } from '../../../../../../contexts/QuizContext'
import { QuizStatus } from '../../../../../../utils/enums/QuizStatus'
import { QuizType } from '../../../../../../utils/enums/QuizType'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { QuestionForm } from './components/question-form/QuestionForm'
import { SliderIndicator } from './components/slider-indicator/SliderIndicator'

interface QuestionSliderProps {
  questions: Question[]
  isQlcQuiz: boolean
}

export const QuestionSlider = ({
  questions,
  isQlcQuiz,
}: QuestionSliderProps) => {
  const { id: quizId } = useParams()
  const [currentQuestionNum, setCurrentQuestionNum] = useState<number>(1)
  const [questionsVisited, setQuestionsVisited] = useState<number[]>([])
  const { userSubmission, submissionMethod } = useUserSubmissionContext()
  const { quizStatus, setQuizStatus, quizType } = useQuizStatusContext()
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false)
  const [showQuizSummary, setShowQuizSummary] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    setQuestionsVisited((prev) =>
      prev.includes(currentQuestionNum) ? prev : [...prev, currentQuestionNum]
    )
  }, [currentQuestionNum])

  useEffect(() => console.log(questionsVisited), [questionsVisited])

  useEffect(() => {
    if (quizStatus === QuizStatus.HAS_FINISHED && isQlcQuiz) handleOpenQuizSummary();
  }, [quizStatus])

  const handleOpenSurvey = () => {
    navigate(`/survey/${quizId}`)
  }

  const renderQuestionForms = () => {
    return questions.map((question, i) => {
      return (
        <QuestionForm
          key={question._id}
          question={question}
          questionNum={i + 1}
          show={i + 1 === currentQuestionNum}
          numQuestions={questions.length}
        />
      )
    })
  }

  const handleNextOnClick = () => {
    setCurrentQuestionNum((prev) =>
      prev + 1 > questions.length ? prev : prev + 1
    )
  }

  const handlePrevOnClick = () => {
    setCurrentQuestionNum((prev) => (prev === 1 ? prev : prev - 1))
  }

  const handleOpenConfirmSubmit = () => setShowConfirmSubmit(true)
  const handleCloseConfirmSubmit = () => setShowConfirmSubmit(false)
  const handleOpenQuizSummary = () => setShowQuizSummary(true)
  const handleCloseQuizSummary = () => setShowQuizSummary(false)

  const handleSubmitQuiz = () => {
    if (userSubmission) {
      submissionMethod(userSubmission)
      handleCloseConfirmSubmit()
      setQuizStatus(QuizStatus.HAS_FINISHED)
      if (quizType === QuizType.SURVEY) {
        navigate(`/feedback/${quizId}`)
      }
    }
  }

  const getNumUnansweredQuestions = () =>
    userSubmission?.answers.filter((a) => a.choiceIds.length === 0).length

  const getModalMessage = () => {
    const numUnansweredQuestions = getNumUnansweredQuestions();
    return (numUnansweredQuestions === 0 || !isQlcQuiz) ?
      'Once you submit, you cannot change your answers.' : 
      `You have ${numUnansweredQuestions} unanswered questions.`;
  }

  return (
    <Box data-aos="zoom-in" sx={sx.slider}>
      <Box sx={sx.viewFrame}>
        <Box
          sx={{
            ...sx.slidingFrame,
            width: `${questions.length * 100}%`,
            left: `-${currentQuestionNum - 1}00%`,
          }}
        >
          {renderQuestionForms()}
        </Box>
      </Box>
      <Box sx={sx.sliderIndicator}>
        <SliderIndicator
          numQuestions={questions.length}
          currentQuestionNum={currentQuestionNum}
          setCurrentQuestionNum={setCurrentQuestionNum}
          questionsVisited={questionsVisited}
          setQuestionsVisited={setQuestionsVisited}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          width: '75%',
          height: '5rem',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: '1rem' }}>
          <Button
            disabled={currentQuestionNum === 1}
            variant='text'
            sx={sx.navigateButton}
            onClick={handlePrevOnClick}
            startIcon={<NavigateBeforeIcon />}
            disableRipple
          >
            Prev Question
          </Button>
          <Divider 
            sx={{
              bgcolor: 'white',
              height: '2.5rem',
              width: '2px'
            }}
            orientation='vertical'
          />
          <Button
            disabled={currentQuestionNum === questions.length}
            // variant="contained"
            variant='text'
            sx={sx.navigateButton}
            onClick={handleNextOnClick}
            endIcon={<NavigateNextIcon />}
            disableRipple
          >
            Next Question
          </Button>
        </Box>
        <Box sx={{ml: '1rem'}}>
          {quizStatus === QuizStatus.HAS_FINISHED ? (
            quizType === QuizType.QLC ? (
              <Button
                variant="contained"
                sx={sx.viewSummaryButton}
                onClick={handleOpenQuizSummary}
              >
                <Typography>View summary</Typography>
              </Button>
            ) : null
          ) : (
            <Button
              variant="contained"
              sx={sx.submitQuizButton}
              onClick={handleOpenConfirmSubmit}
            >
              <Typography sx={{ fontWeight: '500' }}>Submit {isQlcQuiz ? 'quiz' : 'survey'}</Typography>
            </Button>
          )}
        </Box>
      </Box>
      <ConfirmSubmitModal
        handleOnCancel={handleCloseConfirmSubmit}
        handleOnSubmit={handleSubmitQuiz}
        message={getModalMessage()}
        show={showConfirmSubmit}
      />
      {
        quizType === QuizType.QLC && 
          <QuizSummaryModal
            handleClose={handleCloseQuizSummary}
            handleTakeSurvey={handleOpenSurvey}
            show={showQuizSummary}
            questions={questions}
          />
      }
      
    </Box>
  )
}

interface ConfirmSubmitModalProps {
  handleOnSubmit: () => void
  handleOnCancel: () => void
  message: string
  show: boolean
}

const ConfirmSubmitModal = ({
  handleOnSubmit,
  handleOnCancel,
  message,
  show,
}: ConfirmSubmitModalProps) => {
  return (
    <Box
      sx={{
        // bgcolor: '#FFC0CB4D',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(2px)',
      }}
      style={{
        transform: `scale(${show ? 1 : 0})`,
        transition: '0.2s ease',
      }}
    >
      <Box
        sx={{
          height: '16rem',
          width: '28rem',
          bgcolor: 'white',
          borderRadius: '.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '1.2rem',
          // py: '2rem',
        }}
        style={{
          transform: 'translateY(-20%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Are you sure?</Typography>
          <Typography variant="subtitle1">{message}</Typography>
        </Box>
        <Box>
          <Button onClick={handleOnCancel}>Cancel</Button>
          <Button onClick={handleOnSubmit}>Submit</Button>
        </Box>
      </Box>
    </Box>
  )
}


import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface QuestionResult {
  questionNum: number,
  selectedChoice: number | undefined,
  correctChoice: number | undefined,
}

interface QuizSummaryModalProps {
  handleTakeSurvey: () => void
  handleClose: () => void
  show: boolean,
  questions: Question[]
}

const QuizSummaryModal = ({
  handleTakeSurvey,
  handleClose,
  show,
  questions
}: QuizSummaryModalProps) => {
  const { userSubmission } = useUserSubmissionContext()


  const getTotalScore = () => {
    let totalScore = 0;
    questions.forEach((question, i) => {
      // check if answer
      const correctChoices = question.choices.filter(c => c.isCorrect).map(c => c._id);
      const userChoices = userSubmission? userSubmission.answers[i].choiceIds : [];
      const remainderCorrectChoices = correctChoices.filter(correctChoice => !userChoices.includes(correctChoice));

      if (remainderCorrectChoices.length === 0) totalScore++;
    });

    return totalScore;
  }

  const getQuizSummaryData = (): QuestionResult[] => {
    return questions.map(q => {
      const selectedChoices = userSubmission?.answers[q._id];
      const correctChoices = q.choices.filter(c => c.isCorrect);

      return {
        questionNum: Number(q._id) + 1,
        selectedChoice: selectedChoices ? [...selectedChoices.choiceIds].pop() : undefined,
        correctChoice: [...correctChoices].pop()?._id,
      };
    });
  }

  return (
    <Box
      sx={{
        // bgcolor: '#FFC0CB4D',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: show ? 1 : 0,
      }}
      style={{
        transform: `scale(${show ? 1 : 0})`,
        transition: '0.2s ease',
      }}
    >
      <Box
        sx={{
          height: 'calc(100% - (4rem))',
          width:  'calc(100% - (4rem))',
          py: '2rem',
          px: '2rem',

          bgcolor: 'white',
          borderRadius: '.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          rowGap: '1.2rem',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
        style={{
          transform: 'translateY(0)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'calc(100%)',
          }}
          >
          <Box
            sx={{
              py: '.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
            <Typography variant="h5" sx={{ fontWeight: '500' }}>Quiz Summary</Typography>
            <Typography variant="h6" sx={{ fontWeight: '400' }}>Score: {getTotalScore()}/{questions.length}</Typography>
          </Box>
          <QuestionResultTable
            results={getQuizSummaryData()}
            />
        </Box>
        <Box
          sx={{
            // outline: '1px solid gray',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          >
          <Box
            sx={{
              // outline: '1px solid gray',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            >
            <Button
              variant='outlined'
              sx={{
                display: 'flex',
                columnGap: '.4rem',
                textTransform: 'none'
              }}
              onClick={handleClose}>
              <ArrowBackIcon fontSize='small'/> 
              <Typography>
                Review questions
              </Typography>
            </Button>
            <Button 
              variant='contained'
              sx={{
                display: 'flex',
                columnGap: '.4rem',
                textTransform: 'none'
              }} 
              onClick={handleTakeSurvey}
              >
              <Typography>Proceed to survey</Typography> 
              <ArrowForwardIcon fontSize='small'/>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}



import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

interface QuestionResultTableProps {
  results: QuestionResult[]
}

const QuestionResultTable = ({ results }: QuestionResultTableProps) => {

  useEffect(() => console.log(results), []);

  const getChoiceCode = (choiceId: number) => {
    const choiceIdAsNum = parseInt(`${choiceId}`); // when using '+' operator choiceId becomes a string for some reason
    return typeof choiceIdAsNum === 'number' ? String.fromCharCode(65 + choiceIdAsNum) : null;
  }

  return (
    <TableContainer 
      sx={{
        // outline: '1px solid red',
        width: '100%',
        border: '0',
      }}
      >
      <Table 
        sx={{ 
          width: '100%',
          border: '0',
        }} 
        aria-label="simple table"
        >
        <TableHead>
          <TableRow sx={{ '> *' : { fontSize: '1rem'} }}>
            <TableCell>Question</TableCell>
            <TableCell align="right">Selected choice</TableCell>
            <TableCell align="right">Correct choice</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((questionResult: QuestionResult) => (
            <TableRow
              key={questionResult.questionNum}
              sx={{ 
                '&:last-child td, &:last-child th': { 
                  border: 0,
                },
                '> *' : { 
                  fontSize: '1rem',
                }
              }}
              >
              <TableCell scope="row">{questionResult.questionNum}</TableCell>
              <TableCell align="right">{questionResult.selectedChoice ? getChoiceCode(questionResult.selectedChoice) : '--'}</TableCell>
              <TableCell align="right">{getChoiceCode(questionResult.correctChoice!)}</TableCell>
              <TableCell align="right" sx={{ bgcolor: '', display: 'flex' }}>{
                questionResult.selectedChoice === questionResult.correctChoice ? 
                  <CheckIcon fontSize='small' sx={{ color: 'green' }}/> 
                  : 
                  <ClearIcon fontSize='small' sx={{ color: 'red' }}/>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}