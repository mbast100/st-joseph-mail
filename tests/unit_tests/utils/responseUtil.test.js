const { expect } = require('chai')
const _ = require('lodash')
const ResponseUtil = require('../../../src/utils/responseUtil')

describe('ResponseUtil', () => {
  let responseUtil

  beforeEach(() => {
    responseUtil = new ResponseUtil()
  })

  describe('buildSuccessResponse', () => {
    let data

    beforeEach(() => {
      data = { parameters: "email type" }
    })

    it("should return response with statusCode 200", () => {
      const res = responseUtil.buildSuccessfulResponse(data)
      expect(res.statusCode).equal(200)
      expect(res.body).deep.equal(JSON.stringify(data))
    })
    it("should return response with statusCode 200 and no data", () => {
      const res = responseUtil.buildSuccessfulResponse()
      expect(res.statusCode).equal(200)
      expect(res).deep.equal({ statusCode: 200 })
    })

    it("should return with a different status code than the default", () => {
      const res = responseUtil.buildSuccessfulResponse(data, 201)
      expect(res.statusCode).equal(201)
      expect(res.body).deep.equal(JSON.stringify(data))
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
