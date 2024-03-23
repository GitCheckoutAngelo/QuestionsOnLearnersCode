import { Answer } from "../../models/Submission";

export interface CreateSubmission {
    quizId: string,
    answers: Answer[]
}