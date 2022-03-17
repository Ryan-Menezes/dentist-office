const dir = 'panel/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}index`, {
            title: 'Início'
        })
    },

    async logout(req, res, next){
        await res.status(200).redirect('/')
    }
}