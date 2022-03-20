require('dotenv').config()

module.exports = {
    salt: process.env.BCRYPT_SALT
}