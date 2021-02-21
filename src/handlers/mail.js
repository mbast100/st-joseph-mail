const ResponseUtil = require("../utils/response")
class MailHandler {  /**
  * Creates an instance of MailHandler
  * @param {Object} injectionContext
  * @param {Object} injectionContext.responseUtil Instance of ResponseUtil
  */
  constructor(injectionContext = {}) {
    this.responseUtil = injectionContext.responseUtil || new ResponseUtil()
  }

  async sendEmail (event) {
    const params = event.queryParameters;

    if (!params) {
      return this.responseUtil.buildErrorResponse(400, 'Missing query parameters')
    }

    return this.responseUtil.buildSuccessfulResponse({
      message: 'Your email was successfully sent!',
      parameters: params,
      event: event
    })
  }
}

const mail = new MailHandler()

module.exports = {
  MailHandler,
  /**
   * Lambda handler function to send emails
   * @param {Object} event object passed from API gateway
   * @returns {Object} response
   */
  sendEmail: mail.sendEmail.bind(mail)
};
