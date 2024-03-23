import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material'
import angeloImg from '../../../../../../assets/angelo-pfp.jpg'
import nicholasImg from '../../../../../../assets/nicholas-pfp.png'
import ewanImg from '../../../../../../assets/ewan-pfp.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface TeamMemberData {
    name: string,
    img: string,
    role: string
}

const researchTeamData: TeamMemberData[] = [
    {
        name: 'Angelo Tangonan',
        img: angeloImg,
        role: 'Principal Investigator'
    },
    {
        name: 'Nicholas Yao',
        img: nicholasImg,
        role: 'Principal Investigator'
    },
    {
        name: 'Ewan Tempero',
        img: ewanImg,
        role: 'Supervisor'
    }
];



const Overview = () => {
    const [expanded, setExpanded] = useState<boolean>(true);

    const handleOnClick = () => {
        setExpanded(prev => !prev);
    }

    const renderTeamMembers = () => {
        return researchTeamData.map(member => {
            return (
                <Box
                    sx={{
                        // outline: '1px solid gray',
                        // p: '1rem'
                        width: '12rem'
                    }}
                    >
                    <Box 
                        component='img'
                        src={member.img}
                        sx={{
                            width: '11rem'
                        }}
                        />
                    <Typography
                        sx={{
                            fontWeight: '500',
                            fontSize: '1.4rem'
                        }}
                        >{member.name}</Typography>
                    <Typography
                        sx={{
                            fontWeight: '400',
                            fontSize: '1rem'
                        }}
                        >{member.role}</Typography>
                </Box>
            );
        });
    }

    return (
        <Accordion
            expanded={expanded}
            sx={{
                borderBottom: '0px solid white',
                boxShadow: 'none'
            }}
            
            >
            <AccordionSummary
                onClick={handleOnClick}
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                      transform: 'rotate(90deg)',
                    },
                  }}
                >
                <Typography
                    variant='h4'
                    >Overview</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    borderTop: '1px solid rgba(0, 0, 0, .125)',
                }}
                >
                <Typography
                    variant='h5'
                    sx={{mb:'1rem'}}
                    >Project Title: Questions on Learner's Code</Typography>
                <Typography
                    variant='h5'
                    >Research Team</Typography>
                <Box
                    sx={{
                        // outline: "1px solid black",
                        display: 'flex',
                        justifyContent: 'start',
                        columnGap: '3rem',
                        p: '1rem'
                    }}
                    >
                    {renderTeamMembers()}
                </Box>
                <Typography>
                    Our names are Angelo Tangonan and Nicholas Yao and we would like to invite you to take part in a research study. Before you decide whether to participate, you need to understand why the research is being done and what it would involve for you. Please take time to read the following information carefully. Ask questions if anything you read is not clear or if you would like more information. If you prefer, a kanohi-ki-te-kanohi meeting can be arranged after first contact to answer any questions you might have. Take time to decide whether or not you wish to take part.
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default Overview