import axios from 'axios'
import { SERVER } from '../utils/config/server'
import { CreateSubmission } from '../dtos/submission/CreateSubmission'

export const insertSurveySubmissionAsync = async (
  userSubmission: CreateSubmission
) => {
  console.log(userSubmission)
  const res = await axios.post(
    `${SERVER.SURVEY_ENDPOINT}${userSubmission.quizId}`,
    userSubmission
  )
  console.log(res)
}
