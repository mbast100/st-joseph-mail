const { assert } = require('chai')
const sinon = require('sinon')
const MailHandlerModule = require("../../../src/handlers/mail")

describe("MailHandler", () => {
    let mailHandler, _mailHandler
    let responseUtil, _responseUtil
    let mockEvent

    beforeEach(() => {
        responseUtil = { buildSuccessfulResponse () {}, buildErrorResponse () {} }
        _responseUtil = sinon.mock(responseUtil)

        mailHandler = new MailHandlerModule.MailHandler({ responseUtil })
        _mailHandler = sinon.mock(mailHandler)
    })
    
    afterEach(() => {
        _responseUtil.verify()
        _mailHandler.verify()
    })

    describe("constructor", () => {
        it("should initialize properly", () => {
            assert.deepEqual(mailHandler.responseUtil, responseUtil)
        })
    })

    describe("sendEmail", () => {
        it("returns 200 if query params are defined in the event", async () => {
            mockEvent = {
                queryParameters: { type: "subscribe" },
            }

            _responseUtil.expects('buildSuccessfulResponse').withArgs({ parameters: mockEvent.queryParameters})
            await mailHandler.sendEmail(mockEvent)
        })

        it("returns 400 if no query params are defined in the event", async () => {
            mockEvent = {}

            _responseUtil.expects('buildErrorResponse').withArgs(400, "Missing query parameters")
            await mailHandler.sendEmail(mockEvent) 
        })
    })

})