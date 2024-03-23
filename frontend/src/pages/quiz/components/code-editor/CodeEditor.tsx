import { useState, useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material'

import { Colour } from '../../../../utils/colour/Colour'
import { Program } from '../../../../models/ProgramFile'
import { sx } from './styles'
import { getProgramByIdAsync } from '../../../../api/program'
import Code from './components/code/Code'
import LineNumbers from './components/line-numbers/LineNumbers'

// import Prism from 'prismjs'
// import 'prismjs/components/prism-python' // Language
// import 'prismjs/themes/prism-okaidia.css' // Theme

const theme = createTheme({
  typography: {
    fontFamily: ['Fira Code', 'sans-serif'].join(','),
  },
})

interface CodeEditorProps {
  programId: string
}

const CodeEditor = ({ programId }: CodeEditorProps) => {
  const [program, setProgram] = useState<Program>()
  const [programLines, setFileLines] = useState<string[]>([])
  const [entireText, setEntireText] = useState<string>('')

  useEffect(() => {
    const loadProgramContentAsync = async () => {
      const p = await getProgramByIdAsync(programId)
      p ? setProgram(p) : console.log('No program file')

      if (p) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const text = e.target?.result
          if (text) {
            const trimmedText = (text as string).trim()
            const textSplitArr = trimmedText.split(/\r?\n/)
            setFileLines(textSplitArr)
            setEntireText(trimmedText)
          } else {
            setEntireText(text as string)
          }
          
        }
        reader.readAsText(p.file!, 'UTF-8')
      }
    }
    loadProgramContentAsync()
  }, [])

  const editorFontSize = '1rem'

  return (
    <Box sx={sx.codeEditor} data-aos="fade-left">
      <Box>
        <Box
          sx={{
            bgcolor: Colour.Primary.L5,
            height: '2.4rem',
            position: 'absolute',
            px: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '1rem' }}>
            Python
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: Colour.Primary.L5,
            minHeight: '2.4rem',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '1rem' }}>
            {program?.file?.name}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: 'calc(100% - 2.4rem)',
          px: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          overflowY: 'visible',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 'calc(100%)',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            overflowY: 'scroll',
            transition: '0.2s ease',
          }}
        >
          <ThemeProvider theme={theme}>
            <LineNumbers
              fontSize={editorFontSize}
              numberOfLines={programLines.length}
              height={`${programLines.length * 1.5 + 2}rem`}
            />
            <Code
              fontSize={editorFontSize}
              text={entireText}
              height={`${programLines.length * 1.5 + 2}rem`}
            />
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default CodeEditor
