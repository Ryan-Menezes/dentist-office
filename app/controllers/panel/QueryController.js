const { Query } = require('../../models/index')
const permission = require('../../middlewares/permission')

const dir = 'panel/queries/'
const url = '/painel/consultas/'

module.exports = {
    async index(req, res, next){
        permission(req, res, next, 'view.queries')

        Query.findAll()
        .then(async (queries) => {
            await res.status(200).render(`${dir}index`, {
                auth: req.user,
                title: 'Consúltas',
                queries
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                auth: req.user,
                title: 'Consúltas',
                queries: []
            })
        })
    },

    async create(req, res, next){
        permission(req, res, next, 'create.queries')

        await res.status(200).render(`${dir}create`, {
            auth: req.user,
            title: 'Nova Consúlta'
        })
    },

    async store(req, res, next){
        permission(req, res, next, 'create.queries')

        const data = req.body

        Query.create({
            pacient_name: data.pacient_name,
            status: data.status,
            date_query: data.date_query,
            description: data.description
        })
        .then(async (role) => {
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
        permission(req, res, next, 'edit.queries')

        Query.findByPk(req.params.id)
        .then(async (query) => {
            if(!query){
                return res.status(404).render('error', {
                    layout: false,
                    error: 404
                })
            }

            const q = query.dataValues
            q.date_query = q.date_query.toISOString().replace(/\.0*Z/, '')

            await res.status(200).render(`${dir}edit`, {
                auth: req.user,
                title: 'Editar Consúlta',
                query: q
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
        permission(req, res, next, 'edit.queries')

        const id = req.params.id
        const data = req.body

        Query.update({
            pacient_name: data.pacient_name,
            status: data.status,
            date_query: data.date_query,
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

            await res.status(200).redirect(`${url}${id}/editar`)
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
        permission(req, res, next, 'delete.queries')

        const id = req.params.id

        Query.destroy({
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