import {  } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Overview from './components/overview/Overview'
import StudyOutline from './components/study-outline/StudyOutline'
import ParticipantInformation from './components/participant-information/ParticipantInformation'
import CompsciLogo from '../../../../assets/compsci-logo.svg'
import ContactDetails from './components/contact-details/ContactDetails'

interface TermsAndConditionsProps {
    show: boolean,
    onAgree: () => void,
    onClose: () => void,
}

const TermsAndConditions = ({ 
    show, 
    onAgree, 
    onClose 
}: TermsAndConditionsProps) => {

    return (
        <Box
            sx={{
                position: 'absolute',
                top: show ? '0rem' : '100%',
                left: '0rem',
                height: 'calc(100% - 8rem)',
                width: 'calc(100% - 36rem - 8rem)',
                bgcolor: 'white',
                padding: '4rem',
                overflowY: 'scroll',

                display: 'flex',
                flexDirection: 'column',
                rowGap: '3rem'
            }}
            style={{
                transition: '.4s ease'
            }}
            >
            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                >
                <Box
                    component='img'
                    src={CompsciLogo}
                    sx={{
                        height: '7rem',
                    }}
                    />
                <Box>
                    <Typography>Room 405, Level 4</Typography>
                    <Typography>Science Centre Building 303</Typography>
                    <Typography>38 Princes Street</Typography>
                    <Typography>Auckland 1010</Typography>
                </Box>
                <Box>
                    <Typography>Phone: +64 9 373 7599 ext 82930</Typography>
                    <Typography>Fax: + 64 9373 7453</Typography>
                    <Typography>Email: office@cs.auckland.ac.nz</Typography>
                </Box>
                <Box>
                    <Typography>School of Computer Science</Typography>
                    <Typography>The University of Auckland</Typography>
                    <Typography>Private Bag 92019</Typography>
                    <Typography>Auckland 1142</Typography>
                    <Typography>New Zealand</Typography>
                </Box>
            </Box>
            <Typography variant='h3'>Participant Information Sheet</Typography>
            <Box>
                <Overview />
                <StudyOutline />
                <ParticipantInformation />
                <ContactDetails />
            </Box>
            <Box
                sx={{
                    // outline: '1px solid gray',
                    display: 'flex',
                    justifyContent: 'end',
                    columnGap: '.5rem'
                }}>
                <Button
                    variant='contained'
                    sx={{
                        height: '100%',
                        width: '8rem'
                        // borderRadius: '10%'
                    }}
                    onClick={onAgree}
                    >I Agree</Button>
                <Button
                    variant='outlined'
                    sx={{
                        height: '100%',
                        width: '8rem'
                    }}
                    onClick={onClose}
                    >Close</Button>
            </Box>
        </Box>
    )
}

export default TermsAndConditions