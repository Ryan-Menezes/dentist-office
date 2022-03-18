const { Query } = require('../../models/index')

const dir = 'panel/queries/'

module.exports = {
    async index(req, res, next){
        Query.findAll()
        .then(async (queries) => {
            await res.status(200).render(`${dir}index`, {
                title: 'Consúltas',
                queries
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                title: 'Consúltas',
                queries: []
            })
        })
    },

    async create(req, res, next){
        await res.status(200).render(`${dir}create`, {
            title: 'Nova Consúlta'
        })
    },

    async edit(req, res, next){
        Query.findByPk(req.params.id)
        .then(async (query) => {
            if(!query){
                return res.status(404).json(query)
            }

            await res.status(200).render(`${dir}edit`, {
                title: 'Editar Consúlta',
                query: query.dataValues
            })
        })
        .catch(async (error) => {
            await res.status(500).json(error)
        })
    }
}