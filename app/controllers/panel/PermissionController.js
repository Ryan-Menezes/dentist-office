const { Permission } = require('../../models/index')

const dir = 'panel/permissions/'

module.exports = {
    async index(req, res, next){
        Permission.findAll()
        .then(async (permissions) => {
            await res.status(200).render(`${dir}index`, {
                title: 'Permissões',
                permissions
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                title: 'Permissões',
                permissions: []
            })
        })
    }
}