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
            
            body = sendGrid.receiver(body)('Send Email Master blaster')(['emailQueRecebe@exemplo.com'])
            body = sendGrid.from(body)('emailQueEnvia@exemplo.com')
            body = sendGrid.content(body)('text/plain')('Assunto aqui')
            const request = sendGrid.configEmail(email)(body)(process.env.sgtoken)

            request.then(response => {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            })
                .catch(error => {
                    //error is an instance of SendGridError
                    //The full response is attached to error.response
                    console.log(error.response.statusCode);
            });  

          return res('{processo:"finalizado"}')      

        }
    })
}