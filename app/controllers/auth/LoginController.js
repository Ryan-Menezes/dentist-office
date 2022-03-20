const { User, Role } = require('../../models/index')
const bcryptjs = require('bcryptjs')
const auth = require('../../../config/auth')

const dir = 'auth/'
const url = '/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}login`, {
            layout: 'login',
            title: 'Início'
        })
    },

    async validate(req, res, next){
        const data = req.body

        if(!data.email || !data.password){
            return res.status(403).redirect(url)
        }

        User.findOne({
            where: {
                email: data.email
            },
            include: {
                model: Role,
                as: 'roles'
            }
        })
        .then(async (user) => {
            if(!bcryptjs.compareSync(data.password, user.password)){
                return res.status(403).redirect(url)
            }
            
            await res.cookie(auth.cookie.name, user, {
                maxAge: auth.cookie.maxAge,
                expires: auth.cookie.expires,
                secure: auth.cookie.secure,
                httpOnly: auth.cookie.httpOnly
            })
            
            await res.status(200).redirect(`${url}painel`)
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    }
}