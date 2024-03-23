import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import bgImage from './assets/bg.svg'
import HomePage from './pages/home/HomePage'
import QuizPage from './pages/quiz/QuizPage'
import SurveyPage from './pages/survey/SurveyPage'
import FeedbackPage from './pages/feedback/FeedbackPage'

import useAos from './hooks/useAos'

const theme = createTheme({
  typography: {
    fontFamily: ['Anek Malayalam', 'sans-serif'].join(','),
  },
})

const sx = {
  app: {
    width: '100vw',
    height: '100vh',
  },
}

function App() {
  useAos()

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={sx.app}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/survey/:id" element={<SurveyPage />} />
          <Route path="/feedback/:id" element={<FeedbackPage />}></Route>
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
