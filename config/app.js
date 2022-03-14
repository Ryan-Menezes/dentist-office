require('dotenv').config()

module.exports = {
    name: process.env.APP_NAME || 'APP',
    version: process.env.APP_VERSION || '1.0.0'
}