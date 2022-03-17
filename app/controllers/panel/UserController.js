const dir = 'panel/users/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}index`, {
            title: 'Usuários'
        })
    },

    async create(req, res, next){
        await res.status(200).render(`${dir}create`, {
            title: 'Novo Usuário'
        })
    },

    async edit(req, res, next){
        await res.status(200).render(`${dir}edit`, {
            title: 'Editar Usuário'
        })
    }
}