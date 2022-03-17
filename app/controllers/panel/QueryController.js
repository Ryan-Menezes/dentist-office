const dir = 'panel/queries/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}index`, {
            title: 'Consúltas'
        })
    },

    async create(req, res, next){
        await res.status(200).render(`${dir}create`, {
            title: 'Nova Consúlta'
        })
    },

    async edit(req, res, next){
        await res.status(200).render(`${dir}edit`, {
            title: 'Editar Consúlta'
        })
    }
}