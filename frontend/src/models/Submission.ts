export interface Answer {
    questionId: number,
    choiceIds: number[],
}

export interface Submission {
    _id: string,
    quizId: number,
    answers: Answer[]
}