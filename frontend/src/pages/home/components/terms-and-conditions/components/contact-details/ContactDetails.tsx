import { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const dot = (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      mx: '.4rem',
      transform: 'scale(1)',
      outline: '0px solid black',
      // bgcolor: 'red',
      // width: '.4rem',
      // height: '.4rem'
    }}
  >
    •
  </Box>
)

const ContactDetails = () => {
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
        <Typography variant="h4">Contact Details</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1.5rem',
          borderTop: '1px solid rgba(0, 0, 0, .125)',
        }}
      >
        <Typography
          variant="h5"
          sx={
            {
              // outline: '1px solid gray',
            }
          }
        >
          Who should you contact for further information?
        </Typography>
        <List
          sx={{
            width: '100%',
            maxWidth: '32rem',
            bgcolor: 'background.paper',
            // outline: '1px solid gray',
            p: 0,
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Typography fontWeight={500}>Angelo Rojas Tangonan</Typography>
              }
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Principal Investigator{dot}(+64) 22 158 2076{dot}
                  atan958@aucklanduni.ac.nz
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={<Typography fontWeight={500}>Nicholas Yao</Typography>}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Principal Investigator{dot}(+64) 21 0283 2813{dot}
                  nyao974@aucklanduni.ac.nz
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={<Typography fontWeight={500}>Ewan Tempero</Typography>}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Supervisor{dot}09 923 3765{dot}e.tempero@auckland.ac.nz
                </Typography>
              }
            />
          </ListItem>
        </List>
        <SubSection
          title={'UAHPEC Chair contact details:'}
          body={[
            'For any queries regarding ethical concerns you may contact the Chair, The University of Auckland Human Participants Ethics Committee, Office of Research Strategy and Integrity, The University of Auckland, Private Bag 92019, Auckland 1142. Telephone 09 373-7599 ext. 83711. Email: humanethics@auckland.ac.nz',
            'Approved by the University of Auckland Human Participants Ethics Committee on 21/09/2023 for three years. Reference Number UAHPEC26505.',
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

export default ContactDetails
