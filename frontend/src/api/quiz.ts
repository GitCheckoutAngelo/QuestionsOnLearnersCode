import axios from "axios";
import { Quiz } from "../models/Quiz";
import { SERVER } from "../utils/config/server";
import { CreateSubmission } from "../dtos/submission/CreateSubmission";

export const getQuizByIdAsync = async (id: string): Promise<Quiz | null> => {
    const res = await axios.get(`${SERVER.QUIZ_ENDPOINT}${id}`);
    if (res.status === 200) {
        const quiz: Quiz = res.data;
        return quiz;
    }
    else {
        return null;
    }
}

export const createQuizAsync = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    };

    const res = await axios.post(SERVER.QUIZ_ENDPOINT.slice(0,-1), formData, config).catch(function () {
      return null
    });
    
    return res?.status === 201 ? res.data.quizId : null;
}

export const insertQuizSubmissionAsync = async (userSubmission: CreateSubmission) => {
    const res = await axios.post(`${SERVER.QUIZ_ENDPOINT}${userSubmission.quizId}`, userSubmission);
    console.log(res);
}