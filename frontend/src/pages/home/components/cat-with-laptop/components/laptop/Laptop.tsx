import { useState, useEffect } from 'react'
import './Laptop.scss'
import { Terminal } from './components/Terminal';
import { Qlc } from './components/Qlc';

const programs = [
    <Terminal/>,
    <Qlc/>
];

export const Laptop = () => {
    const [programIndex, setProgramIndex] = useState<number>(0);
    const [showProgram, setShowProgram] = useState<boolean>(true);

    const handleNextProgramIndex = () => setProgramIndex(prev => prev === programs.length-1 ? 0 : prev+1);
    const handleHideProgram = () => setShowProgram(false);
    const handleShowProgram = () => setShowProgram(true);

    const handleChangeProgram = () => {
        handleHideProgram();
        const hideProgramTime = 300;
        setTimeout(() => {
            handleNextProgramIndex();
            handleShowProgram();
        }, hideProgramTime);
    }

    // change the current program every 6 seconds
    useEffect(() => {
        let doChange = true; // check if program was not manually changed
        setTimeout(() => {
            if (doChange) handleChangeProgram();
        }, 6000);
        
        return () => {
            doChange = false;
        };
    }, [programIndex]);

    return (
        <g 
            onClick={handleChangeProgram}
            style={{ 
                cursor: 'pointer', 
                transition: '0.2s ease',
                transformOrigin: '50% 66%'
            }}
            className='svg-hoverable'
            >
            <path d="M458.343 256.453H391.769L391.835 256.884C392.472 261.021 392.862 263.559 398.87 263.559H451.242C456.568 263.559 457.456 260.894 458.343 256.453Z" fill="#C1C1C1"/>
            <path d="M301.227 256.453H281.699C279.036 256.453 278.148 257.341 279.924 261.782C280.661 263.626 283.474 268 286.137 268H564.863C567.526 268 570.339 263.626 571.076 261.782C572.852 257.341 571.964 256.453 569.301 256.453H549.773H458.343C457.456 260.894 456.568 263.559 451.242 263.559H398.87C392.862 263.559 392.472 261.021 391.835 256.884L391.769 256.453H301.227Z" fill="#D9D9D9"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M308.329 109C301.227 109 301.227 109 301.227 115.218V256.453H391.769H458.343H549.773V115.218C549.773 109 547.997 109 542.671 109H308.329ZM310.992 125.877C310.992 118.771 310.992 118.771 318.093 118.771H532.907C540.008 118.771 540.008 118.771 540.008 125.877V241.352C540.008 248.458 540.008 248.458 532.907 248.458H318.093C310.992 248.458 310.992 248.458 310.992 241.352V125.877Z" fill="#333534"/>
            <path d="M318.093 118.771C310.992 118.771 310.992 118.771 310.992 125.877V241.352C310.992 248.458 310.992 248.458 318.093 248.458H532.907C540.008 248.458 540.008 248.458 540.008 241.352V125.877C540.008 118.771 540.008 118.771 532.907 118.771H318.093Z" fill="#269CD9"/>
            <g
                style={{ 
                    transform: `scale(${showProgram ? 1 : 0})`, 
                    transformOrigin: '39.5% 62%', 
                    transition: '0.2s ease' 
                }}
                >
                {programs[programIndex]}
            </g>
        </g>
    );
}