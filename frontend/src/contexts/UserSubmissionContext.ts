import { createContext, useContext } from 'react'
import { CreateSubmission } from '../dtos/submission/CreateSubmission'

interface UserSubmissionContextType {
  userSubmission: CreateSubmission | undefined
  setUserSubmission: (
    userSubmission:
      | CreateSubmission
      | ((prev: CreateSubmission | undefined) => CreateSubmission | undefined)
      | undefined
  ) => void
  submissionMethod: (userSubmission: CreateSubmission) => Promise<void>
}

const defaultUserSubmissionContext = {
  userSubmission: undefined,
  setUserSubmission: (
    userSubmission:
      | CreateSubmission
      | ((prev: CreateSubmission | undefined) => CreateSubmission | undefined)
      | undefined
  ) => { console.log(userSubmission) },
  submissionMethod: async (userSubmission: CreateSubmission) => { console.log(userSubmission) },
}

export const UserSubmissionContext = createContext<UserSubmissionContextType>(
  defaultUserSubmissionContext
)

export const useUserSubmissionContext = () => useContext(UserSubmissionContext)
