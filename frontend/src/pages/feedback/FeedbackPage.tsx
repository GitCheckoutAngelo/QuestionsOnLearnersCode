import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { sx } from './styles'
import { insertFeedbackSubmissionAsync } from '../../api/feedback'
import { useParams } from 'react-router-dom'

const FeedbackPage = () => {
  const { id: quizId } = useParams()
  const [feedbackText, setFeedbackText] = useState('')
  const [showTextField, setShowTextField] = useState<boolean>(true)

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFeedbackText(e.target.value)
  }

  const handleSubmitFeedback = () => {
    if (quizId) {
      insertFeedbackSubmissionAsync({
        quizId: quizId,
        text: feedbackText,
      })
      // alert('Your feedback has been received!')
      setShowTextField(false);
    }
  }

  return (
    <>
      <Box
        data-aos='zoom-in'
        sx={sx.page}
        >
        <Box
          sx={{
            // outline: '1px solid white',
            maxWidth: '36rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
          <Typography 
            color="white" 
            // sx={{ bgcolor: 'red' }} 
            textAlign='center' 
            variant="h3"
            >
            Thank you for participating!
          </Typography>
          <Typography 
            color="white" 
            variant="h6" 
            sx={{ 
              mt: '8px', 
              fontWeight: '300'
            }} 
            textAlign='center'
            >
            If you have any feedback or additional comments for us, please type
            them into the box below. Otherwise, feel free to close the tab!
          </Typography>
        </Box>
        {showTextField ? 
          <Box 
            sx={{ 
              width: '36rem',
            }} 
            display="flex" 
            flexDirection="column"
            justifyContent='center'
            alignItems='center'
            >
            <TextField
              multiline
              fullWidth
              rows={8}
              variant="filled"
              onChange={handleTextFieldChange}
              sx={{
                mt: '8px',
                color: 'white',
                multilineColor:{
                  color:'white'
              }
              }}
              inputProps={{
                style: {
                  color: 'white'
                }
              }}
            />
            <Button
              sx={sx.button}
              variant="contained"
              fullWidth
              onClick={handleSubmitFeedback}
            >
              Submit
            </Button>
          </Box>
          : 
          <Typography color='white' variant='h6' fontWeight='200'>
            ~ Your feedback has been received ~
          </Typography>}
      </Box>
    </>
  )
}

export default FeedbackPage
