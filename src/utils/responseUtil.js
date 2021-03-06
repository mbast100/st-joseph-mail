/**
 * Utility class to build the response object
 */
class ResponseUtil {
   /**
   * builds successful response object
   * @param {Object} data data object to process
   * @param {*} statusCode error status code (optional)
   * @return response
   */
  buildSuccessfulResponse (data, statusCode = 200) {
    const response = {
      statusCode
    }

    if (data) {
      response.body = JSON.stringify({ ...data })
    }
    return response
  }

  /**
   * builds error response object
   * @param {Number} statusCode error status code
   * @param {String} message error message to include in response
   * @returns response
   */
  buildErrorResponse (statusCode, message) {
    const response = {
      statusCode: statusCode,
      body: message
    }
    return response
  }
}

module.exports = ResponseUtil
