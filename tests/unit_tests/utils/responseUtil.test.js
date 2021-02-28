const { expect } = require('chai')
const _ = require('lodash')
const ResponseUtil = require('../../../src/utils/responseUtil')

describe('ResponseUtil', () => {
  let responseUtil

  beforeEach(() => {
    responseUtil = new ResponseUtil()
  })

  describe('buildSuccessResponse', () => {
    let statusCode, data

    beforeEach(() => {
      statusCode = 200
      data = { parameters: "email type" }
    })

    it(`should return response with statusCode 200`, () => {
      const res = responseUtil.buildSuccessfulResponse(data)
      expect(res.statusCode).equal(200)
      expect(res.body).deep.equal(JSON.stringify(data))
    })
    it(`should return response with statusCode 200 and no data`, () => {
      const res = responseUtil.buildSuccessfulResponse()
      expect(res.statusCode).equal(200)
      expect(res).deep.equal({ statusCode })
    })
  })

  describe('buildErrorResponse', () => {
    const mockResponses = [
      { statusCode: 400, body: { message: 'Missing query parameters' } },
      { statusCode: 500, body: { message: 'Internal server error' } },
    ]
    _.forEach(mockResponses, (mockResponse) => {
      it(`should return response with statusCode ${mockResponse.statusCode} and body contains ${mockResponse.message}`, () => {
        const res = responseUtil.buildErrorResponse(mockResponse.statusCode, mockResponse.body)
        expect(res.statusCode).equal(mockResponse.statusCode)
        expect(res.body).deep.equal(mockResponse.body)
      })
    })
  })
})
