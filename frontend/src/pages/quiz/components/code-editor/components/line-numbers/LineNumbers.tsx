import {  } from 'react'
import { Colour } from '../../../../../../utils/colour/Colour';
import { Box } from '@mui/material'

interface LineNumbersProps {
    numberOfLines: number,
    fontSize: string,
    height: string,
}

const LineNumbers = ({ numberOfLines, fontSize, height }: LineNumbersProps) => {

    const getText = () => {
        let text = '';
        for (let i=1; i<=numberOfLines; i++) {
            text += `${i}\n`
        }
        return text;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                position: 'absolute',
                left: '0',
                top: '0',
                width: '3.5rem',
                height: height,
            }}
            >
            <pre
                style={{ 
                    width: '2rem',
                    margin: '0',
                    textAlign: 'right',
                    scrollbarWidth: 'none',
                    zIndex: '5',
                }}
                >
                <code 
                    style={{
                        fontSize: fontSize,
                        color: Colour.Secondary.L0,
                        lineHeight: '1.5rem'
                    }}
                    >
                {getText()}
                </code>
            </pre>
        </Box>
    )
}

export default LineNumbers