require('dotenv').config();
import jwt from 'jsonwebtoken';
const { promisify } = require('util');

const SECRET = process.env.JSON_WEBTOKEN_SECRET;
const EXPIRES_IN = Number(process.env.JSON_WEBTOKEN_EXPIRES_IN);

class UtilJwt {
    async generateToken(uuid: number) {
        return await jwt.sign({ uuid }, SECRET, { expiresIn: EXPIRES_IN });
    }

    async decode(token: string) {
        const decoded = await promisify(jwt.verify)(token, SECRET);
        return decoded;
    }
}

export default UtilJwt;