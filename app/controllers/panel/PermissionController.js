const dir = 'panel/permissions/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}index`, {
            title: 'Permissões'
        })
    },

    async create(req, res, next){
        await res.status(200).render(`${dir}create`, {
            title: 'Nova Permissão'
        })
    },

    async edit(req, res, next){
        await res.status(200).render(`${dir}edit`, {
            title: 'Editar Permissão'
        })
    }
}