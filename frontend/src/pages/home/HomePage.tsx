import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import NewQuizModal from './components/new-quiz-modal/NewQuizModal'
import { styles, sx } from './styles'
import CatWithLaptop from './components/cat-with-laptop/CatWithLaptop'
import { Colour } from '../../utils/colour/Colour'
import Checkbox from '@mui/material/Checkbox'
import TermsAndConditions from './components/terms-and-conditions/TermsAndConditions'

const HomePage = () => {
  const [showNewQuizModal, setShowNewQuizModal] = useState<boolean>(false);
  const [showTac, setShowTac] = useState<boolean>(false);
  const [tacAccepted, setTacAccepted] = useState<boolean>(false);

  const handleOpenModal = () => setShowNewQuizModal(true);
  const handleCloseModal = () => setShowNewQuizModal(false);
  const handleTacOnClick = () => {
    tacAccepted ? setTacAccepted(false) : setShowTac(true);
  }
  const handleOnAgree = () => {
    setTacAccepted(true);
    setShowTac(false);
  }
  const handleOnClose = () => {
    setShowTac(false);
  }

  return (
    <>
    <Box sx={sx.login}>
      <Box
        sx={{
          // bgcolor: 'pink',
          maxWidth: 'calc(100% - 36rem)',
          width: 'calc(100% - 36rem)',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
        }}
        >
        <CatWithLaptop />
        <TermsAndConditions
          onAgree={handleOnAgree}
          onClose={handleOnClose}
          show={showTac}
          />
      </Box>
      <Box sx={sx.form} style={styles.form} data-aos="fade-left">
        <Box sx={sx.formContent}>
          <Box sx={sx.contentHeader}>
            <Typography
              variant="h1"
              sx={{
                bgcolor: '',
                fontWeight: '500',
                fontSize: '3.5rem',
                color: Colour.Primary.L5,
              }}
            >Questions on Learners' Code</Typography>
            <Typography
              variant="h2"
              sx={{ bgcolor: '', fontWeight: '300', fontSize: '1.75rem' }}
              >Part 4 Project</Typography>
          </Box>
          <Box sx={sx.contentBody}>
            <Button
              variant="contained"
              sx={{
                width: '24rem',
                maxWidth: '100%',
                height: '3.5rem',
                fontSize: '1.25rem',
              }}
              type="submit"
              onClick={handleOpenModal}
              disabled={!tacAccepted}
              >New Quiz</Button>

            <Box
              sx={{
                  // outline: '1px solid black',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'start',
                  width: '100%'
              }}
              >
                <Box
                sx={{

                }}
                >
              <Checkbox 
                  checked={tacAccepted}
                  onClick={handleTacOnClick}
                  style={{
                      transition: '1s ease',
                  }}
                  />
                </Box>
              <Box>
                <Typography
                  fontWeight='500'
                  fontSize='1.2rem'
                  sx={{
                    pt: 'calc(.2rem * 2)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    ':hover': {
                      color: tacAccepted ? '' : Colour.Secondary.L1
                    },
                    ':active': {
                      color: Colour.Secondary.L2
                    }
                  }}
                  onClick={() => setShowTac(prev => !prev)}
                  >Participant Information Sheet</Typography>
                <Typography 
                  fontWeight='300'
                  fontSize='.9rem'
                  >
                  Before you start, please read and agree to the Participant Information Sheet. Submission of the questionnaire will be taken as consent. 
                </Typography>
                </Box>
              </Box>

          </Box>
        </Box>
      </Box>
    </Box>
    <NewQuizModal
      show={showNewQuizModal}
      handleClose={handleCloseModal}
      />
    </>    
  )
}

export default HomePage