import { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ParticipantInformation = () => {
  const [expanded, setExpanded] = useState<boolean>(true)

  const handleOnClick = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <Accordion
      expanded={expanded}
      sx={{
        borderBottom: '0px solid white',
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        onClick={handleOnClick}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
        }}
      >
        <Typography variant="h4">Participant Information</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, .125)',
        }}
      >
        <SubSection
          title={'Confidentiality'}
          body={[
            'Confidentiality will be maintained throughout the study as all responses are anonymous.',
          ]}
        />
        <SubSection
          title={
            'How Will the Information Gathered in this Study be Stored and Protected?'
          }
          body={[
            'Any information gathered during this study will be saved securely on Firebase. All responses to the questionnaire are anonymous, so you will not be able to withdraw your data once it has been provided.',
            'If you wish to receive a summary of the results, please email Ewan (contact information below).  Your email address will not be linked to your collected data.',
          ]}
        />
        <SubSection
          title={'What Will Happen to the Results of this Study?'}
          body={[
            'The results may be published in academic venues such as journals or conferences or in academic presentations.',
          ]}
        />
      </AccordionDetails>
    </Accordion>
  )
}

interface SubSectionProps {
  title: string
  body: string[]
}

const SubSection = ({ title, body }: SubSectionProps) => {
  const renderBody = () => {
    return body.map((paragraph) => <Typography>{paragraph}</Typography>)
  }

  return (
    <Box
      sx={{
        // outline: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '.5rem',
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {renderBody()}
    </Box>
  )
}

export default ParticipantInformation
