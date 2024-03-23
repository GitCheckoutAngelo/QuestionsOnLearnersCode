import axios from 'axios'
import { SERVER } from '../utils/config/server'
import { FeedbackSubmission } from '../dtos/feedback/Feedback'

export const insertFeedbackSubmissionAsync = async (
  feedback: FeedbackSubmission
) => {
  console.log(feedback)
  const res = await axios.post(
    `${SERVER.FEEDBACK_ENDPOINT}${feedback.quizId}`,
    feedback
  )
  console.log(res)
}
