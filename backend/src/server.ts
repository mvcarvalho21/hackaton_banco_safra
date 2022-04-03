require('dotenv').config();
import { app } from "./app";
import https from 'https';
import fs from 'fs';

const options = {
    key: fs.readFileSync('src/private.key'), // ANOTHER TESTE waith the path to your key
    cert: fs.readFileSync('src/certificate.crt') // Resplace with the path to your certificate
}

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});

// app.listen(process.env.PORT)