const { User, Role } = require('../../models/index')
const permission = require('../../middlewares/permission')
const bcryptjs = require('bcryptjs')
const bcrypt = require('../../../config/bcrypt')

const dir = 'panel/users/'
const url = '/painel/usuarios/'

module.exports = {
    async index(req, res, next){
        permission(req, res, next, 'view.users')

        User.findAll()
        .then(async (users) => {
            await res.status(200).render(`${dir}index`, {
                auth: req.user,
                title: 'Usuários',
                users
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                auth: req.user,
                title: 'Usuários',
                users: []
            })
        })
    },

    async create(req, res, next){
        permission(req, res, next, 'create.users')

        Role.findAll()
        .then(async (roles) => {
            await res.status(200).render(`${dir}create`, {
                auth: req.user,
                title: 'Novo Usuário',
                roles
            })
        })
        .catch(async (error) => {
            await res.status(500).render('error', {
                layout: false,
                error: 500,
                message: JSON.stringify(error)
            })
        })
    },

    async store(req, res, next){
        permission(req, res, next, 'create.users')

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
            await res.status(500).render('error', {
                layout: false,
                error: 500,
                message: JSON.stringify(error)
            })
        })
    },

    async edit(req, res, next){
        permission(req, res, next, 'edit.users')

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
                    return res.status(404).render('error', {
                        layout: false,
                        error: 404
                    })
                }
    
                await res.status(200).render(`${dir}edit`, {
                    auth: req.user,
                    title: 'Editar Usuário',
                    roles,
                    user: user.dataValues
                })
            })
            .catch(async (error) => {
                await res.status(500).render('error', {
                    layout: false,
                    error: 500,
                    message: JSON.stringify(error)
                })
            })
        })
       .catch(async (error) => {
            await res.status(500).render('error', {
                layout: false,
                error: 500,
                message: JSON.stringify(error)
            })
        })
    },

    async update(req, res, next){
        permission(req, res, next, 'edit.users')

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
                password: (data.password.trim() ? bcryptjs.hashSync(data.password, bcrypt.salt) : user.password)
            }, {
                where: {
                    id
                }
            })
            .then(async (result) => {
                if(!result){
                    return res.status(404).render('error', {
                        layout: false,
                        error: 404,
                        message: JSON.stringify(result)
                    })
                }

                await user.roles.forEach(async role => await user.removeRole(role.id))
                await user.addRole(data.role)
                await res.status(200).redirect(`${url}${id}/editar`)
            })
            .catch(async (error) => {
                await res.status(500).render('error', {
                    layout: false,
                    error: 500,
                    message: JSON.stringify(error)
                })
            })
        })
        .catch(async (error) => {
            await res.status(500).render('error', {
                layout: false,
                error: 500,
                message: JSON.stringify(error)
            })
        })
    },

    async delete(req, res, next){
        permission(req, res, next, 'delete.users')

        const id = req.params.id

        User.destroy({
            where: {
                id
            }
        })
        .then(async (result) => {
            if(!result){
                return res.status(404).render('error', {
                    layout: false,
                    error: 404,
                    message: JSON.stringify(result)
                })
            }

            await res.status(200).redirect(`${url}`)
        })
        .catch(async (error) => {
            await res.status(500).render('error', {
                layout: false,
                error: 500,
                message: JSON.stringify(error)
            })
        })
    }
}