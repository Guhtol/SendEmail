'use strict';


const app = require('./config/hapi')()

app.start((err) => {
    if (err) throw err;

    console.log(`Server running at: ${app.info.uri}`);
})