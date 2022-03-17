const dir = 'panel/roles/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}index`, {
            title: 'Funções'
        })
    },

    async create(req, res, next){
        await res.status(200).render(`${dir}create`, {
            title: 'Nova Função'
        })
    },

    async edit(req, res, next){
        await res.status(200).render(`${dir}edit`, {
            title: 'Editar Função'
        })
    }
}