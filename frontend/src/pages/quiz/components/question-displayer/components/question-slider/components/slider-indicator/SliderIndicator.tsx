import {  } from "react"
import { Box } from "@mui/system"
import { IconButton, Tooltip, Typography } from "@mui/material"
import { Colour } from "../../../../../../../../utils/colour/Colour"
import { useUserSubmissionContext } from "../../../../../../../../contexts/UserSubmissionContext"

interface SliderIndicatorProps {
    numQuestions: number,
    currentQuestionNum: number,
    setCurrentQuestionNum: (num: number) => void,
    questionsVisited: number[],
    setQuestionsVisited: (questionsVisited: number[]) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SliderIndicator = ({ numQuestions, currentQuestionNum, setCurrentQuestionNum, questionsVisited }: SliderIndicatorProps) => {
    const { userSubmission } = useUserSubmissionContext();
    
    const renderIndicatorButtons = () => {
        return (
            [...Array(numQuestions).keys()].map(questionId => {
                const addOnStyle = getIndicatorButtonAddOnStyle(questionId);
                const isVisited = questionIsVisited(questionId);
                const isAnswered = questionIsAnswered(questionId);

                return (
                    <Tooltip 
                        title={
                            <Typography sx={{ fontSize: '1rem' }}>{`Q${questionId+1} (${isVisited ? isAnswered ? 'answered' : 'not answered' : 'not viewed'})`}</Typography>
                        } 
                        arrow
                        key={questionId} 
                        >
                        <IconButton 
                            onClick={() => setCurrentQuestionNum(questionId+1)} 
                            sx={{ 
                                width: '2rem', 
                                height: '1.15rem', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                position: 'relative', 
                                cursor: 'pointer'
                            }}
                            >
                            <Box 
                                sx={{ 
                                    position: 'absolute', 
                                    height: '100%', 
                                    width: '100%', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    transition: '0.1s ease',
                                    ...addOnStyle.button
                                }}
                                >
                                <Typography 
                                    sx={{ 
                                        fontSize: '1rem', 
                                        fontWeight: '400',
                                        ...addOnStyle.text
                                    }}
                                    >
                                    {(currentQuestionNum === questionId+1) ? questionId+1 : ''}
                                </Typography>
                            </Box>
                        </IconButton>
                    </Tooltip>
                );
            })
        );
    }

    const questionIsAnswered = (questionId: number) => {
        return userSubmission && userSubmission.answers[questionId].choiceIds.length > 0;
    }

    const questionIsVisited = (questionId: number) => {
        const questionNum = questionId + 1;
        return questionsVisited.includes(questionNum);
    }

    const getIndicatorButtonAddOnStyle = (questionId: number) => {
        const isCurrent = (currentQuestionNum-1 === questionId);
        const isAnswered = questionIsAnswered(questionId);
        const isVisited = questionIsVisited(questionId);

        return {
            button: {
                bgcolor: isVisited ? isAnswered ? isCurrent ? Colour.Secondary.L0 : 'white' : isCurrent ? Colour.Primary.L3 : Colour.Primary.L1 : Colour.Primary.L5,
                outline: isCurrent ? `0.15rem solid white` : '',
                boxShadow: isCurrent ? `inset 0 0 4px ${Colour.Secondary.L1}` : '',
            },
            text: {
                color: isCurrent ? isAnswered ? Colour.Primary.L5 : 'white' : 'white',
            }
        };
    }

    return (
        <Box 
            sx={{ 
                width: '100%', 
                height: '3rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                columnGap: '1rem', 
                bgcolor: '', 
                outline: '0px solid white', 
                position: 'relative' 
            }}
            >
            <Box 
                sx={{ 
                    height: '0.15rem', 
                    width: `calc(100% - 3rem)`, 
                    position: 'absolute', 
                    left: '1.5rem', 
                    top: 'calc(50% - 0.1rem)', 
                    bgcolor: Colour.Primary.L5, 
                }}
                >
                <Box 
                    sx={{ 
                        width: `${((currentQuestionNum-1)/(numQuestions-1)) * 100}%`, 
                        height: '100%', 
                        bgcolor: 'white', 
                        transition: '0.6s ease' 
                    }}>
                </Box>
            </Box>
            {renderIndicatorButtons()}
        </Box>
    );
}