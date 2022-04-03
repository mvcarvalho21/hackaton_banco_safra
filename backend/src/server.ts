require('dotenv').config();
import { app } from "./app";
import https, { request } from 'https';
import fs from 'fs';
import cron from 'node-cron'

import { SendEmailFactory } from "./modules/User/SendEmal/SendEmailFactory";
import { SendEmailService } from "./modules/User/SendEmal/SendEmailService";
import { KnexUserRepository } from "./repositories/knex/KnexUserRepository";

const axios = require("axios").default;

const options = {
    key: fs.readFileSync('src/private.key'), // ANOTHER TESTE waith the path to your key
    cert: fs.readFileSync('src/certificate.crt') // Resplace with the path to your certificate
}

cron.schedule('0 0 18 * * *', async function () {
    const userRepository = new KnexUserRepository()
    const sendEmail = new SendEmailService(userRepository);
    sendEmail.execute({amount: 10})
});

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});

// app.listen(process.env.PORT)