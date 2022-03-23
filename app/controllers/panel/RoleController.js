const { Role, Permission } = require('../../models/index')
const permission = require('../../middlewares/permission')

const dir = 'panel/roles/'
const url = '/painel/funcoes/'

module.exports = {
    async index(req, res, next){
        permission(req, res, next, 'view.roles')

        Role.findAll()
        .then(async (roles) => {
            await res.status(200).render(`${dir}index`, {
                auth: req.user,
                title: 'Funções',
                roles
            })
        })
        .catch(async (error) => {
            await res.status(500).render(`${dir}index`, {
                auth: req.user,
                title: 'Funções',
                roles: []
            })
        })
    },

    async create(req, res, next){
        permission(req, res, next, 'create.roles')

        Permission.findAll()
        .then(async (permissions) => {
            await res.status(200).render(`${dir}create`, {
                auth: req.user,
                title: 'Nova Função',
                permissions
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
        permission(req, res, next, 'create.roles')

        const data = req.body

        Role.create({
            name: data.name,
            description: data.description
        })
        .then(async (role) => {
            await role.addPermissions(data['permissions[]'])
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
        permission(req, res, next, 'edit.roles')

        Role.findByPk(req.params.id, {
            include: {
                model: Permission,
                as: 'permissions'
            }
        })
        .then(async (role) => {
            if(!role){
                return res.status(404).render('error', {
                    layout: false,
                    error: 404
                })
            }

            Permission.findAll()
            .then(async (permissions) => {
                await res.status(200).render(`${dir}edit`, {
                    auth: req.user,
                    title: 'Editar Função',
                    role: role.dataValues,
                    permissions
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
        permission(req, res, next, 'edit.roles')

        const id = req.params.id
        const data = req.body

        Role.findOne({
            where: {
                id
            },
            include: {
                model: Permission,
                as: 'permissions'
            }
        })
        .then(async (role) => {
            Role.update({
                name: data.name,
                description: data.description
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

                await role.permissions.forEach(async permission => await role.removePermission(permission.id))
                await role.addPermissions(data['permissions[]'])
                await res.status(200).redirect(`${url}${id}/editar`)
            })
            .catch(async (error) => {
                console.log(error)
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
        permission(req, res, next, 'delete.roles')

        const id = req.params.id

        Role.destroy({
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