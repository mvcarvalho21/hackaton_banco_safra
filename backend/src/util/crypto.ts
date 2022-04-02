require('dotenv').config();
import bcryptjs from 'bcryptjs'

const salt = process.env.JSON_WEBTOKEN_SALT;

class Crypto {
    async encrypt(text: string) {
        var encrypted = await bcryptjs.hash(text, parseInt(salt));
        return encrypted;
    }
    async compare(password: string, encrypted: string) {
        try {
            var equal = await bcryptjs.compare(password, encrypted).then(value => {
                return value;
            });
            return equal;
        } catch (err) {
            throw err;
        }
    }
}

export default Crypto;