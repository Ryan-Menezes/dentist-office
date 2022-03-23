const { Permission } = require('../../models/index')
const permission = require('../../middlewares/permission')

const dir = 'panel/permissions/'
const url = '/painel/permissoes/'

module.exports = {
    async index(req, res, next){
        permission(req, res, next, 'view.permissions')

        Permission.findAll()
        .then(async (permissions) => {
            await res.status(200).render(`${dir}index`, {
                auth: req.user,
                title: 'Permissões',
                permissions
            })
        })
        .catch(async (error) => {
            console.error(error)

            await res.status(500).render(`${dir}index`, {
                auth: req.user,
                title: 'Permissões',
                permissions: []
            })
        })
    }
}