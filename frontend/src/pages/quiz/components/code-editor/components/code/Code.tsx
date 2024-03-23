import { useState, useEffect } from 'react'

import Prism from 'prismjs'
import 'prismjs/components/prism-python' // Language (note that it says "can't find declaration file, but it still works")
import 'prismjs/themes/prism-okaidia.css' // Theme

import ScrollContainer from 'react-indiana-drag-scroll'

interface CodeProps {
    text: string,
    fontSize: string,
    height: string,
}

const Code = ({ text, fontSize, height }: CodeProps) => {
    const [load, setLoad] = useState<number>(0);

    // attempts to load prism 'x' amount of times
    useEffect(() => {
        // x = 5
        if (load < 5) {
            setTimeout(() => {
                setLoad(prev => prev+1);
            }, 100);
        }
    }, [load]);

    useEffect(() => {
        Prism.highlightAll()
    }, [load])

    return (
        <ScrollContainer 
            className="scroll-container"
            style={{
                position: 'absolute',
                right: '0',
                top: '0',
                width: 'calc(100% - 3.5rem)',
                height: height,
                display: 'flex',
                alignItems: 'center'
            }}
            vertical={false}
            >
            <pre
                style={{ 
                    backgroundColor: 'transparent',
                    padding: '0',
                    margin: '0',
                    width: 'calc(100%)',
                    overflow: 'visible',
                    position: 'absolute',
                    right: '0',
                }}
                >
                    
                <code 
                className="language-python"
                    style={{
                        padding: '0rem 0rem',
                        fontSize: fontSize
                    }}
                >
                {text}
                </code>
            </pre>
        // </ScrollContainer>

    )
}

export default Code