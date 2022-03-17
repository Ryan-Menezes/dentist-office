const dir = 'auth/'

module.exports = {
    async index(req, res, next){
        await res.status(200).render(`${dir}login`, {
            layout: 'login',
            title: 'Início'
        })
    },

    async validate(req, res, next){
        
    }
}