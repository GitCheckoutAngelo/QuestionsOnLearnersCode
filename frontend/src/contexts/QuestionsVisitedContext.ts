import { createContext, useContext } from "react";

interface QuestionsVisitedContextType {
    questionsVisited: number[],
    setQuestionsVisited: (questionsVisited: number[]) => void,
}

const defaultQuestionsVisitedContext = {
    questionsVisited: [],
    setQuestionsVisited: (questionsVisited: number[]) => { console.log(questionsVisited) },
};

export const QuestionsVisitedContext = createContext<QuestionsVisitedContextType>(defaultQuestionsVisitedContext);
export const useQuizStatusContext = () => useContext(QuestionsVisitedContext);