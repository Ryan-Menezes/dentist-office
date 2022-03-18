const { User, Role } = require('../../models/index')

const dir = 'panel/users/'

module.exports = {
    async index(req, res, next){
        User.findAll()
        .then(async (users) => {
            await res.status(200).render(`${dir}index`, {
                title: 'Usuários',
                users
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                title: 'Usuários',
                users: []
            })
        })
    },

    async create(req, res, next){
        Role.findAll()
        .then(async (roles) => {
            await res.status(200).render(`${dir}create`, {
                title: 'Novo Usuário',
                roles
            })
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    },

    async edit(req, res, next){
        Role.findAll()
        .then(async (roles) => {
            User.findByPk(req.params.id, {
                include: {
                    model: Role,
                    as: 'roles'
                }
            })
            .then(async (user) => {
                if(!user){
                    return res.status(404).json(user)
                }
    
                await res.status(200).render(`${dir}edit`, {
                    title: 'Editar Usuário',
                    roles,
                    user: user.dataValues
                })
            })
            .catch(async (error) => {
                await res.status(500).json(error)
            })
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    }
}