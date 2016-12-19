'use sctrict';

module.exports = (app) => {

    app.route({
        method: 'GET',
        path: '/api/SendEmail',
        handler: function (req, res) {
            const sendGrid = app.infra.email

            const email = {
                method: 'POST',
                path: '/v3/mail/send',
            }
            let body = {}

            body = sendGrid.substitutions(body)({
                ':name': 'name',
                ':email': 'emal@example',
                ':telefone': '11 9999-5512',
                ':mensagem': 'Test email sender'
            })
            body = sendGrid.receiver(body)('Envio de email')(['EmailReceiver@example.com'])
            body = sendGrid.templateId(body)('templateId')
            body = sendGrid.from(body)('EmailSender@example.com.br')
            //contentType example text/html 
            body = sendGrid.content(body)('contentType')('content')
            const request = sendGrid.configEmail(email)(body)(process.env.sgtoken)

            request.then(response => {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);

                return res({ process: "finished" })
            }).catch(error => {
                //error is an instance of SendGridError
                //The full response is attached to error.response
                return res({
                    process: "finished with error",
                    error: error.response.statusCode
                })
            })
        }
    })
}