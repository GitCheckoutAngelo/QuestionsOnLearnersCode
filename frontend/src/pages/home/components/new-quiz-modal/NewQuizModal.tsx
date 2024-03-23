import { Backdrop, Button, Fade, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Program } from '../../../../models/ProgramFile'
import { sx } from './styles'
import { createQuizAsync } from '../../../../api/quiz'
import { NewQuizLoading } from './components/new-quiz-loading/NewQuizLoading'
import newQuizIcon from '../../../../assets/new-quiz-icon.svg'
import './NewQuizModal.scss'
import FileUpload from './components/file-upload/FileUpload'
import { Colour } from '../../../../utils/colour/Colour'

interface NewQuizModalProps {
  show: boolean
  handleClose: () => void
}

const NewQuizModal = ({ show, handleClose }: NewQuizModalProps) => {
  const [programFile, setProgramFile] = useState<Program>()
  const [loading, setLoading] = useState<boolean>(false)
  const [createQuizError, setCreateQuizError] = useState<boolean>(false)
  const [showHelperText, setShowHelperText] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (programFile) setShowHelperText(false)
  }, [programFile])

  const handleCreateQuizOnClick = () => {
    if (programFile) {
      const handleCreateQuizAsync = async () => {
        setLoading(true)
        const quizId = await createQuizAsync(programFile.file!)
        if (quizId) {
          navigate(`/quiz/${quizId}`)
        } else {
          setLoading(false)
          setCreateQuizError(true)
        }
      }
      handleCreateQuizAsync()
    } else {
      setShowHelperText(true)
    }
  }

  const handleClearProgramFile = () => setProgramFile(undefined)
  const handleAddProgramFile = (file: File) => {
    const fileFormat = file.name.split('.').pop()
    if (fileFormat === 'py') {
      const newProgramFile = {
        _id: '0',
        authorId: '0',
        file,
      }
      setProgramFile(newProgramFile)
    } else {
      alert("File submissions must be in '.py' format")
    }
  }

  return (
    <Modal
      open={show}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { TransitionComponent: Fade } }}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
    >
      <Fade in={show}>
        <Box sx={sx.content}>
          <Box
            sx={{
              // outline: '1px solid blue',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              py: '1rem',
            }}
          >
            <Box
              component="img"
              src={newQuizIcon}
              sx={{
                height: '1.8rem',
                // outline: '1px solid #D3D3D3',
                textAlign: 'center',
              }}
            />
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
              }}
            >
              Create new quiz
            </Typography>
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontSize: '1rem',
                fontWeight: '400',
              }}
              sx={{ mt: '12px' }}
            >
              If you are in COMPSCI130:<br/>
              Please upload your Ass.py file from the solitaire assignment.<br/><br/>
              If you are in COMPSCI101:<br/>
              Please upload your solution to the connect 4 assignment.<br/><br/>
              If you wish to upload a different file, you may do so. For the best results, this file should have several different functions (preferably at least 3 or 4).<br/><br/>
              Submitted files must be in .py format.
            </Typography>
          </Box>
          {loading ? (
            <Box
              sx={{
                // outline: '1px solid black',
                // bgcolor: 'pink',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '1rem',
                position: 'relative',
              }}
            >
              <NewQuizLoading />
              <Typography
                sx={{ color: Colour.Secondary.L1, fontWeight: '500' }}
              >
                Creating questions...
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                // outline: '1px solid #D3D3D3',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FileUpload
                programFile={programFile}
                removeOnClick={handleClearProgramFile}
                fileOnChange={handleAddProgramFile}
                error={showHelperText}
              />
              <Box
                sx={{
                  // outline: '1px solid red',
                  width: 'calc(100% - 3rem)',
                  py: '.5rem',
                }}
              >
                {showHelperText && 
                  <Typography
                    sx={{
                      transition: '0.2s ease',
                    }}
                  >
                    Please select a file.
                  </Typography>
                }
                {createQuizError && 
                  <Typography
                    sx={{
                      opacity: createQuizError ? '1' : '0',
                      transition: '0.2s ease',
                    }}
                  >
                    An error occurred while creating the quiz. Please make sure the file you uploaded has valid syntax.
                  </Typography>
                }
              </Box>
            </Box>
          )}
          <Box
            sx={{
              // outline: '1px solid red',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              columnGap: '1rem',
            }}
          >
            <Button
              variant="contained"
              sx={{ width: '8rem' }}
              onClick={handleCreateQuizOnClick}
              disabled={loading}
            >
              Create
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ width: '8rem' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default NewQuizModal
