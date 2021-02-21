const { assert } = require('chai')
const sinon = require('sinon')
const MailHandlerModule = require("../../../src/handlers/mail")
const event = require("../../utils/mockEvent")


describe("MailHandler", () => {
    let mailHandler, _mailHandler
    let responseUtil, _responseUtil

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

    describe("sendEmail", () => {
        it("returns 400 if no query params are defined in the event", async () => {
            _responseUtil.expects('buildErrorResponse').withArgs(400, "Missing query parameters")
            const ret = await mailHandler.sendEmail(event)
        })
    })

})