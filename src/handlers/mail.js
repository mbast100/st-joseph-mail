'use strict';

class MailRequest {
  async sendEmail (event) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Your email was successfully sent!',
          input: event,
        },
        null,
        2
      ),
    };
  }
}

const mail = new MailRequest()

module.exports = {
  /**
   * Lambda handler function to send emails
   * @param {Object} event object passed from API gateway
   * @returns {Object} response
   */
  sendEmail: mail.sendEmail.bind(mail)
};
