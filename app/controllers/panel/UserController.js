const { User, Role } = require('../../models/index')

const dir = 'panel/users/'
const url = '/painel/usuarios/'

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

    async store(req, res, next){
        const data = req.body

        User.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password
        })
        .then(async (user) => {
            await user.addRole(data.role)
            await res.status(200).redirect(`${url}novo`)
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
    },

    async update(req, res, next){
        const id = req.params.id
        const data = req.body

        User.findOne({
            where: {
                id
            },
            include: {
                model: Role,
                as: 'roles'
            }
        })
        .then(async (user) => {
            User.update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password
            }, {
                where: {
                    id
                }
            })
            .then(async (result) => {
                if(!result){
                    return res.status(404).json(result)
                }

                await user.roles.forEach(async role => await user.removeRole(role.id))
                await user.addRole(data.role)
                await res.status(200).redirect(`${url}${id}/editar`)
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