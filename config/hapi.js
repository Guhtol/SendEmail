const Hapi = require('hapi');
const consign = require('consign');

module.exports = function () {
    const app = new Hapi.Server()

    app.connection({
        port: 3000,
        host: 'localhost'
    })

    consign({ cwd: 'app' })
        .include('infra')
        .include('routes')
        .into(app);

    return app;
}