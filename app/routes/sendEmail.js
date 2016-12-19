'use sctrict';

module.exports = (app) => {

    app.route({
        method: 'GET',
        path: '/api/SendEmail',
        handler: function (req, res) {
            const sendGrid = app.infra.email
            
            /*
             object that has parameter to send email, sendGrid use this.
            */
            const email = {
                method: 'POST',
                path: '/v3/mail/send',
            }
            let body = {}

            /* 
                replace the template html that was created in sendGrid painel.
                when use this option it's required use the function sendGrid.TemplateId.
            */
            body = sendGrid.substitutions(body)({
                ':name': 'name',
                ':email': 'emal@example',
                ':telefone': '11 9999-5512',
                ':mensagem': 'Test email sender'
            })
            /*
                Config the Subject and the email receivers
            */
            body = sendGrid.receiver(body)('Envio de email')(['EmailReceiver@example.com'])
            /*
              we use the function sendGrid.substitutions then need pass the templateId.
              if you not use sendGrid this function is optional.
            */
            body = sendGrid.templateId(body)('templateId')
            /*
                configure the onwer from email.
            */ 
            body = sendGrid.from(body)('EmailSender@example.com.br')

            /*
              Pass the contenType and content for example: text/html and body from email.
              When you use template you only need pass a string empty, for example: sendGrid.content(body)('text/html')('').
                               
            */ 
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