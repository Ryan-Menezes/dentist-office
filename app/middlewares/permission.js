const { Role, Permission } = require('../models/index')
const auth = require('../../config/auth')

module.exports = async (req, res, next, permission) => {
    if(!req.cookies || !req.cookies[auth.cookie.name]){
        return res.status(404).render('error', {
            layout: false,
            error: 404
        })
    }

    const user = req.cookies[auth.cookie.name]
    if(!Array.isArray(user.roles)){
        return res.status(404).render('error', {
            layout: false,
            error: 404
        })
    }

    user.roles.forEach(role => {
        Permission.findAll({
            where: {
                name: permission
            },
            include: {
                model: Role,
                as: 'roles',
                through: {
                    where: {
                        roleId: role.id
                    }
                }
            }
        })
        .then(permissions => {
            console.log(permissions)
            if(!permissions.length){
                return res.status(404).render('error', {
                    layout: false,
                    error: 404
                })
            }

            //next()
        })
        .catch(async (error) => {
            await res.status(500).render('error', {
                layout: false,
                error: 500,
                message: JSON.stringify(error)
            })
        })
    })
}