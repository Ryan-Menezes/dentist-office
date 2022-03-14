module.exports = {
    async index(req, res, next){
        await res.status(200).render('auth/login', {
            layout: 'login'
        })
    },

    async validate(req, res, next){
        
    }
}