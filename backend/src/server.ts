require('dotenv').config();
import { app } from "./app";
import https, { request } from 'https';
import fs from 'fs';
import cron from 'node-cron'

import { SendEmailFactory } from "./modules/User/SendEmal/SendEmailFactory";

const options = {
    key: fs.readFileSync('src/private.key'), // ANOTHER TESTE waith the path to your key
    cert: fs.readFileSync('src/certificate.crt') // Resplace with the path to your certificate
}

cron.schedule('0 0 18 * * *', function () {
    SendEmailFactory().handle
});

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});

// app.listen(process.env.PORT)