const auth = require('../../config/auth')

module.exports = async (req, res, next) => {
    if(!req.cookies || !req.cookies[auth.cookie.name]){
        return res.status(403).redirect('/')
    }

    req.user = req.cookies[auth.cookie.name]
    next()
}