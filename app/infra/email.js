'use strict'

module.exports = (app) => {

    const createEmail = email => ({ email })

    const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'

    const hasLength = (array) => {
        return isArray(array) && array.length > 0
    }

    const initArray = array => {
        if (!isArray(array))
            array = []
        return array;
    }
    
    const templateId = (obj) => (template_id) => {
        obj.template_id = template_id
        return obj
    }

    const configEmail = (email) => (body) => (token) => {
        const sg = require('sendgrid')(toke)
        email.body = {
            personalizations: body.personalizations,
            content: body.content,
            from: body.from
        }
        if ('template_id' in body) {
            email.body.template_id = body.template_id
        }
        const request = sg.emptyRequest(email)

        return sg.API(request)
    }

    const receiver = (obj) => (subject) => (emails) => {
        let array = initArray(obj.personalizations)
        if (hasLength(array)) {
            array.map((item) => {
                item.to = emails.map(createEmail)
                item.subject = subject
            })
            obj.personalizations = array
            return obj
        }
        array.push({
            to: emails.map(createEmail),
            subject: subject
        })
        obj.personalizations = array;
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

    const substitutions = (obj) => (content) => {
        let array = obj.personalizations
        array = initArray(array)
        if (hasLength(array)) {
            array.map((item) => {
                item.substitutions = content
            })
            obj.personalizations = array;
            return obj;
        }
        array.push({ substitutions: content })
        obj.personalizations= array;
        return obj
    }

    const infra = {
        configEmail,
        receiver,
        from,
        content,
        substitutions,
        templateId
    }

    return infra
}