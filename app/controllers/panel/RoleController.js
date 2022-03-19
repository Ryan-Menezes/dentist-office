const { Role, Permission } = require('../../models/index')

const dir = 'panel/roles/'
const url = '/painel/funcoes/'

module.exports = {
    async index(req, res, next){
        Role.findAll()
        .then(async (roles) => {
            await res.status(200).render(`${dir}index`, {
                title: 'Funções',
                roles
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                title: 'Funções',
                roles: []
            })
        })
    },

    async create(req, res, next){
        Permission.findAll()
        .then(async (permissions) => {
            await res.status(200).render(`${dir}create`, {
                title: 'Nova Função',
                permissions
            })
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    },

    async store(req, res, next){
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
            await res.status(500).json(error)
        })
    },

    async edit(req, res, next){
        Role.findByPk(req.params.id, {
            include: {
                model: Permission,
                as: 'permissions'
            }
        })
        .then(async (role) => {
            if(!role){
                return res.status(404).json(role)
            }

            Permission.findAll()
            .then(async (permissions) => {
                await res.status(200).render(`${dir}edit`, {
                    title: 'Editar Função',
                    role: role.dataValues,
                    permissions
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

        Role.findOne({
            where: {
                id
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
                    return res.status(404).json(result)
                }

                await role.removePermissions(data['permissions[]'])
                await role.addPermissions(data['permissions[]'])
                await res.status(200).redirect(`${url}${id}/editar`)
            })
            .catch(async (error) => {
                await res.status(500).json(error)
            })
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    },

    async delete(req, res, next){
        const id = req.params.id

        Role.destroy({
            where: {
                id
            }
        })
        .then(async (result) => {
            if(!result){
                return res.status(404).json(result)
            }

            await res.status(200).redirect(`${url}`)
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    }
}