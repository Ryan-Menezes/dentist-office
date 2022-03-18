const { Role } = require('../../models/index')

const dir = 'panel/roles/'

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
        await res.status(200).render(`${dir}create`, {
            title: 'Nova Função'
        })
    },

    async edit(req, res, next){
        Role.findByPk(req.params.id)
        .then(async (role) => {
            if(!role){
                return res.status(404).json(role)
            }

            await res.status(200).render(`${dir}edit`, {
                title: 'Editar Função',
                role: role.dataValues
            })
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    }
}