import config from '../../../config.json'

class ServerConfigManager {
  public USER_ENDPOINT: string
  public QUIZ_ENDPOINT: string
  public PROGRAM_ENDPOINT: string
  public SURVEY_ENDPOINT: string
  public FEEDBACK_ENDPOINT: string

  constructor(baseUrl: string) {
    this.USER_ENDPOINT = `${baseUrl}${config.SERVER.RESOURCE.USER_ENDPOINT}`
    this.QUIZ_ENDPOINT = `${baseUrl}${config.SERVER.RESOURCE.QUIZ_ENDPOINT}`
    this.PROGRAM_ENDPOINT = `${baseUrl}${config.SERVER.RESOURCE.PROGRAM_ENDPOINT}`
    this.SURVEY_ENDPOINT = `${baseUrl}${config.SERVER.RESOURCE.SURVEY_ENDPOINT}`
    this.FEEDBACK_ENDPOINT = `${baseUrl}${config.SERVER.RESOURCE.FEEDBACK_ENDPOINT}`
  }
}

export const SERVER = new ServerConfigManager(config.SERVER.BASE_URL)
