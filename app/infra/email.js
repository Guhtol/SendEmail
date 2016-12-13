'use strict'

module.exports = (app) => {
    const infra = {
        configEmail,
        receiver,
        from,
        content
    }

    return infra

    function configEmail(email) {
        return function(body) {
            return function(token) {
                const sg = require('sendgrid')(token)
                email.body = {
                    personalizations: body.personalizations,
                    content:body.content,
                    from: body.from
                }
                const request = sg.emptyRequest(email)

                return sg.API(request)
            }
        }
    }

    function receiver(obj) {
        return function(subject) {
            return function(emails) {
                obj.personalizations = [{
                    to: emails.map(createEmail),
                    subject: subject
                }]
                return obj;
            }
        }
    }
    function from(obj) {
        return function(email) {
            obj.from = createEmail(email)
            return obj;
        }
    }

    function content(obj) {
        return function(type) {
            return function(content) {
                obj.content = [{
                    type: type,
                    value: content
                }]
                return obj;
            }
        }
    }
    function createEmail(email) {
        return {
            email: email
        }
    }

}