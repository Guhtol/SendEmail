'use strict'

module.exports = (app) => {

    //what returns  
    // const infra = {
    //     configEmail,
    //     receiver,
    //     from,
    //     contentcadas
    // }

    // return infra


    const createEmail = email => ({ email })

    const configEmail = (email) => (body) => (token) => {
        const sg = require('sendgrid')(token)
        email.body = {
            personalizations: body.personalizations,
            content: body.content,
            from: body.from
        }
        const request = sg.emptyRequest(email)

        return sg.API(request)
    }

    const receiver = (obj) => (subject) => (emails) => {
        obj.personalizations = [{
            to: emails.map(createEmail),
            subject: subject
        }]
        return obj;
    }

    const from = (obj) => (email) => {
        obj.from = createEmail(email)
        return obj;
    }

    const content = (obj) => (type) => (content) => {
        obj.content = [{
            type: type,
            value: content
        }]
        return obj;
    }

    const infra = {
        configEmail,
        receiver,
        from,
        content
    }

    return infra
}