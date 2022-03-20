require('dotenv').config()

module.exports = {
    cookie: {
        name: process.env.AUTH_COOKIE_NAME,
        maxAge: Date.now() + process.env.AUTH_COOKIE_MAXAGE,
        expires: Date.now() + process.env.AUTH_COOKIE_EXPIRES,
        secure: process.env.AUTH_COOKIE_SECURE,
        httpOnly: process.env.AUTH_COOKIE_SECURE
    }
}