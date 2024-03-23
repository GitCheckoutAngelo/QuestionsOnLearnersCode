import { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'

const lineOne = [
    "M371.317 153.413H479.611V160.52H371.317V153.413Z",
    "M371.317 153.413H469.5V160.52H371.317V153.413Z",
];

const lineTwo = [
    "M371.317 165.849H417.475V172.955H371.317V165.849Z",
    "M371.317 165.849H412V172.955H371.317V165.849Z"
];

const lineFour = [
    "M371.317 190.721H417.475V197.827H371.317V190.721Z",
    "M371.317 190.721H412V197.827H371.317V190.721Z",
    "M371.317 190.721H405V197.827H371.317V190.721Z"
];

export const Terminal = () => {
    const [lineOneIndex, setLineOneIndex] = useState<number>(0);
    const [lineTwoIndex, setLineTwoIndex] = useState<number>(0);
    const [lineFourIndex, setLineFourIndex] = useState<number>(0);

    const animationProps = useSpring({
        lineOne: lineOne[lineOneIndex],
        lineTwo: lineTwo[lineTwoIndex],
        lineFour: lineFour[lineFourIndex],
    });

    useEffect(() => {
        setInterval(() => setLineOneIndex(prev => prev === lineOne.length-1 ? 0 : prev+1), 1800);
        setInterval(() => setLineTwoIndex(prev => prev === lineTwo.length-1 ? 0 : prev+1), 2400);
        setInterval(() => setLineFourIndex(prev => prev === lineFour.length-1 ? 0 : prev+1), 800);
    }, []);
        
    return (
        <>
        <path fillRule="evenodd" clipRule="evenodd" d="M490.263 135.648C490.263 131.723 487.084 128.542 483.162 128.542H367.766C363.844 128.542 360.665 131.723 360.665 135.648V141.723H490.263V135.648Z" fill="#024376"/>
        <path d="M360.665 228.028C360.665 231.953 363.844 235.134 367.766 235.134H483.162C487.084 235.134 490.263 231.953 490.263 228.028V141.723H360.665V228.028Z" fill="#1F1F1F"/>
        <path d="M374.867 135.648C374.867 137.61 373.278 139.201 371.317 139.201C369.356 139.201 367.766 137.61 367.766 135.648C367.766 133.686 369.356 132.095 371.317 132.095C373.278 132.095 374.867 133.686 374.867 135.648Z" fill="#FE2A41"/>
        <path d="M383.744 135.648C383.744 137.61 382.154 139.201 380.193 139.201C378.232 139.201 376.643 137.61 376.643 135.648C376.643 133.686 378.232 132.095 380.193 132.095C382.154 132.095 383.744 133.686 383.744 135.648Z" fill="#F9C600"/>
        <path d="M392.621 135.648C392.621 137.61 391.031 139.201 389.07 139.201C387.109 139.201 385.519 137.61 385.519 135.648C385.519 133.686 387.109 132.095 389.07 132.095C391.031 132.095 392.621 133.686 392.621 135.648Z" fill="#3AB349"/>
        <animated.path d={animationProps.lineOne} fill="#D9D9D9"/>
        <animated.path d={animationProps.lineTwo} fill="#D9D9D9"/>
        <path d="M371.317 178.285H417.475V185.391H371.317V178.285Z" fill="#D9D9D9"/>
        <animated.path d={animationProps.lineFour} fill="#D9D9D9"/>
        {/* <path d="M371.317 190.721H372V197.827H371.317V190.721Z" fill="#D9D9D9"/> */}
        </>
    )
}